/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "@autocode-ts/ac-browser";
import { AcEvents } from "@autocode-ts/autocode";
import { AcBuilderApi } from "../core/ac-builder-api";
import * as monaco from "monaco-editor";
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";
import { AcTypescriptEditorHelper } from "../helpers/ac-typescript-editor-helper.helper";

export class AcBuilderScriptEditor {
  builderApi: AcBuilderApi;
  editor!: monaco.editor.IStandaloneCodeEditor;
  element: HTMLElement = document.createElement('div');
  events: AcEvents = new AcEvents();
  helper:AcTypescriptEditorHelper;
  private _title: string = 'Script Editor';
  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
    this.element.querySelector('.ac-builder-script-editor-header-title')!.innerHTML = value;
  }

  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    acAddClassToElement({ element: this.element, cssClass: 'ac-builder-script-editor' });
    this.element.innerHTML = `<div class="ac-builder-script-editor-header">
      <div class="ac-builder-script-editor-header-title">

      </div>
      <div class="ac-builder-script-editor-header-actions">
        <div class="ac-builder-script-editor-header-actions-container">
          <button type="button" class="btn btn-action btn-close-action" data-bs-toggle="tooltip" data-bs-title="Redo">
                <i class="fa fa-times text-secondary"></i>
              </button>
        </div>
      </div>
    </div>
    <div class="ac-builder-script-editor-body"></div>`;

    this.title = "Events Script";
    ; (self as any).MonacoEnvironment = {
      getWorker(_: string, label: string) {
        switch (label) {
          case "typescript":
          case "javascript":
            return new tsWorker();
          default:
            return new editorWorker();
        }
      },
    };
    this.editor = monaco.editor.create(this.element.querySelector('.ac-builder-script-editor-body') as HTMLElement, {
      value: ``,
      language: 'typescript',
      theme: 'vs-dark',
      automaticLayout: true, // auto-resize with window
    });
    this.helper = new AcTypescriptEditorHelper({editor:this.editor});
    const closeButton = this.element.querySelector(".btn-close-action") as HTMLElement;
    closeButton.addEventListener('click', () => {
      this.events.execute({ 'event': 'close' });
    })
  }

  addCode({ code, prepend = false }: { code: string, prepend?: boolean }) {
    const model = this.editor.getModel();
    if (model) {
      const lastLine = model.getLineCount();
      const lastColumn = model.getLineMaxColumn(lastLine);

      model.applyEdits([{
        range: new monaco.Range(lastLine, lastColumn, lastLine, lastColumn),
        text: `\n${code}`,
        forceMoveMarkers: true
      }]);
    }
  }

  addCodeInsideClass({ className, code }: { className: string, code: string }) {
    this.helper.addCodeInsideClass({className,code});
  }

  async getClassStructure() {
    const model = this.editor.getModel();
    if (!model) return [];

    // Ask Monaco for a TypeScript worker
    const worker = await monaco.languages.typescript.getTypeScriptWorker();
    const client = await worker(model.uri);

    // Get the navigation tree (AST-like structure)
    const navTree = await client.getNavigationTree(model.uri.toString());

    // Recursive walker
    function walk(node: any, result: any[]) {
      if (node.kind === "class") {
        const cls: any = {
          name: node.text,
          functions: [],
          variables: []
        };

        for (const child of node.childItems || []) {
          if (child.kind === "method") {
            cls.functions.push(child.text);
          } else if (child.kind === "property") {
            cls.variables.push(child.text);
          }
        }

        result.push(cls);
      } else if (node.childItems) {
        for (const child of node.childItems) {
          walk(child, result);
        }
      }
    }

    const classes: any[] = [];
    walk(navTree, classes);

    return classes;
  }

  async gotoFunction(className: string, functionName: string) {
  const model = this.editor.getModel();
  if (!model) return;

  const worker = await monaco.languages.typescript.getTypeScriptWorker();
  const client = await worker(model.uri);

  // Get navigation tree (contains location info)
  const navTree = await client.getNavigationTree(model.uri.toString());

  function findFunction(node: any): any {
    if (node.kind === "method" && node.text === functionName) {
      return node;
    }
    if (node.childItems) {
      for (const child of node.childItems) {
        const result = findFunction(child);
        if (result) return result;
      }
    }
    return null;
  }

  // First find the class
  function findClass(node: any): any {
    if (node.kind === "class" && node.text === className) {
      for (const child of node.childItems || []) {
        if (child.kind === "method" && child.text === functionName) {
          return child;
        }
      }
    }
    if (node.childItems) {
      for (const child of node.childItems) {
        const result = findClass(child);
        if (result) return result;
      }
    }
    return null;
  }

  const fnNode = findClass(navTree);
  if (!fnNode || !fnNode.spans?.length) return;

  const span = fnNode.spans[0];
  const pos = model.getPositionAt(span.start);

  // Move cursor to function start and reveal it
  this.editor.setPosition(pos);
  this.editor.revealPositionInCenter(pos);
  }

  formatCode(){
    this.editor.getAction("editor.action.formatDocument")?.run();
  }


  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  setCode({ code }: { code: string }) {
    const model = this.editor.getModel();
    if (model) {
      model.setValue(code);
    }
    this.formatCode();
  }
}
