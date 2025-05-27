export declare class AcBackgroundFile {
    private filePath;
    private isClosed;
    private tempBuffer;
    private processingBuffer;
    private workerIntialized;
    private worker;
    constructor(filePath: string);
    close(): void;
    private intizalizeBrowserBackgroundFile;
    private initializeNodeBackgroundFile;
    private log;
    notifyWorkerInitialized(): void;
    writeAsString(content: string): void;
    private processBuffer;
}
