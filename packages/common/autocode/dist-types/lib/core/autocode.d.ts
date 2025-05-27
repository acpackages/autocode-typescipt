export declare class Autocode {
    private static _consoleColors;
    private static _uniqueIds;
    private static _characters;
    private static _randomInt;
    static enumToObject<T>(enumType: any): Record<string, T[keyof T]>;
    static isBrowser(): boolean;
    static uniqueId(): string;
    static generateRandomString(length?: number): string;
    static getClassNameFromInstance(instance: object): string;
    static getExceptionMessage(params: {
        exception: any;
        stackTrace?: any;
    }): string;
    static validPrimaryKey(value: any): boolean;
    static validValue(value: any): boolean;
    static uuid(): string;
    private static _generateRandomHex;
}
