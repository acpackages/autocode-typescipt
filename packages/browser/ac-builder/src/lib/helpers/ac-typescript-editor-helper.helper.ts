import * as monaco from "monaco-editor";
import { AcBuilderScriptEditor } from "../elements/ac-builder-script-editor.element";
import { IAcScriptClassChangeEventArgs } from "../interfaces/event-args/ac-script-class-change-event-args.interface";
import { AcBuilderApi } from "../core/ac-builder-api";
import { AcEnumBuilderEvent } from "../enums/ac-enum-builder-event.enum";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { IAcScriptFunctionChangeEventArgs } from "../interfaces/event-args/ac-script-function-change-event-args.interface";
import { IAcScriptPropertyChangeEventArgs } from "../interfaces/event-args/ac-script-property-change-event-args.interface";

export class AcTypescriptEditorHelper {
  private editor: monaco.editor.IStandaloneCodeEditor;
  private builderApi:AcBuilderApi;

  constructor({ scriptEditor }: { scriptEditor: AcBuilderScriptEditor }) {
    this.editor = scriptEditor.editor;
    this.builderApi = scriptEditor.builderApi;
    this.registerListeners();
  }

  async addClass({ className, classCode = "", autoFormat = true }: { className: string, classCode?: string, autoFormat?: boolean }): Promise<void> {
    const code = this.getCode();
    const newClass = `\nclass ${className} {\n${classCode}\n}\n`;
    await this.setCode({ code: code + newClass, autoFormat });
  }

  async addCodeInsideClass({ className, code, autoFormat = true }: { className: string; code: string, autoFormat?: boolean }): Promise<void> {
    const node = await this.getClassNode(className);
    if (!node) return;
    const model = this.editor.getModel();
    if (!model) return;

    const pos = model.getPositionAt(node.spans[0].start + node.spans[0].length - 1);
    this.editor.executeEdits("insertCode", [{
      range: new monaco.Range(pos.lineNumber, pos.column, pos.lineNumber, pos.column),
      text: ` ${code}\n`
    }]);
    if (autoFormat) {
      await this.formatCode();
    }
  }

  async addFunctionInClass({ className, functionCode, autoFormat = true }: { className: string, functionCode: string, autoFormat?: boolean }): Promise<void> {
    await this.addCodeInsideClass({ className, code: functionCode, autoFormat });
  }

  async addPropertyInClass({ className, propertyCode, autoFormat = true }: { className: string, propertyCode: string, autoFormat?: boolean }): Promise<void> {
    await this.addCodeInsideClass({ className, code: propertyCode, autoFormat });
  }

  async formatCode(): Promise<void> {
    await this.editor.getAction("editor.action.formatDocument")?.run();
  }

  private async getNavigationTree() {
    const model = this.editor.getModel();
    if (!model) return null;

    const worker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await worker(model.uri);
    return await client.getNavigationTree(model.uri.toString());
  }

  private async getClassNode(className: string): Promise<any | null> {
    const navTree = await this.getNavigationTree();
    if (!navTree) return null;

    let result: any | null = null;
    function walk(node: any) {
      if (node.kind === "class" && node.text === className) {
        result = node;
        return;
      }
      for (const child of node.childItems || []) {
        walk(child);
      }
    }
    walk(navTree);
    return result;
  }

  async getClasses(): Promise<string[]> {
    const navTree = await this.getNavigationTree();
    if (!navTree) return [];
    const result: string[] = [];

    function walk(node: any) {
      if (node.kind === "class") {
        result.push(node.text);
      }
      for (const child of node.childItems || []) {
        walk(child);
      }
    }

    walk(navTree);
    return result;
  }

  async getClassStructure() {
    const navTree = await this.getNavigationTree();
    if (!navTree) return [];

    const classes: any[] = [];

    function walk(node: any) {
      if (node.kind === "class") {
        const cls: any = { name: node.text, functions: [], variables: [] };

        for (const child of node.childItems || []) {
          if (child.kind === "method") {
            cls.functions.push(child.text);
          } else if (child.kind === "property") {
            cls.variables.push(child.text);
          }
        }

        classes.push(cls);
      }
      for (const child of node.childItems || []) {
        walk(child);
      }
    }

    walk(navTree);
    return classes;
  }

  getCode(): string {
    return this.editor.getValue();
  }

  async getFunctionsInClass({ className }: { className: string }): Promise<string[]> {
    const clsNode = await this.getClassNode(className);
    if (!clsNode) return [];
    return (clsNode.childItems || [])
      .filter((c: any) => c.kind === "method")
      .map((c: any) => c.text);
  }

  async getVariablesInClass({ className }: { className: string }): Promise<string[]> {
    const clsNode = await this.getClassNode(className);
    if (!clsNode) return [];
    return (clsNode.childItems || [])
      .filter((c: any) => c.kind === "property")
      .map((c: any) => c.text);
  }

  async gotoFunction({ functionName, className }: { functionName: string, className?: string }): Promise<void> {
    this.editor.focus();
    const model = this.editor.getModel();
    if (!model) return;

    const navTree = await this.getNavigationTree();
    if (!navTree) return;

    let targetNode: any | null = null;

    function walk(node: any, parentClass?: string) {
      if (node.kind === "method" && node.text === functionName) {
        if (!className || className === parentClass) {
          targetNode = node;
        }
      }
      for (const child of node.childItems || []) {
        walk(child, node.kind === "class" ? node.text : parentClass);
      }
    }
    walk(navTree);

    if (targetNode && targetNode.spans?.length) {
      const pos = model.getPositionAt(targetNode.spans[0].start);
      this.editor.revealPositionInCenter(pos);
      this.editor.setPosition(pos);
    }
  }

