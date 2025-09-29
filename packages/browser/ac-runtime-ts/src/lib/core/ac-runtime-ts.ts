/* eslint-disable no-useless-catch */
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
        (target as any)[prop] = value;
        if (callback) callback(prop, value);
        return true;
      },
      get(target, prop: string) {
        return (target as any)[prop];
      }
    });
  }

  /** Apply decorators dynamically (helper available in runtime scope) */
  static applyDecorators({ target, decorators }: { target: any; decorators: Record<string, Function[]> }) {
    for (const [key, decs] of Object.entries(decorators)) {
      if (key === "class") {
        decs.forEach(dec => dec(target));
      } else if (target.prototype && target.prototype[key]) {
        decs.forEach(dec => dec(target.prototype, key));
      } else if (target[key] !== undefined) {
        decs.forEach(dec => dec(target, key));
      }
    }
  }

  /** Transpile TS to JS with caching */
  private static transpile({ tsCode }: { tsCode: string }): string {
    if (this.transpileCache[tsCode]) return this.transpileCache[tsCode];
    const result = ts.transpileModule(tsCode, {
      compilerOptions: {
        target: ts.ScriptTarget.ES2022,
        module: ts.ModuleKind.ESNext,
        esModuleInterop: true,
        strict: false,
        experimentalDecorators: true,
      },
      reportDiagnostics: false,
    });
    this.transpileCache[tsCode] = result.outputText;
    return result.outputText;
  }

  /** Build execution scope: builtins + registry + registered scope + extra */
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

  /** Generate declarations from TypeScript AST (classes, funcs, vars, enums, interfaces, modules) */
  private static generateDeclarationsFromAST({ code }: { code: string }) {
    const sourceFile = ts.createSourceFile("dynamic.ts", code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    const push = (s: string) => this.declarations.push(s);

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
            const params = member.parameters
              .map(p => `${p.name.getText()}: ${p.type?.getText() ?? "any"}`)
              .join(", ");
            const returnType = member.type ? member.type.getText() : "any";
            members.push(`  ${methodName}(${params}): ${returnType};`);
          }
        });
        push(`declare class ${name} {\n${members.join("\n")}\n}`);
      }

      else if (ts.isFunctionDeclaration(node) && node.name) {
        const fnName = node.name.text;
        const params = node.parameters
          .map(p => `${p.name.getText()}: ${p.type?.getText() ?? "any"}`)
          .join(", ");
        const returnType = node.type ? node.type.getText() : "any";
        push(`declare function ${fnName}(${params}): ${returnType};`);
      }

      else if (ts.isVariableStatement(node)) {
        node.declarationList.declarations.forEach(decl => {
          if (ts.isIdentifier(decl.name)) {
            const varName = decl.name.getText();
            const varType = decl.type ? decl.type.getText() : "any";
            push(`declare const ${varName}: ${varType};`);
          }
        });
      }

      else if (ts.isEnumDeclaration(node) && node.name) {
        const name = node.name.text;
        const members = node.members.map(m => m.name.getText()).join(", ");
        push(`declare enum ${name} { ${members} }`);
      }

      else if ((ts.isInterfaceDeclaration(node) || ts.isTypeAliasDeclaration(node)) && node.name) {
        push(node.getText());
      }

      else if (ts.isModuleDeclaration(node) && node.name) {
        push(node.getText());
      }

      ts.forEachChild(node, visit);
    };

    ts.forEachChild(sourceFile, visit);
  }

  /**
   * Run TypeScript code (supports dynamic imports, async/await).
   * Note: imports are resolved with dynamic import() at runtime, and import lines are stripped before execution.
   */
  static async runCode<T = any>({ code, context = {} }: { code: string; context?: Record<string, any> }): Promise<T> {
    // Extract imports and dynamically import modules
    const imports: Record<string, any> = {};
    const importRegex = /^import\s+(?:([\s\S]+?)\s+from\s+)?["']([^"']+)["'];?/gm;
    let match: RegExpExecArray | null;
    let cleanedCode = code;
    const importPromises: Promise<void>[] = [];

    while ((match = importRegex.exec(code)) !== null) {
      const [, imported, modulePath] = match;
      cleanedCode = cleanedCode.replace(match[0], ""); // strip import
      importPromises.push((async () => {
        try {
          // dynamic import
          const mod = await import(modulePath);
          if (!imported) return;
          const spec = imported.trim();
          if (/^\*\s+as\s+/.test(spec)) {
            const alias = spec.split(/\s+as\s+/)[1].trim();
            imports[alias] = mod;
          } else if (spec.startsWith("{")) {
            // named imports
            spec.replace(/[{}]/g, "")
              .split(",").map(s => s.trim())
              .forEach(binding => {
                const [orig, alias] = binding.split(/\s+as\s+/).map(s => s.trim());
                imports[alias || orig] = (mod as any)[orig];
              });
          } else {
            // default import or bare identifier
            imports[spec] = (mod as any).default ?? mod;
          }
        } catch (err) {
          // preserve behavior: throw import error so caller can handle
          throw err;
        }
      })());
    }

    await Promise.all(importPromises);

    // Transpile TS -> JS
    const jsCode = this.transpile({ tsCode: cleanedCode });
    // Build execution scope
    const runtimeScope = this.buildScope({ extraScope: { ...context, ...imports } });
    const scopeKeys = Object.keys(runtimeScope);
    const scopeValues = Object.values(runtimeScope);
    const result = new Function(...scopeKeys,`return ${jsCode}`)(...scopeValues);
    try {
      this.generateDeclarationsFromAST({ code });
    } catch {
      // ignore AST generation errors (shouldn't block runtime)
    }
    return result;
  }

  /** Dynamically create class (script or built from properties & methods) — runs in same environment (no sandbox) */
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
  // Default TS code for class if no script provided
  const tsClassCode =
    script ??
    `
    class ${name} {
      constructor(data: any = {}) {
        Object.assign(this, ${JSON.stringify(properties)}, data);
      }
      ${Object.entries(methods)
        .map(([key, fn]) => {
          try {
            // keep function body intact
            return fn.toString().replace(/^function\s+/, `${key}`);
          } catch {
            return `${key}(...args: any[]): any { return undefined; }`;
          }
        })
        .join("\n")}
    }
    export { ${name} };
  `;

  // Run code through runCode so it transpiles + executes in unified pipeline
  const result = await this.runCode< Constructor >({
    code: tsClassCode,
    context: { ...this.scope, ...scope }
  });
  // Grab the class from exports
  const clazz = result;
  if (!clazz) return undefined;
  // Register into runtime registry
  this.registry[name] = clazz;

  if (global) (globalThis as any)[name] = clazz;

  // Generate declarations from AST
  try {
    this.generateDeclarationsFromAST({ code: tsClassCode });
  } catch {
    // ignore AST parse errors
  }

  return clazz as Constructor;
}

  static getDeclarations(): string {
    return this.declarations.join("\n\n");
  }

  static registerClass({ name, clazz }: { name: string; clazz: Constructor }) {
    this.registry[name] = clazz;
    // add simple declaration placeholder
    try {
      // create minimal synthetic source to produce declaration
      const declSrc = `declare class ${name} { }`;
      this.generateDeclarationsFromAST({ code: declSrc });
    } catch { /* ignore */ }
  }

  static registerScopeClass({ name, type }: { name: string; type: any }) {
    this.scope[name] = type;
  }

  static removeClass({ name }: { name: string }) {
    delete this.registry[name];
    delete this.scope[name];
    if ((globalThis as any)[name]) delete (globalThis as any)[name];
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
