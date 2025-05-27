import { AcLogger } from "../core/ac-logger";
export declare class AcResult {
    static readonly CODE_NOTHING_EXECUTED = 0;
    static readonly CODE_SUCCESS = 1;
    static readonly CODE_FAILURE = -1;
    static readonly CODE_EXCEPTION = -2;
    static readonly KEY_CODE = "code";
    static readonly KEY_EXCEPTION = "exception";
    static readonly KEY_LOG = "log";
    static readonly KEY_MESSAGE = "message";
    static readonly KEY_OTHER_DETAILS = "other_details";
    static readonly KEY_PREVIOUS_RESULT = "previous_result";
    static readonly KEY_STACK_TRACE = "stack_trace";
    static readonly KEY_STATUS = "status";
    static readonly KEY_VALUE = "value";
    logger?: AcLogger;
    code: number;
    exception: any;
    log: any[];
    message: string;
    otherDetails: any[];
    stackTrace: any;
    status: string;
    value: any;
    static instanceFromJson({ jsonData }: {
        jsonData: Record<string, any>;
    }): AcResult;
    fromJson({ jsonData }: {
        jsonData: Record<string, any>;
    }): AcResult;
    isException(): boolean;
    isFailure(): boolean;
    isSuccess(): boolean;
    appendResultLog({ result }: {
        result: AcResult;
    }): AcResult;
    prependResultLog({ result }: {
        result: AcResult;
    }): AcResult;
    setFromResult({ result, message, logger }: {
        result: AcResult;
        message?: string;
        logger?: AcLogger;
    }): AcResult;
    setSuccess({ value, message, logger }?: {
        value?: any;
        message?: string;
        logger?: AcLogger;
    }): AcResult;
    setFailure({ value, message, logger }: {
        value?: any;
        message?: string;
        logger?: AcLogger;
    }): AcResult;
    setException({ exception, message, logger, logException, stackTrace }: {
        exception: any;
        message?: string;
        logger?: AcLogger;
        logException?: boolean;
        stackTrace?: any;
    }): AcResult;
    toJson(): Record<string, any>;
    toString(): string;
}
