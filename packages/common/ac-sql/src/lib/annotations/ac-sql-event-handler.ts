import 'reflect-metadata';
import { AcEnumDDRowEvent } from "@autocode-ts/ac-data-dictionary";
import { AcSqlEventHandlerDefinition } from "../database/ac-sql-event-handler-definition";

/**
 * Global registry for table event handlers.
 */
const globalRegistry = (globalThis as any).AcSqlEventHandlersRegistry || {};
(globalThis as any).AcSqlEventHandlersRegistry = globalRegistry;
export const AcSqlEventHandlersRegistry: Record<string, AcSqlEventHandlerDefinition> = globalRegistry;

/**
 * Decorator to define a handler class for table SQL events.
 * 
 * @param tableName The name of the database table this handler manages.
 */
export function AcSqlEventHandler({ tableName }: { tableName: string }) {
  return function (target: any) {
    if (!AcSqlEventHandlersRegistry[tableName]) {
      AcSqlEventHandlersRegistry[tableName] = new AcSqlEventHandlerDefinition();
    }
    const definition = AcSqlEventHandlersRegistry[tableName];
    definition.handler = target;

    // Scan for methods with event callback metadata and register them in the definition.
    const prototype = target.prototype;
    if (prototype) {
      Object.getOwnPropertyNames(prototype).forEach((propertyName) => {
        const method = prototype[propertyName];
        let event = Reflect.getMetadata('ac_sql_event_callback', prototype, propertyName);
        if (!event && typeof method === 'function') {
          event = Reflect.getMetadata('ac_sql_event_callback', method);
        }
        
        if (event) {
          definition.registerEventHandlerMethod({ event, methodName: propertyName });
        }
      });
    }
  };
}

/**
 * Decorator to register a method to handle a specific SQL event.
 * 
 * @param event The SQL event to handle.
 */
export function AcSqlEventCallback({ event }: { event: AcEnumDDRowEvent }) {
  return function (target: any, propertyKey: any, descriptor?: PropertyDescriptor) {
    // Store metadata on the target (prototype in experimental, function in standard).
    if (typeof propertyKey === 'string') {
      Reflect.defineMetadata('ac_sql_event_callback', event, target, propertyKey);
    } else {
      // Standard decorator: target is the function itself
      Reflect.defineMetadata('ac_sql_event_callback', event, target);
    }
  };
}
