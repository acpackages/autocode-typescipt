/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";
import { AcResult } from "./ac-result.model";

export class AcHookExecutionResult extends AcResult {
  static readonly KeyContinueOperation = "continueOperation";
  static readonly KeyHasResults = "hasResults";
  static readonly KeyResults = "results";

  @AcBindJsonProperty({ key: AcHookExecutionResult.KeyContinueOperation })
  continueOperation: boolean = true;

  @AcBindJsonProperty({ key: AcHookExecutionResult.KeyHasResults })
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
