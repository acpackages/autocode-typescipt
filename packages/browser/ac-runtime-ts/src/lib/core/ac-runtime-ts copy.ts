/* eslint-disable prefer-spread */
import ts from "typescript";

type Constructor<T = any> = new (...args: any[]) => T;

export class AcTsRuntime {
  private static registry: Record<string, Constructor> = {};
  private static scope: Record<string, any> = {};
  private static declarations: string[] = [];
  private static transpileCache: Record<string, string> = {};

  /** Reactive wrapper */
  static reactive<T extends object>({ obj, callback }: { obj: T; callback?: (prop: string, value: any) => void }): T {
    return new Proxy(obj, {
      set(target, prop: string, value) {
        target[prop as keyof T] = value;
        if (callback) callback(prop, value);
        return true;
      },
      get(target, prop: string) {
        return target[prop as keyof T];
      }
    });
  }

  /** Apply decorators dynamically */
  static applyDecorators({ target, decorators }: { target: any; decorators: Record<string, Function[]> }) {
    for (const [key, decs] of Object.entries(decorators)) {
      if (key === "class") decs.forEach(dec => dec(target));
      else if (target.prototype && target.prototype[key]) decs.forEach(dec => dec(target.prototype, key));
      else if (target[key] !== undefined) decs.forEach(dec => dec(target, key));
    }
  }

