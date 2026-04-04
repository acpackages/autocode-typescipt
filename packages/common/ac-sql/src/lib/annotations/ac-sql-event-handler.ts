import 'reflect-metadata';

export const AcSqlEventHandlersRegistry: Record<string, any[]> = {};

export function AcSqlEventHandler({ tableName }: { tableName: string }) {
  return function (target: any) {
    if (!AcSqlEventHandlersRegistry[tableName]) {
      AcSqlEventHandlersRegistry[tableName] = [];
    }
    AcSqlEventHandlersRegistry[tableName].push(target);
  };
}

export function AcSqlEventCallback({ event }: { event: string }) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    Reflect.defineMetadata('ac_sql_event_callback', event, target, propertyKey);
  };
}
