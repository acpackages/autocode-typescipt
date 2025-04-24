import { AcLogger } from "./ac-logger";

export class AcResult {
  static readonly codeNothingExecuted = 0;
  static readonly codeSuccess = 1;
  static readonly codeFailure = -1;
  static readonly codeException = -2;

  static readonly keyCode = "code";
  static readonly keyMessage = "message";
  static readonly keyOtherDetails = "other_details";
  static readonly keyStatus = "status";
  static readonly keyValue = "value";

  exception: any;
  stackTrace?: Error;
  logger?: AcLogger;
  code: number = AcResult.codeNothingExecuted;
  message: any = "";
  status: string = "failure";
  value: any;
  otherDetails: Record<string, any> = {};
  log: any[] = [];

  static fromJson(mapData: Record<string, any>): AcResult {
    const instance = new AcResult();
    instance.setValuesFromJson(mapData);
    return instance;
  }

  isException(): boolean {
    return this.status === "failure" && this.code === AcResult.codeException;
  }

  isFailure(): boolean {
    return this.status === "failure";
  }

  isSuccess(): boolean {
    return this.status === "success";
  }

  appendResultLog(result: AcResult) {
    this.log.push(...result.log);
  }

  prependResultLog(result: AcResult) {
    this.log.unshift(...result.log);
  }

  setFromResult(result: AcResult) {
    this.status = result.status;
    this.message = result.message;
    this.code = result.code;
    if (this.isException()) {
      this.exception = result.exception;
      this.message = result.message;
    } else if (this.isSuccess()) {
      this.value = result.value;
    }
  }

  setSuccess({exception,logException,logger,message,stackTrace,value}: {
    exception?: any,
    logException?: boolean,
    logger?: AcLogger,
    message?: string,
    stackTrace?: Error,
    value?: any,
  } = {}) {
    this.status = "success";
    this.code = AcResult.codeSuccess;
    if (value !== undefined) {
      this.value = value;
    }
    if (message) {
      this.message = message;
      logger?.success([message]);
      this.logger?.success([message]);
    }
  }

  setFailure({exception,logException,logger,message,stackTrace,value}: {
      exception?: any,
      logException?: boolean,
      logger?: AcLogger,
      message?: string,
      stackTrace?: Error,
      value?: any,
    }={}) {
    this.status = "failure";
    this.code = AcResult.codeFailure;
    if (message) {
      this.message = message;
      logger?.error([message]);
      this.logger?.error([message]);
    }
  }

  setException(exception:any,{logException,logger,message,stackTrace,value}: {
      logException?: boolean,
      logger?: AcLogger,
      message?: string,
      stackTrace?: Error,
      value?: any,
    } = {}
  ) {
    this.code = AcResult.codeException;
    this.exception = exception;
    this.stackTrace = stackTrace;
    this.message = message || exception.toString();
    logger?.error([exception, stackTrace]);
    this.logger?.error([exception, stackTrace]);
  }

  setValuesFromJson(mapData: Record<string, any>) {
    if (AcResult.keyCode in mapData) {
      this.code = mapData[AcResult.keyCode];
    }
    if (AcResult.keyMessage in mapData) {
      this.message = mapData[AcResult.keyMessage];
    }
    if (AcResult.keyOtherDetails in mapData) {
      this.otherDetails = mapData[AcResult.keyOtherDetails];
    }
    if (AcResult.keyStatus in mapData) {
      this.status = mapData[AcResult.keyStatus];
    }
    if (AcResult.keyValue in mapData) {
      this.value = mapData[AcResult.keyValue];
    }
  }

  toJson(): Record<string, any> {
    return {
      [AcResult.keyCode]: this.code,
      [AcResult.keyMessage]: this.message,
      [AcResult.keyOtherDetails]: this.otherDetails,
      [AcResult.keyStatus]: this.status,
      [AcResult.keyValue]: this.value,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
