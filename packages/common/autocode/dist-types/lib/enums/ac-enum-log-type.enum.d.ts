export declare const AcEnumLogType: {
    readonly CONSOLE: "console";
    readonly PRINT: "print";
    readonly HTML: "html";
    readonly SQLITE: "sqlite";
    readonly TEXT: "text";
};
export type AcEnumLogType = typeof AcEnumLogType[keyof typeof AcEnumLogType];
