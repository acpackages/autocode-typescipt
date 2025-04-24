import { AcEnumLogType } from '../enums/ac-enum-log-type.enum';
import { AcBackgroundFile, Autocode } from './_classes';

export class AcLogger {
  logType: AcEnumLogType;
  logMessages: boolean;
  prefix: string;
  logDirectory: string;
  logFileName: string;
  logFilePath: string = "";
  logFile: AcBackgroundFile|undefined;
  logFileCreated: boolean;

  messageColors: Record<string, string> = {
    default: "Black",
    debug: "Green",
    error: "Red",
    info: "Blue",
    log: "Cyan",
    warn: "Yellow",
    success: "Green", // Added for consistency
  };

  constructor({
    logMessages = true,
    prefix = "",
    logDirectory = "logs",
    logFileName = "",
    logType = AcEnumLogType.console,
  } = {}) {
    this.logMessages = logMessages;
    this.prefix = prefix;
    this.logDirectory = logDirectory;
    this.logFileName = logFileName;
    this.logType = logType;
    this.logFileCreated = false;
    if(!Autocode.isBrowser()){
      this.logFile = new AcBackgroundFile("");
    }
  }

  debug(...args:any[]) {
    this._loggerMessage(args, "debug");
  }

  error(...args:any[]) {
    this._loggerMessage(args, "error");
  }

  info(...args:any[]) {
    this._loggerMessage(args, "info");
  }

  log(...args:any[]) {
    this._loggerMessage(args, "log");
  }

  warn(...args:any[]) {
    this._loggerMessage(args, "warn");
  }

  success(...args:any[]) {
    this._loggerMessage(args, "success");
  }

  closeLogFile() {
    if (this.logFileCreated && this.logFile) {
      if (this.logType === AcEnumLogType.html) {
        this.logFile.writeAsString("\n\t\t</table>\n\t</body>\n</html>");
      }
      this.logFile.close(); // Ensure to close the log file
    }
  }

  createLogFile() {
    if(!Autocode.isBrowser()){

      this.logFile = new AcBackgroundFile(this.logFilePath);
      if (this.logType === AcEnumLogType.html) {
        this.logFile.writeAsString("<html lang=\"eng\">\n\t<style>\n\t\t[ac-logger-message-data=timestamp]{\n\t\t\t width:225px;\n\t\t\t vertical-align:top;\n\t\t}\n\t\t[ac-logger-message-type=warn]{\n\t\t\t color:orange;\n\t\t}\n\t\t[ac-logger-message-type=error]{\n\t\t\t color:red;\n\t\t}\n\t\t[ac-logger-message-type=success]{\n\t\t\t color:green;\n\t\t}\n\t\t[ac-logger-message-type=info]{\n\t\t\t color:blue;\n\t\t}\n\t\t[ac-logger-message-type=debug]{\n\t\t\t color:magenta;\n\t\t}</style>\n\t<body>\n\t\t<table>");
      }

      this.logFileCreated = true;
    }
  }

  newLines(count:number = 1){
    for(let i=0;i<count;i++){
      this.log("");
    }
  }

  _consoleMessage(message: any, type: string) {
    const label = this.prefix ? `${this.prefix} : ` : "";
    const consoleColor = this.messageColors[type] || this.messageColors.default;
    console.log(`${label}${message}`);
  }

  _loggerMessage(args: any, type: string) {
    if (this.logMessages) {
      if (Array.isArray(args)) {
        for (const message of args) {
          if (this.logType !== AcEnumLogType.console) {
            this._writeToFile(message, type);
          } else {
            this._consoleMessage(message, type);
          }
        }
      } else {
        if (this.logType !== AcEnumLogType.console) {
          this._writeToFile(args, type);
        } else {
          this._consoleMessage(args, type);
        }
      }
    }
  }

  _writeToFile(message: any, type: string) {
    if(Autocode.isBrowser()){
      this._consoleMessage(message, type);
    }
    else{
      if (!this.logFileCreated) {
        this.createLogFile();
      }
      const timestamp = new Date().toISOString();
      if(typeof message != "string"){
        try{
          message = JSON.stringify(message);
        }
        catch(ex){}
      }
      message = message.toString();
      if (this.logType === AcEnumLogType.html) {
        this._writeHtml(timestamp, message, type);
      } else {
        this._writeText(timestamp, message, type);
      }
    }    
  }

  _writeHtml(timestamp: string, message: string, type: string) {
    if(this.logFile){
      if (message) {
        this.logFile.writeAsString(`\n\t\t\t<tr ac-logger-message-row ac-logger-message-type="${type}"><td ac-logger-message-data="timestamp">${timestamp}</td><td ac-logger-message-data="message">${message}</td></tr>`);
      } else {
        this.logFile.writeAsString("\n\t\t\t<tr><td colspan=\"1000\">&nbsp;</td></tr>");
      }
    }    
  }

  _writeText(timestamp: string, message: string, type: string) {
    if(this.logFile){
      this.logFile.writeAsString(`\n${timestamp} => ${message}`);
    }
  }
}