
export class AcRuntimeDeclaration {
  static getTypeDeclaration({type}:{type: any}): any {
    if (!type) return;

    const decl = this.buildDeclaration({type});
    return decl;
  }

  private static buildDeclaration({type}:{type: any}): string | null {
    if (typeof type === "function") {
      // Likely a class or constructor
      return this.buildClassDecl({type});
    }

    if (typeof type === "object") {
      // Could be enum-like or const object
      return this.buildEnumOrConstDecl({obj:type});
    }

    return null;
  }

  private static buildClassDecl({type}:{type: Function}): string {
    const name = type.name || "AnonymousClass";
    const proto = type.prototype;

    const methods = Object.getOwnPropertyNames(proto)
      .filter(m => m !== "constructor")
      .map(m => `${m}(...args: any[]): any;`)
      .join("\n  ");

    const props = Object.keys(new (type as any)())
      .map(p => `${p}: any;`)
      .join("\n  ");

    return `declare class ${name} {
  ${props}
  ${methods}
}`;
  }

  private static buildEnumOrConstDecl({obj}:{obj: object}): string {
    const keys = Object.keys(obj);

    // Try to decide enum vs const
    const isEnumLike = keys.every(k => typeof (obj as any)[k] === "number" || typeof (obj as any)[k] === "string");

    if (isEnumLike) {
      const members = keys.map(k => `${k} = ${(obj as any)[k]}`).join(",\n  ");
      return `declare enum ${this.inferEnumName({obj})} {
  ${members}
}`;
    } else {
      const members = keys.map(k => `const ${k}: any;`).join("\n");
      return `declare const ${this.inferConstName({obj})}: {
  ${members}
}`;
    }
  }

  private static inferEnumName({obj}:{obj: object}): string {
    return obj.constructor?.name && obj.constructor.name !== "Object"
      ? obj.constructor.name
      : "AnonymousEnum";
  }

  private static inferConstName({obj}:{obj: object}): string {
    return obj.constructor?.name && obj.constructor.name !== "Object"
      ? obj.constructor.name
      : "AnonymousConst";
  }
}
