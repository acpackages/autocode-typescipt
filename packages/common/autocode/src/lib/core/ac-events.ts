/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { AcEventExecutionResult } from "../models/ac-event-execution-result.model";
import { Autocode } from "./autocode";

export class AcEvents {
  private _events: Record<string, Record<string, Function>> = {};

  execute({ eventName, args }: { eventName: string; args?: any }): AcEventExecutionResult {
    const result = new AcEventExecutionResult();

    try {
      const functionResults: Record<string, AcEventExecutionResult> = {};

      if (this._events[eventName]) {
        const functionsToExecute = this._events[eventName];

        for (const [functionId, fun] of Object.entries(functionsToExecute)) {
          const functionResult = fun(...args);

          if (
            functionResult &&
            functionResult instanceof AcEventExecutionResult &&
            functionResult.status === 'success'
          ) {
            functionResults[functionId] = functionResult;
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  subscribe({ eventName, callback }: { eventName: string; callback: Function }): string {
    if (!this._events[eventName]) {
      this._events[eventName] = {};
    }
    const subscriptionId = Autocode.uniqueId();
    this._events[eventName][subscriptionId] = callback;
    return subscriptionId;
  }

  unsubscribe({ subscriptionId }: { subscriptionId: string }): void {
    for (const eventName in this._events) {
      const eventFunctions = this._events[eventName];
      if (eventFunctions[subscriptionId]) {
        delete eventFunctions[subscriptionId];
      }
    }
  }
}
