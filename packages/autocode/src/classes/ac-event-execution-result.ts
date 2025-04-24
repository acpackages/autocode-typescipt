import { AcResult } from "./ac-result";

export class AcEventExecutionResult extends AcResult {
    static keyHasResults = "has_results";
    hasResults: boolean = false;
    results: any = {};

    toJson(): any {
        let result: any = super.toJson();
        result[AcEventExecutionResult.keyHasResults] = this.hasResults;
        return result;
    }

}