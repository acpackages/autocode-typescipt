export declare class AcDirectoryUtils {
    static checkAndCreateDirectory({ path: dirPath }: {
        path: string;
    }): Promise<void>;
    static copyDirectory({ sourcePath, destinationPath, }: {
        sourcePath: string;
        destinationPath: string;
    }): void;
}
