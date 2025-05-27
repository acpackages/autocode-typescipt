import { AcHookExecutionResult } from "../models/ac-hook-execution-result.model";
export declare class AcHooks {
    private static _hooks;
    static execute({ hookName, args, }: {
        hookName: string;
        args?: any[];
    }): AcHookExecutionResult;
    static subscribe({ hookName, callback, }: {
        hookName: string;
        callback: Function;
    }): string;
    unsubscribe({ subscriptionId }: {
        subscriptionId: string;
    }): void;
}
