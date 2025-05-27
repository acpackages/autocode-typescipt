/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";
import { AcResult } from "./ac-result.model";

export class AcEventExecutionResult extends AcResult {
  static readonly KEY_CONTINUE_OPERATION = "continue_operation";
  static readonly KEY_HAS_RESULTS = "has_results";
  static readonly KEY_RESULTS = "results";

  @AcBindJsonProperty({ key: AcEventExecutionResult.KEY_CONTINUE_OPERATION })
  continueOperation: boolean = true;

  @AcBindJsonProperty({ key: AcEventExecutionResult.KEY_HAS_RESULTS })
  hasResults: boolean = false;

  results: { [key: string]: any } = {};

  constructor({
    continueOperation = true,
    hasResults = false,
    results = {},
  }: {
    continueOperation?: boolean;
    hasResults?: boolean;
    results?: { [key: string]: any };
  } = {}) {
    super();
    this.continueOperation = continueOperation;
    this.hasResults = hasResults;
    this.results = results;
  }
}
