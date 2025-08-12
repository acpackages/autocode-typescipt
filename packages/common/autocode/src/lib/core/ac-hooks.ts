/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { AcHookExecutionResult } from "../models/ac-hook-execution-result.model";
import { Autocode } from "./autocode";

export class AcHooks {
  private hooks: Record<string, Record<string, Function>> = {};
  private allHookCallbacks: Record<string, Function> = {};

  execute({ hookName, args = [] }: { hookName: string; args?: any; }): AcHookExecutionResult {
    const result = new AcHookExecutionResult();
    try {
      const functionResults: Record<string, any> = {};
      let continueOperation = true;

      if (this.hooks[hookName]) {
        const functionsToExecute = this.hooks[hookName];

        for (const [functionId, fun] of Object.entries(functionsToExecute)) {
          if (!continueOperation) break;
          try {
            const functionResult = fun(args);

            if (functionResult) {
              functionResults[functionId] = functionResult;

              if (typeof functionResult.isFailure === 'function' && functionResult.isFailure()) {
                continueOperation = false;
              }

              if (functionResult.continueOperation !== true) {
                result.continueOperation = false;
              }
            }
          } catch (ex) {
            console.error(ex);
          }
        }
      }

      for (const [functionId, fun] of Object.entries(this.allHookCallbacks)) {
          if (!continueOperation) break;
          try {
            const functionResult = fun(hookName, args);

            if (functionResult) {
              functionResults[functionId] = functionResult;

              if (typeof functionResult.isFailure === 'function' && functionResult.isFailure()) {
                continueOperation = false;
              }

              if (functionResult.continueOperation !== true) {
                result.continueOperation = false;
              }
            }
          } catch (ex) {
            console.error(ex);
          }
        }

      if (Object.keys(functionResults).length > 0) {
        result.hasResults = true;
        result.results = functionResults;
      }

      result.setSuccess();
    } catch (ex) {
      result.setException({ exception: ex });
      console.error(ex);
    }

    return result;
  }

  subscribe({
    hookName,
    callback,
  }: {
    hookName: string;
    callback: Function;
  }): string {
    if (!this.hooks[hookName]) {
      this.hooks[hookName] = {};
    }
    const subscriptionId = Autocode.uniqueId();
    this.hooks[hookName][subscriptionId] = callback;
    return subscriptionId;
  }

  subscribeAllHooks({ callback }: { callback: Function }): string {
    const subscriptionId = Autocode.uniqueId();
    this.allHookCallbacks[subscriptionId] = callback;
    return subscriptionId;
  }

  unsubscribe({ subscriptionId }: { subscriptionId: string }): void {
    for (const hookFunctions of Object.values(this.hooks)) {
      if (hookFunctions[subscriptionId]) {
        delete hookFunctions[subscriptionId];
      }
    }
  }

  unsubscribeAllHooks({ subscriptionId }: { subscriptionId: string }): void {
    if (this.allHookCallbacks[subscriptionId]) {
      delete this.allHookCallbacks[subscriptionId];
    }
  }

}

export const acHooks = new AcHooks();
