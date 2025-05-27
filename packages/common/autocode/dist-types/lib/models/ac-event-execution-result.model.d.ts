import { AcResult } from "./ac-result.model";
export declare class AcEventExecutionResult extends AcResult {
    static readonly KEY_CONTINUE_OPERATION = "continue_operation";
    static readonly KEY_HAS_RESULTS = "has_results";
    static readonly KEY_RESULTS = "results";
    continueOperation: boolean;
    hasResults: boolean;
    results: {
        [key: string]: any;
    };
    constructor({ continueOperation, hasResults, results, }?: {
        continueOperation?: boolean;
        hasResults?: boolean;
        results?: {
            [key: string]: any;
        };
    });
}
