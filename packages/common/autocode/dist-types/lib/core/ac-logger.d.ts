import { AcEnumLogType } from '../enums/ac-enum-log-type.enum';
import { AcBackgroundFile } from './ac-background-file';
export declare class AcLogger {
    logType: AcEnumLogType;
    logMessages: boolean;
    prefix: string;
    logDirectory: string;
    logFileName: string;
    logFilePath: string;
    logFile: AcBackgroundFile | undefined;
    logFileCreated: boolean;
    messageColors: Record<string, string>;
    constructor({ logMessages, prefix, logDirectory, logFileName, logType, }?: {
        logMessages?: boolean | undefined;
        prefix?: string | undefined;
        logDirectory?: string | undefined;
        logFileName?: string | undefined;
        logType?: "console" | undefined;
    });
    debug(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
    log(...args: any[]): void;
    warn(...args: any[]): void;
    success(...args: any[]): void;
    closeLogFile(): void;
    createLogFile(): void;
    newLines(count?: number): void;
    _consoleMessage(message: any, type: string): void;
    _loggerMessage(args: any, type: string): void;
    _writeToFile(message: any, type: string): void;
    _writeHtml(timestamp: string, message: string, type: string): void;
    _writeText(timestamp: string, message: string, type: string): void;
}
