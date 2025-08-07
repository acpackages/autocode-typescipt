/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";
import { AcResult } from "./ac-result.model";

export class AcEventExecutionResult extends AcResult {
  static readonly KeyContinueOperation = "continue_operation";
  static readonly KeyHasResults = "has_results";
  static readonly KeyResults = "results";

  @AcBindJsonProperty({ key: AcEventExecutionResult.KeyContinueOperation })
  continueOperation: boolean = true;

  @AcBindJsonProperty({ key: AcEventExecutionResult.KeyHasResults })
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
