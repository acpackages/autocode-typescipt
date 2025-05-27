import { AcResult } from "./ac-result.model";
export declare class AcHookResult extends AcResult {
    static readonly KEY_CONTINUE_OPERATION = "continue_operation";
    static readonly KEY_CHANGES = "changes";
    continueOperation: boolean;
    changes: any[];
    constructor({ continueOperation, changes, }?: {
        continueOperation?: boolean;
        changes?: any[];
    });
}
