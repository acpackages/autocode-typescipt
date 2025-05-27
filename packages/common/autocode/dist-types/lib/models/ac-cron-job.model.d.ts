export declare class AcCronJob {
    static readonly KEY_CALLBACK = "callback";
    static readonly KEY_DURATION = "duration";
    static readonly KEY_EXECUTION = "execution";
    static readonly KEY_ID = "id";
    static readonly KEY_LAST_EXECUTION_TIME = "last_execution_time";
    id: string;
    execution: string;
    duration: Record<string, number>;
    callback: () => any;
    lastExecutionTime?: Date;
    constructor({ id, execution, duration, callback, }: {
        id: string;
        execution: string;
        duration: Record<string, number>;
        callback: () => any;
    });
}