  /** Transpile TS → JS */
  private static transpile({ tsCode }: { tsCode: string }): string {
    if (this.transpileCache[tsCode]) return this.transpileCache[tsCode];
    const result = ts.transpileModule(tsCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        esModuleInterop: true,
        strict: true,
        experimentalDecorators: true,
      },
    });
    this.transpileCache[tsCode] = result.outputText;
    return result.outputText;
  }

  /** Build execution scope */
  private static buildScope({ extraScope = {} }: { extraScope?: Record<string, any> } = {}) {
    const builtins: Record<string, any> = {
      Object, Array, String, Number, Boolean,
      Date, Map, Set, WeakMap, WeakSet,
      Promise, Symbol, Error, Math, JSON, Reflect, Proxy,
      reactive: this.reactive.bind(this),
      applyDecorators: this.applyDecorators.bind(this),
    };
    return { ...builtins, ...this.registry, ...this.scope, ...extraScope };
  }

  /** Generate declarations from AST */
  private static generateDeclarationsFromAST({ code }: { code: string }) {
    const sourceFile = ts.createSourceFile("dynamic.ts", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);

    const visit = (node: ts.Node) => {
      if (ts.isClassDeclaration(node) && node.name) {
        const name = node.name.text;
        const members: string[] = [];
        node.members.forEach(member => {
          if (ts.isPropertyDeclaration(member) && member.name) {
            const propName = member.name.getText();
            const type = member.type ? member.type.getText() : "any";
            members.push(`  ${propName}: ${type};`);
          }
          if (ts.isMethodDeclaration(member) && member.name) {
            const methodName = member.name.getText();
            const params = member.parameters.map(p => `${p.name.getText()}: ${p.type?.getText() ?? "any"}`).join(", ");
            const returnType = member.type ? member.type.getText() : "any";
            members.push(`  ${methodName}(${params}): ${returnType};`);
          }
        });
        this.declarations.push(`declare class ${name} {\n${members.join("\n")}\n}`);
      }
      else if (ts.isFunctionDeclaration(node) && node.name) {
        const fnName = node.name.text;
        const params = node.parameters.map(p => `${p.name.getText()}: ${p.type?.getText() ?? "any"}`).join(", ");
        const returnType = node.type ? node.type.getText() : "any";
        this.declarations.push(`declare function ${fnName}(${params}): ${returnType};`);
      }
      else if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach(decl => {
          if (ts.isIdentifier(decl.name)) {
            const varName = decl.name.getText();
            const varType = decl.type ? decl.type.getText() : "any";
            this.declarations.push(`declare const ${varName}: ${varType};`);
          }
        });
      }
      else if (ts.isEnumDeclaration(node) && node.name) {
        const name = node.name.text;
        const members = node.members.map(m => m.name.getText()).join(", ");
        this.declarations.push(`declare enum ${name} { ${members} }`);
      }
      else if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) {
        this.declarations.push(node.getText());
      }
      else if (ts.isModuleDeclaration(node) && node.name) {
        this.declarations.push(node.getText());
      }
      ts.forEachChild(node, visit);
    };

    ts.forEachChild(sourceFile, visit);
  }

  /** Run TypeScript code dynamically */
  static async runCode<T = any>({ code, context = {} }: { code: string; context?: Record<string, any> }): Promise<T> {
    // Handle imports
    const imports: Record<string, any> = {};
    const importRegex = /^import\s+(?:([\w*\s{},]+)\s+from\s+)?["']([^"']+)["'];?/gm;
    let match: RegExpExecArray | null;
    let cleanedCode = code;
    const importPromises: Promise<void>[] = [];

    while ((match = importRegex.exec(code)) !== null) {
      const [, imported, modulePath] = match;
      cleanedCode = cleanedCode.replace(match[0], "");
      importPromises.push(import(modulePath).then(mod => {
        if (!imported) return;
        if (imported.includes("* as")) imports[imported.split("as")[1].trim()] = mod;
        else if (imported.includes("{")) {
          imported.replace(/[{}]/g, "").split(",").map(s => s.trim()).forEach(binding => {
            const [orig, alias] = binding.split(" as ").map(s => s.trim());
            imports[alias || orig] = mod[orig];
          });
        } else imports[imported.trim()] = mod.default ?? mod;
      }));
    }

    await Promise.all(importPromises);

    // Transpile TS → JS
    const jsCode = this.transpile({ tsCode: cleanedCode });

    // Build scope
    const scope = this.buildScope({ extraScope: { ...context, ...imports } });
    const scopeKeys = Object.keys(scope);
    const scopeValues = Object.values(scope);

    // Wrap like a Node module
    const wrapped = `
      const exports = {};
      const module = { exports };
      ${jsCode}
      return module.exports;
    `;

    const fn = new Function(...scopeKeys, wrapped);
    const result = fn(...scopeValues);

    this.generateDeclarationsFromAST({ code });
    return result as T;
  }

  /** Dynamically create a class */
  static async createClass({
    name,
    script,
    properties = {},
    methods = {},
    global = false,
    scope = {}
  }: {
    name: string;
    script?: string;
    properties?: Record<string, any>;
    methods?: Record<string, Function>;
    global?: boolean;
    scope?: Record<string, any>;
  }): Promise<Constructor | undefined> {
    const tsClassCode = script ?? `
      class ${name} {
        constructor(data: any = {}) {
          Object.assign(this, ${JSON.stringify(properties)}, data);
        }
        ${Object.entries(methods)
          .map(([key, fn]) => `${key}(...args: any[]){ return (${fn.toString()}).apply(this,args); }`)
          .join("\n")}
      }
      export { ${name} };
    `;

    const result = await this.runCode<{ [key: string]: Constructor }>({
      code: tsClassCode,
      context: { ...this.scope, ...scope }
    });

    const clazz = result[name];
    if (clazz) {
      this.registry[name] = clazz;
      if (global) (globalThis as any)[name] = clazz;
      return clazz;
    }
    return undefined;
  }

  static getDeclarations(): string {
    return this.declarations.join("\n\n");
  }

  static registerClass({ name, clazz }: { name: string; clazz: Constructor }) {
    this.registry[name] = clazz;
  }

  static registerScopeClass({ name, type }: { name: string; type: any }) {
    this.scope[name] = type;
  }

  static removeClass({ name }: { name: string }) {
    delete this.registry[name];
    delete this.scope[name];
  }

  static getClass<T = any>({ name }: { name: string }): Constructor<T> | undefined {
    return this.registry[name];
  }

  static createInstance<T = any>({ name, args = [] }: { name: string; args?: any[] }): T {
    const clazz = this.getClass<T>({ name });
    if (!clazz) throw new Error(`Class '${name}' not found.`);
    return new clazz(...args);
  }
}
