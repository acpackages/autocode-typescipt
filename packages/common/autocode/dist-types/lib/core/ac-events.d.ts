import { AcEventExecutionResult } from "../models/ac-event-execution-result.model";
export declare class AcEvents {
    private _events;
    execute({ key, args }: {
        key: string;
        args?: any[];
    }): AcEventExecutionResult;
    subscribe({ eventName, callback }: {
        eventName: string;
        callback: Function;
    }): string;
    unsubscribe({ subscriptionId }: {
        subscriptionId: string;
    }): void;
}
