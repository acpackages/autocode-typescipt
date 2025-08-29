import * as monaco from "monaco-editor";

export class AcTypescriptEditorHelper {
  private editor: monaco.editor.IStandaloneCodeEditor;

  constructor({editor}:{editor: monaco.editor.IStandaloneCodeEditor}) {
    this.editor = editor;
  }

  getCode(): string {
    return this.editor.getValue();
  }

  setCode(code: string): void {
    this.editor.setValue(code);
  }

  // --------------------------
  // GETTERS
  // --------------------------

  getClasses(): string[] {
    const code = this.getCode();
    const classRegex = /\bclass\s+(\w+)/g;
    return [...code.matchAll(classRegex)].map(m => m[1]);
  }

  getFunctionsInClass(className: string): string[] {
    const code = this.getCode();
    const classRegex = new RegExp(`class\\s+${className}[\\s\\S]*?{([\\s\\S]*?)}`, "m");
    const classMatch = classRegex.exec(code);
    if (!classMatch) return [];
    const body = classMatch[1];
    const funcRegex = /\b(\w+)\s*\([^)]*\)\s*{/g;
    return [...body.matchAll(funcRegex)].map(m => m[1]);
  }

  getVariablesInClass(className: string): string[] {
    const code = this.getCode();
    const classRegex = new RegExp(`class\\s+${className}[\\s\\S]*?{([\\s\\S]*?)}`, "m");
    const classMatch = classRegex.exec(code);
    if (!classMatch) return [];
    const body = classMatch[1];
    const varRegex = /\b(this\.)?(\w+)\s*[:=]/g;
    return [...body.matchAll(varRegex)].map(m => m[2]);
  }

  // --------------------------
  // NAVIGATION
  // --------------------------

  gotoFunction(functionName: string, className?: string): void {
    const code = this.getCode();
    let regex: RegExp;
    if (className) {
      regex = new RegExp(`class\\s+${className}[\\s\\S]*?\\b${functionName}\\s*\\(`, "m");
    } else {
      regex = new RegExp(`\\b${functionName}\\s*\\(`);
    }
    const match = regex.exec(code);
    if (match) {
      const pos = this.editor.getModel()?.getPositionAt(match.index);
      if (pos) {
        this.editor.revealPositionInCenter(pos);
        this.editor.setPosition(pos);
      }
    }
  }

  // --------------------------
  // CHANGE LISTENERS
  // --------------------------

  listenForClassNameChange(callback: (oldName: string, newName: string) => void) {
    let lastClasses = this.getClasses();
    this.editor.onDidChangeModelContent(() => {
      const current = this.getClasses();
      if (current.length !== lastClasses.length) {
        lastClasses = current;
        return;
      }
      for (let i = 0; i < current.length; i++) {
        if (current[i] !== lastClasses[i]) {
          callback(lastClasses[i], current[i]);
        }
      }
      lastClasses = current;
    });
  }

  listenForFunctionNameChange(callback: (oldName: string, newName: string, className: string) => void) {
    let lastFunctions: Record<string, string[]> = {};
    this.getClasses().forEach(cls => {
      lastFunctions[cls] = this.getFunctionsInClass(cls);
    });

    this.editor.onDidChangeModelContent(() => {
      const newFunctions: Record<string, string[]> = {};
      this.getClasses().forEach(cls => {
        newFunctions[cls] = this.getFunctionsInClass(cls);
      });

      for (const cls of Object.keys(newFunctions)) {
        const oldFuncs = lastFunctions[cls] || [];
        const currFuncs = newFunctions[cls] || [];
        if (oldFuncs.length === currFuncs.length) {
          for (let i = 0; i < currFuncs.length; i++) {
            if (oldFuncs[i] !== currFuncs[i]) {
              callback(oldFuncs[i], currFuncs[i], cls);
            }
          }
        }
      }
      lastFunctions = newFunctions;
    });
  }

  listenForPropertyNameChange(callback: (oldName: string, newName: string, className: string) => void) {
    let lastProps: Record<string, string[]> = {};
    this.getClasses().forEach(cls => {
      lastProps[cls] = this.getVariablesInClass(cls);
    });

    this.editor.onDidChangeModelContent(() => {
      const newProps: Record<string, string[]> = {};
      this.getClasses().forEach(cls => {
        newProps[cls] = this.getVariablesInClass(cls);
      });

      for (const cls of Object.keys(newProps)) {
        const oldVars = lastProps[cls] || [];
        const currVars = newProps[cls] || [];
        if (oldVars.length === currVars.length) {
          for (let i = 0; i < currVars.length; i++) {
            if (oldVars[i] !== currVars[i]) {
              callback(oldVars[i], currVars[i], cls);
            }
          }
        }
      }
      lastProps = newProps;
    });
  }

  // --------------------------
  // MUTATORS (ADD CODE)
  // --------------------------

  addClass({className,classCode = ""}:{className: string, classCode?: string}): void {
    const code = this.getCode();
    const newClass = `\nclass ${className} {\n${classCode}\n}\n`;
    this.setCode(code + newClass);
  }

  addCodeInsideClass(opts: { className: string; code: string }): void {
    const { className, code } = opts;
    const src = this.getCode();
    const regex = new RegExp(`(class\\s+${className}[\\s\\S]*?{)`, "m");
    const newCode = src.replace(regex, `$1\n  ${code}`);
    this.setCode(newCode);
  }

  addFunctionInClass(className: string, functionCode: string): void {
    this.addCodeInsideClass({ className, code: functionCode });
  }

  addPropertyInClass(className: string, propertyCode: string): void {
    this.addCodeInsideClass({ className, code: propertyCode });
  }
}
