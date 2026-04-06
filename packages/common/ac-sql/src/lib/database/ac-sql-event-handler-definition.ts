import 'reflect-metadata';
import { AcEnumDDRowEvent } from "@autocode-ts/ac-data-dictionary";
import { IAcSqlEventArgs } from "../interfaces/ac-sql-event-args.interface";
import { AcSqlEventResult } from "../models/ac-sql-event-result.model";

/**
 * Defines a SQL event handler for a table, mapping events to handler methods.
 */
export class AcSqlEventHandlerDefinition {
  handler: any;
  private _eventMethods: Map<AcEnumDDRowEvent, string> = new Map();

  /**
   * Registers a method to handle a specific SQL event.
   */
  registerEventHandlerMethod({
    event,
    methodName,
  }: {
    event: AcEnumDDRowEvent;
    methodName: string;
  }): void {
    this._eventMethods.set(event, methodName);
  }

  /**
   * Checks if there is a registered method for the given event.
   */
  hasMethodForEvent({ event }: { event: AcEnumDDRowEvent }): boolean {
    return this._eventMethods.has(event);
  }

  /**
   * Invokes the registered handler method for the given event.
   */
  async handleEvent({
    event,
    args,
  }: {
    event: AcEnumDDRowEvent;
    args: IAcSqlEventArgs;
  }): Promise<AcSqlEventResult> {
    try {
      const methodName = this._eventMethods.get(event);
      if (methodName && this.handler) {
        // Create a new instance of the handler class for each invocation, matching Dart behavior.
        const handlerInstance = new this.handler();

        if (typeof handlerInstance[methodName] === 'function') {
          const result = await handlerInstance[methodName]({ args });
          if (result instanceof AcSqlEventResult) {
            return result;
          }
          // Fallback or simple success result if not an AcSqlEventResult
          return new AcSqlEventResult();
        }
      }
    } catch (e: any) {
      console.error(`[AcSqlEventHandlerDefinition] Error handling ${event}:`, e, e.stack);
      throw e;
    }
    return new AcSqlEventResult();
  }
}
