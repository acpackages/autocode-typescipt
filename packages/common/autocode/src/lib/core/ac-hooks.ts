/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { AcHookExecutionResult } from "../models/ac-hook-execution-result.model";
import { Autocode } from "./autocode";

export class AcHooks {
  private hooks: Record<string, Record<string, Function>> = {};
  private allHookCallbacks: Record<string, Function> = {};

  clearSubscriptions(){
    this.hooks = {};
    this.allHookCallbacks = {};
  }

  execute({ hook, args = [] }: { hook: string; args?: any; }): AcHookExecutionResult {
    const result = new AcHookExecutionResult();
    try {
      const name = hook.toLowerCase();
      const functionResults: Record<string, any> = {};
      let continueOperation = true;

      if (this.hooks[name]) {
        const functionsToExecute = this.hooks[name];

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
            const functionResult = fun(name, args);

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
    hook,
    callback,
  }: {
    hook: string;
    callback: Function;
  }): string {
    const name = hook.toLowerCase();
    if (!this.hooks[name]) {
      this.hooks[name] = {};
    }
    const subscriptionId = Autocode.uniqueId();
    this.hooks[name][subscriptionId] = callback;
    return subscriptionId;
  }

  subscribeAllHooks({ callback }: { callback: Function }): string {
    const subscriptionId = Autocode.uniqueId();
    this.allHookCallbacks[subscriptionId] = callback;
    return subscriptionId;
  }


  unsubscribe({ hook, callback, subscriptionId }: { hook?: string; callback?: Function, subscriptionId?: string }): boolean {
    let removed: boolean = false;
    if (subscriptionId) {
      for (const hook in this.hooks) {
        const hookFunctions = this.hooks[hook];
        if (hookFunctions[subscriptionId]) {
          delete hookFunctions[subscriptionId];
          removed = true;
        }
      }

    }
    else if (callback) {
      const removeFunction = (hookName: string): boolean => {
        let found: boolean = false;
        const hookFunctions = this.hooks[hookName];
        for (const subscriptionId of Object.keys(hookFunctions)) {
          if (!found) {
            if (hookFunctions[subscriptionId] == callback) {
              delete hookFunctions[subscriptionId];
              found = true;
              break;
            }
          }
        }
        return found;
      };
      if (hook) {
        removed = removeFunction(hook);
      }
      else {
        for (const hookName of Object.keys(this.hooks)) {
          if (!removed) {
            const found = removeFunction(hookName);
            if (found) {
              removed = true;
              break;
            }
          }
        }
      }
    }
    return removed;
  }

  unsubscribeAllHooks({ callback, subscriptionId }: { callback?: Function, subscriptionId?: string }): boolean {
    let removed: boolean = false;
    if (subscriptionId) {
      if (this.allHookCallbacks[subscriptionId]) {
        delete this.allHookCallbacks[subscriptionId];
      }
    }
    else {
      for (const subscriptionId of Object.keys(this.allHookCallbacks)) {
        if (!removed) {
          if (this.allHookCallbacks[subscriptionId] == callback) {
            delete this.allHookCallbacks[subscriptionId];
            removed = true;
            break;
          }
        }
      }
    }
    return removed;
  }

}

export const acHooks = new AcHooks();
