/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";
import { AcResult } from "./ac-result.model";

export class AcHookResult extends AcResult {
  static readonly KEY_CONTINUE_OPERATION = "continue_operation";
  static readonly KEY_CHANGES = "changes";

  @AcBindJsonProperty({ key: AcHookResult.KEY_CONTINUE_OPERATION })
  continueOperation: boolean = true;

  // changes: any[] = [];

  // constructor({
  //   continueOperation = true,
  //   changes = [],
  // }: {
  //   continueOperation?: boolean;
  //   changes?: any[];
  // } = {}) {
  //   super();
  //   this.continueOperation = continueOperation;
  //   this.changes = changes;
  // }
}
