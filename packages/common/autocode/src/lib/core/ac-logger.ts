/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumLogType } from '../enums/ac-enum-log-type.enum';
import { AcBackgroundFile } from './ac-background-file';
import { Autocode } from './autocode';

export class AcLogger {
  logType: AcEnumLogType = AcEnumLogType.Console;
  logMessages: boolean = true;
  prefix: string = "";
  logDirectory: string = "";
  logFileName: string = "";
  logFilePath: string = "";
  logFile: AcBackgroundFile | undefined;
  logFileCreated: boolean = false;

  messageColors: Record<string, string> = {
    default: "Black",
    debug: "Green",
    error: "Red",
    info: "Blue",
    log: "Cyan",
    warn: "Yellow",
    success: "Green",
  };

  constructor({
    logMessages = true,
    prefix = "",
    logDirectory = "logs",
    logFileName = "",
    logType = AcEnumLogType.Console,
  }: {
    logMessages?: boolean,
    prefix?: string,
    logDirectory?: string,
    logFileName?: string,
    logType?: AcEnumLogType,
  } = {}) {
    this.logMessages = logMessages;
    this.prefix = prefix;
    this.logDirectory = logDirectory;
    this.logFileName = logFileName;
    this.logType = logType;
    if (this.logType !== AcEnumLogType.Console && !Autocode.isBrowser()) {
      this.buildLogFilePath();
    }
  }

  private buildLogFilePath() {
    if (!this.logFileName) {
      const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      this.logFileName = `log-${date}`;
      if (this.logType === AcEnumLogType.Html) {
        this.logFileName += '.html';
      } else {
        this.logFileName += '.log';
      }
    }
    this.logFilePath = `${this.logDirectory}/${this.logFileName}`;
  }

  debug(...args: any[]) {
    this._loggerMessage(args, "debug");
  }

  error(...args: any[]) {
    this._loggerMessage(args, "error");
  }

  info(...args: any[]) {
    this._loggerMessage(args, "info");
  }

  log(...args: any[]) {
    this._loggerMessage(args, "log");
  }

  warn(...args: any[]) {
    this._loggerMessage(args, "warn");
  }

  success(...args: any[]) {
    this._loggerMessage(args, "success");
  }

  closeLogFile() {
    if (this.logFileCreated && this.logFile) {
      if (this.logType === AcEnumLogType.Html) {
        this.logFile.writeAsString("\n\t\t</table>\n\t</body>\n</html>");
      }
      this.logFile.close();
      this.logFile = undefined;
      this.logFileCreated = false;
    }
  }

  createLogFile() {
    if (Autocode.isBrowser() || this.logFileCreated) {
      return;
    }

    this.buildLogFilePath();

    try {
      if (this.logFile) {
        this.logFile.close();
        this.logFile = undefined;
      }
      this.logFile = new AcBackgroundFile(this.logFilePath);

      if (this.logType === AcEnumLogType.Html) {
        this.logFile.writeAsString(
          `<html lang="en">\n\t<style>\n\t\t[ac-logger-message-data=timestamp]{\n\t\t\twidth:225px;\n\t\t\tvertical-align:top;\n\t\t}\n\t\t[ac-logger-message-type=warn]{\n\t\t\tcolor:orange;\n\t\t}\n\t\t[ac-logger-message-type=error]{\n\t\t\tcolor:red;\n\t\t}\n\t\t[ac-logger-message-type=success]{\n\t\t\tcolor:green;\n\t\t}\n\t\t[ac-logger-message-type=info]{\n\t\t\tcolor:blue;\n\t\t}\n\t\t[ac-logger-message-type=debug]{\n\t\t\tcolor:magenta;\n\t\t}\n\t</style>\n\t<body>\n\t\t<table>`
        );
      }

      this.logFileCreated = true;
    } catch (err) {
      console.error("Failed to create log file:", err);
      this.logFile?.close();
      this.logFile = undefined;
      this.logFileCreated = false;
    }
  }

  newLines(count: number = 1) {
    for (let i = 0; i < count; i++) {
      this.log("");
    }
  }

  private _consoleMessage(message: any, type: string) {
    const label = this.prefix ? `${this.prefix} : ` : "";
    const consoleColor = this.messageColors[type] || this.messageColors['default'];
    if (Array.isArray(message)) {
      console.log(...message);
    } else {
      console.log(message);
    }
  }

  private _loggerMessage(args: any, type: string) {
    if (this.logMessages) {
      if (Array.isArray(args)) {
        for (const message of args) {
          if (this.logType !== AcEnumLogType.Console) {
            this._writeToFile(message, type);
          } else {
            this._consoleMessage(message, type);
          }
        }
      } else {
        if (this.logType !== AcEnumLogType.Console) {
          this._writeToFile(args, type);
        } else {
          this._consoleMessage(args, type);
        }
      }
    }
    (args as any) = null;
  }

  private _writeToFile(message: any, type: string) {
    if (Autocode.isBrowser()) {
      this._consoleMessage(message, type);
      return;
    }

    if (!this.logFileCreated || !this.logFile) {
      this.createLogFile();
    }

    if (!this.logFile || !this.logFileCreated) {
      this._consoleMessage(message, type); // Fallback to console
      return;
    }

    const timestamp = new Date().toISOString();
    const logMessage = this.sanitizeAndStringify(message);

    if (this.logType === AcEnumLogType.Html) {
      this._writeHtml(timestamp, logMessage, type);
    } else {
      this._writeText(timestamp, logMessage, type);
    }
  }

  private sanitizeAndStringify(value: any): string {
    if (value === null || value === undefined) return String(value);
    if (typeof value === 'string') return value;
    if (value instanceof Error) {
      return `${value.name}: ${value.message}\n${value.stack || ''}`;
    }

    try {
      const replacer = (key: string, val: any) => {
        if (key.toLowerCase().includes('password') ||
            key.toLowerCase().includes('token') ||
            key.toLowerCase().includes('secret') ||
            key.toLowerCase().includes('authorization')) {
          return '[REDACTED]';
        }
        return val;
      };

      let str = JSON.stringify(value, replacer, 2);
      if (str.length > 15000) {
        str = str.substring(0, 15000) + '\n...[truncated]';
      }
      return str;
    } catch (e) {
      return `[Failed to stringify: ${String(value)}]`;
    }
  }

  private _writeHtml(timestamp: string, message: string, type: string) {
    if (this.logFile) {
      if (message) {
        this.logFile.writeAsString(`\n\t\t\t<tr ac-logger-message-row ac-logger-message-type="${type}"><td ac-logger-message-data="timestamp">${timestamp}</td><td ac-logger-message-data="message">${message}</td></tr>`);
      } else {
        this.logFile.writeAsString("\n\t\t\t<tr><td colspan=\"1000\">&nbsp;</td></tr>");
      }
    }
  }

  private _writeText(timestamp: string, message: string, type: string) {
    if (this.logFile) {
      this.logFile.writeAsString(`\n${timestamp} => ${message}`);
    }
  }
}
