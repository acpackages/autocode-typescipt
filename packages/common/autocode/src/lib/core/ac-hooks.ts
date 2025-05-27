/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { AcHookExecutionResult } from "../models/ac-hook-execution-result.model";
import { Autocode } from "./autocode";

export class AcHooks {
  private static _hooks: Record<string, Record<string, Function>> = {};

  static execute({
    hookName,
    args = [],
  }: {
    hookName: string;
    args?: any[];
  }): AcHookExecutionResult {
    const result = new AcHookExecutionResult();
    try {
      const functionResults: Record<string, any> = {};
      let continueOperation = true;

      if (AcHooks._hooks[hookName]) {
        const functionsToExecute = AcHooks._hooks[hookName];

        for (const [functionId, fun] of Object.entries(functionsToExecute)) {
          if (!continueOperation) break;

          const functionResult = fun(...args);

          if (functionResult != null) {
            functionResults[functionId] = functionResult;

            if (typeof functionResult.isFailure === 'function' && functionResult.isFailure()) {
              continueOperation = false;
            }

            if (functionResult.continueOperation !== true) {
              result.continueOperation = false;
            }
          }
        }
      }

      if (Object.keys(functionResults).length > 0) {
        result.hasResults = true;
        result.results = functionResults;
      }

      result.setSuccess();
    } catch (ex) {
      result.setException({ exception: ex });
    }

    return result;
  }

  static subscribe({
    hookName,
    callback,
  }: {
    hookName: string;
    callback: Function;
  }): string {
    if (!AcHooks._hooks[hookName]) {
      AcHooks._hooks[hookName] = {};
    }
    const subscriptionId = Autocode.uniqueId();
    AcHooks._hooks[hookName][subscriptionId] = callback;
    return subscriptionId;
  }

  unsubscribe({ subscriptionId }: { subscriptionId: string }): void {
    for (const hookFunctions of Object.values(AcHooks._hooks)) {
      if (hookFunctions[subscriptionId]) {
        delete hookFunctions[subscriptionId];
      }
    }
  }
}
