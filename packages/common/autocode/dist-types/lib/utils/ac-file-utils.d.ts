export declare class AcFileUtils {
    private static readonly _mimeTypes;
    static mimeFromExtension({ extension }: {
        extension: string;
    }): string | undefined;
    static mimeFromPath({ path }: {
        path: string;
    }): string | undefined;
    static mimeFromFile({ file }: {
        file: {
            path?: string;
            name?: string;
        };
    }): string | undefined;
    static mimeFromPathOrDefault({ path, defaultType }: {
        path: string;
        defaultType?: string;
    }): string;
}
