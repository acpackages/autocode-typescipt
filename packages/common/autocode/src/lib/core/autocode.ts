import { v4 as uuidv4 } from 'uuid';

export class Autocode {
  private static _consoleColors: Record<string, string> = {
    Black: '\x1B[30m',
    Red: '\x1B[31m',
    Green: '\x1B[32m',
    Yellow: '\x1B[33m',
    Blue: '\x1B[34m',
    Magenta: '\x1B[35m',
    Cyan: '\x1B[36m',
    White: '\x1B[37m',
    Reset: '\x1B[0m',
  };

  private static _uniqueIds: Record<string, Set<string>> = {};

  private static _characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Simple crypto secure random generator for browser/node environments
  private static _randomInt(max: number): number {
    // Node.js crypto is used here; adjust for browser if needed
    return Math.floor(Math.random() * max);
  }

  static enumToObject<T>(enumType: any): Record<string, T[keyof T]> {
        return Object.keys(enumType)
            .filter((key) => isNaN(Number(key)))
            .reduce((obj, key) => {
                obj[key] = enumType[key as keyof T];
                return obj;
            }, {} as Record<string, T[keyof T]>);
    }

    static isBrowser(): boolean {
        return typeof window !== 'undefined';
    }

  static uniqueId(): string {
    const timestamp = Math.floor(Date.now() / 1000);
    const timestampHex = timestamp.toString(16);
    const randomPart = this.uuid();
    let id = `ac_${this.generateRandomString()}${timestampHex}${randomPart}`;

    const tsKey = timestamp.toString();
    if (!this._uniqueIds[tsKey]) {
      this._uniqueIds[tsKey] = new Set();
    }

    while (this._uniqueIds[tsKey].has(id)) {
      const newRandom = this.uuid();
      id = `ac_${this.generateRandomString()}${timestampHex}${newRandom}`;
    }
    this._uniqueIds[tsKey].add(id);

    return id;
  }

  static generateRandomString(length = 10): string {
    let buffer = '';
    for (let i = 0; i < length; i++) {
      const index = this._randomInt(this._characters.length);
      buffer += this._characters.charAt(index);
    }
    return buffer;
  }

  static getClassNameFromInstance(instance: object): string {
    return instance.constructor.name;
  }

  static getExceptionMessage({exception,stackTrace}: { exception: any; stackTrace?: any }): string {
    if (stackTrace) {
      console.error(this._consoleColors["Red"] + stackTrace.toString() + this._consoleColors["Reset"]);
    }
    console.error(this._consoleColors["Red"] + exception.toString() + this._consoleColors["Reset"]);
    return exception.toString();
  }

  static validPrimaryKey({value}:{value: any}): boolean {
    if (value != null && value !== '') {
      if (typeof value === 'string' && value !== '0') return true;
      if (typeof value === 'number' && value !== 0) return true;
    }
    return false;
  }

  static validValue(value: any): boolean {
    return value != null;
  }

  static uuid(): string {
    return uuidv4();
  }

}
