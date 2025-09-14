type Constructor<T = any> = new (...args: any[]) => T;

// export interface AcRuntimeClassConfig {
//   name: string;
//   properties?: Record<string, any>;
//   methods?: Record<string, Function>;
//   global?: boolean; // <-- new option
// }

export class AcRuntime {
  private static registry: Record<string, Constructor> = {};

  /**
   * Create a class dynamically
   */
  static createClass({ name, script, properties = {}, methods = {}, global = false, scope = {} }: { name: string; script?: string; properties?: Record<string, any>; methods?: Record<string, Function>; global?: boolean;scope?:Record<string, any> }): Constructor | undefined {
    let clazz: any;
    const scopeKeys = Object.keys(scope);
    const scopeValues = Object.values(scope);
    if (script == undefined) {
      clazz = new Function(...scopeKeys,`
      return class ${name} {
        constructor(data = {}) {
          Object.assign(this, ${JSON.stringify(properties)}, data);
        }
        ${Object.entries(methods)
          .map(([key, fn]) => `${key} = ${fn.toString()}`)
          .join(";")}
      }
    `)(...scopeValues);
    }
    else {
      clazz = new Function(...scopeKeys,`return ${script}`)(...scopeValues);
    }
    if (clazz) {
      this.registry[name] = clazz;

      if (global) {
        (globalThis as any)[name] = clazz;
      }

      return clazz;
    }
    return undefined;

  }
  /**
   * Get class by name
   */
  static getClass<T = any>({ name }: { name: string }): Constructor<T> | undefined {
    return this.registry[name];
  }

  /**
   * Create instance of registered class
   */
  static createInstance<T = any>({ name, args = [] }: { name: string; args?: any[] }): T {
    const clazz = this.getClass<T>({ name });
    if (!clazz) {
      throw new Error(`Class '${name}' not found in registry.`);
    }
    return new clazz(...args);
  }

  /**
   * Remove class from registry (and global if set)
   */
  static removeClass({ name }: { name: string }): void {
    delete this.registry[name];
    if ((globalThis as any)[name]) {
      delete (globalThis as any)[name];
    }
  }

  /**
   * Execute a script dynamically
   */
  static runScript<T = any>({ script, context = {} }: { script: string; context?: Record<string, any> }): T {
    return new Function(...Object.keys(context), script)(...Object.values(context));
  }
}