  private listenForClassChanges(callback: ({ change, oldName, newName }: { change: string, oldName?: string, newName?: string }) => void) {
    this.trackChanges(async () => {
      const classes = await this.getClasses();
      return { classes };
    }, (prev, curr) => {
      const prevSet = new Set(prev.classes);
      const currSet = new Set(curr.classes);
      for (const c of curr.classes) {
        if (!prevSet.has(c)) {
          callback({ change: "add", newName: c });
        }
      }
      for (const c of prev.classes) {
        if (!currSet.has(c)) {
          callback({ change: "remove", oldName: c });
        }
      }
      if (prev.classes.length === curr.classes.length) {
        for (let i = 0; i < curr.classes.length; i++) {
          if (prev.classes[i] !== curr.classes[i]) {
            callback({ change: "rename", oldName: prev.classes[i], newName: curr.classes[i] });
          }
        }
      }
    });
  }

  private listenForFunctionChanges(callback: ({ change, oldName, newName, className }: { change: string, oldName?: string, newName?: string,className: string }) => void) {
    this.trackChanges(async () => {
      const structure = await this.getClassStructure();
      const functions: Record<string, string[]> = {};
      structure.forEach(cls => functions[cls.name] = cls.functions);
      return { functions };
    }, (prev, curr) => {
      for (const cls of Object.keys(curr.functions)) {
        const oldFuncs = prev.functions[cls] || [];
        const currFuncs = curr.functions[cls] || [];
        const oldSet = new Set(oldFuncs);
        const currSet = new Set(currFuncs);
        for (const f of currFuncs) {
          if (!oldSet.has(f)) {
            callback({change:"add",  className:cls, newName:f});
          }
        }
        for (const f of oldFuncs) {
          if (!currSet.has(f)) {
            callback({change:"remove",  className:cls, oldName:f});
          }
        }
        if (oldFuncs.length === currFuncs.length) {
          for (let i = 0; i < currFuncs.length; i++) {
            if (oldFuncs[i] !== currFuncs[i]) {
              callback({change:"rename",  className:cls,oldName: oldFuncs[i], newName:currFuncs[i]});
            }
          }
        }
      }
    });
  }

  private listenForPropertyChanges(callback: ({ change, oldName, newName, className }: { change: string, oldName?: string, newName?: string,className: string }) => void) {
    this.trackChanges(async () => {
      const structure = await this.getClassStructure();
      const vars: Record<string, string[]> = {};
      structure.forEach(cls => vars[cls.name] = cls.variables);
      return { vars };
    }, (prev, curr) => {
      for (const cls of Object.keys(curr.vars)) {
        const oldVars = prev.vars[cls] || [];
        const currVars = curr.vars[cls] || [];
        const oldSet = new Set(oldVars);
        const currSet = new Set(currVars);
        for (const v of currVars) {
          if (!oldSet.has(v)) {
            callback({change:"add", className:cls, newName:v});
          }
        }
        for (const v of oldVars) {
          if (!currSet.has(v)) {
            callback({change:"remove", className:cls, oldName:v});
          }
        }
        if (oldVars.length === currVars.length) {
          for (let i = 0; i < currVars.length; i++) {
            if (oldVars[i] !== currVars[i]) {
              callback({change:"rename",  className:cls, oldName:oldVars[i], newName:currVars[i]});
            }
          }
        }
      }
    });
  }


  registerListeners() {
    this.listenForClassChanges(({change,oldName,newName}:{change:any, oldName?: string, newName?: string}) => {
      const args:IAcScriptClassChangeEventArgs = {
        change:change,
        oldName:oldName,
        newName:newName
      };
      this.builderApi.hooks.execute({hook:AcEnumBuilderHook.ScriptClassChange,args:args});
      this.builderApi.events.execute({event:AcEnumBuilderEvent.ScriptClassChange,args:args});
    });
    this.listenForFunctionChanges(({change,oldName,newName,className}:{change:any,oldName?: string, newName?: string, className: string}) => {
      const args:IAcScriptFunctionChangeEventArgs = {
        change:change,
        oldName:oldName,
        newName:newName,
        className:className
      };
      this.builderApi.hooks.execute({hook:AcEnumBuilderHook.ScriptFunctionChange,args:args});
      this.builderApi.events.execute({event:AcEnumBuilderEvent.ScriptFunctionChange,args:args});
    });
    this.listenForPropertyChanges(({change,oldName,newName,className}:{change:any,oldName?: string, newName?: string, className: string}) => {
      const args:IAcScriptPropertyChangeEventArgs = {
        change:change,
        oldName:oldName,
        newName:newName,
        className:className
      };
      this.builderApi.hooks.execute({hook:AcEnumBuilderHook.ScriptPropertyChange,args:args});
      this.builderApi.events.execute({event:AcEnumBuilderEvent.ScriptPropertyChange,args:args});
    });
  }

  async setCode({ code, autoFormat = true }: { code: string, autoFormat?: boolean }): Promise<void> {
    const model = this.editor.getModel();
    if (model) {
      model.setValue(code);
    }
    if (autoFormat) {
      await this.formatCode();
    }
  }

  private trackChanges<T>(
    snapshot: () => Promise<T>,
    compare: (prev: T, curr: T) => void
  ) {
    let prevState: T;
    snapshot().then(s => (prevState = s));
    this.editor.onDidChangeModelContent(async () => {
      const currState = await snapshot();
      if (prevState) compare(prevState, currState);
      prevState = currState;
    });
  }

}
