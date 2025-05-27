export declare class AcEncryption {
    static encryptionKey: string;
    private static iv;
    static encrypt({ plainText, customKey, }: {
        plainText: string;
        customKey?: string;
    }): Promise<string>;
    static decrypt({ encryptedText, customKey, }: {
        encryptedText: string;
        customKey?: string;
    }): Promise<string>;
    private static _deriveKeyNode;
    private static _deriveKeyBrowser;
}
