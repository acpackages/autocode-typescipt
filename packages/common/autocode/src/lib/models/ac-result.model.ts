/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";
import { AcLogger } from "../core/ac-logger";
import { AcJsonUtils } from "../utils/ac-json-utils";

export class AcResult {
  static readonly CODE_NOTHING_EXECUTED = 0;
  static readonly CODE_SUCCESS = 1;
  static readonly CODE_FAILURE = -1;
  static readonly CODE_EXCEPTION = -2;

  static readonly KEY_CODE = 'code';
  static readonly KEY_EXCEPTION = 'exception';
  static readonly KEY_LOG = 'log';
  static readonly KEY_MESSAGE = 'message';
  static readonly KEY_OTHER_DETAILS = 'other_details';
  static readonly KEY_PREVIOUS_RESULT = 'previous_result';
  static readonly KEY_STACK_TRACE = 'stack_trace';
  static readonly KEY_STATUS = 'status';
  static readonly KeyValue = 'value';

  logger?: AcLogger;
  code: number = AcResult.CODE_NOTHING_EXECUTED;
  exception: any = null;
  log: any[] = [];
  message: string = 'Nothing executed';

  @AcBindJsonProperty({ key: AcResult.KEY_OTHER_DETAILS })
  otherDetails: any[] = [];

  @AcBindJsonProperty({ key: AcResult.KEY_STACK_TRACE })
  stackTrace: any;

  status: string = 'failure';
  value: any;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcResult {
    const instance = new AcResult();
    return instance.fromJson({ jsonData });
  }

  fromJson({ jsonData }: { jsonData: any }): AcResult {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  isException(): boolean {
    return this.status === 'failure' && this.code === AcResult.CODE_EXCEPTION;
  }

  isFailure(): boolean {
    return this.status === 'failure';
  }

  isSuccess(): boolean {
    return this.status === 'success';
  }

  appendResultLog({ result }: { result: AcResult }): AcResult {
    this.log.push(...result.log);
    return this;
  }

  prependResultLog({ result }: { result: AcResult }): AcResult {
    this.log.unshift(...result.log);
    return this;
  }

  setFromResult({
    result,
    message,
    logger
  }: {
    result: AcResult;
    message?: string;
    logger?: AcLogger;
  }): AcResult {
    this.status = result.status;
    this.message = result.message;
    this.code = result.code;

    if (this.isException()) {
      this.exception = result.exception;
      this.message = result.message;
    } else if (this.isSuccess()) {
      this.value = result.value;
    }

    return this;
  }

  setSuccess({
    value,
    message,
    logger
  }: {
    value?: any;
    message?: string;
    logger?: AcLogger;
  }= {}): AcResult {
    this.status = 'success';
    this.code = AcResult.CODE_SUCCESS;

    if (value !== undefined) {
      this.value = value;
    }
    if (message) {
      this.message = message;
      logger?.success?.(this.message);
      this.logger?.success?.(this.message);
    }

    return this;
  }

  setFailure({
    value,
    message,
    logger
  }: {
    value?: any;
    message?: string;
    logger?: AcLogger;
  }): AcResult {
    this.status = 'failure';
    this.code = AcResult.CODE_FAILURE;

    if (message) {
      this.message = message;
      logger?.error?.(this.message);
      this.logger?.error?.(this.message);
    }

    return this;
  }

  setException({
    exception,
    message,
    logger,
    logException = false,
    stackTrace
  }: {
    exception: any;
    message?: string;
    logger?: AcLogger;
    logException?: boolean;
    stackTrace?: any;
  }): AcResult {
    this.code = AcResult.CODE_EXCEPTION;
    this.exception = exception;
    this.stackTrace = stackTrace ?? '';
    this.message = message ?? (exception?.toString?.() ?? 'Unknown exception');

    if (logException) {
      logger?.error?.([this.exception?.toString?.(), this.stackTrace]);
      this.logger?.error?.([this.exception?.toString?.(), this.stackTrace]);
    }

    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
