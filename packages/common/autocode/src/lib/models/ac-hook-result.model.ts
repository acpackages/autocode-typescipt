/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty } from "../annotations/ac-bind-json-property.annotation";
import { AcResult } from "./ac-result.model";

export class AcHookResult extends AcResult {
  static readonly KeyContinueOperation = "continue_operation";
  static readonly KeyChanges = "changes";

  @AcBindJsonProperty({ key: AcHookResult.KeyContinueOperation })
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
