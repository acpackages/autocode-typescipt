/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */

import { AcEventExecutionResult } from "../models/ac-event-execution-result.model";
import { Autocode } from "./autocode";

export class AcEvents {
  private events: Record<string, Record<string, Function>> = {};
  private allEventCallbacks: Record<string, Function> = {};

  execute({ eventName, args }: { eventName: string; args?: any }): AcEventExecutionResult {
    const result = new AcEventExecutionResult();
    try {
      const functionResults: Record<string, AcEventExecutionResult> = {};
      if (this.events[eventName]) {
        const functionsToExecute = this.events[eventName];
        for (const [functionId, fun] of Object.entries(functionsToExecute)) {
          try{
            const functionResult = fun(args);
            if (
              functionResult &&
              functionResult instanceof AcEventExecutionResult &&
              functionResult.status === 'success'
            ) {
              functionResults[functionId] = functionResult;
            }
          } catch (ex) {
            console.error(ex);
          }
        }
      }
      for (const [functionId, fun] of Object.entries(this.allEventCallbacks)) {
        try{
          const functionResult = fun(eventName, args);
          if (
            functionResult &&
            functionResult instanceof AcEventExecutionResult &&
            functionResult.status === 'success'
          ) {
            functionResults[functionId] = functionResult;
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

  subscribe({ eventName, callback }: { eventName: string; callback: Function }): string {
    if (!this.events[eventName]) {
      this.events[eventName] = {};
    }
    const subscriptionId = Autocode.uniqueId();
    this.events[eventName][subscriptionId] = callback;
    return subscriptionId;
  }

  subscribeAllEvents({ callback }: { callback: Function }): string {
    const subscriptionId = Autocode.uniqueId();
    this.allEventCallbacks[subscriptionId] = callback;
    return subscriptionId;
  }

  unsubscribe({ subscriptionId }: { subscriptionId: string }): void {
    for (const eventName in this.events) {
      const eventFunctions = this.events[eventName];
      if (eventFunctions[subscriptionId]) {
        delete eventFunctions[subscriptionId];
      }
    }
  }

  unsubscribeAllEvents({ subscriptionId }: { subscriptionId: string }): void {
    if (this.allEventCallbacks[subscriptionId]) {
      delete this.allEventCallbacks[subscriptionId];
    }
  }
}
