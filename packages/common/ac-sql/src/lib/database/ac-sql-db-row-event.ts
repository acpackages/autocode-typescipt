/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcLogger, AcResult } from "@autocode-ts/autocode";
import { AcDataDictionary, AcDDTable } from "@autocode-ts/ac-data-dictionary";

import { AcSqlEventHandlersRegistry } from '../annotations/ac-sql-event-handler';

export class AcSqlDbRowEvent {
  logger!: AcLogger;
  tableName: string = '';
  dataDictionaryName: string = 'default';
  acDDTable!: AcDDTable;
  acDataDictionary!: AcDataDictionary;
  condition: string = '';
  eventType: string = '';
  row: any;
  result: any;
  parameters: { [key: string]: any } = {};
  abortOperation: boolean = false;

  constructor({
    tableName,
    dataDictionaryName = 'default',
  }: {
    tableName: string;
    dataDictionaryName?: string;
  }) {
    this.tableName = tableName;
    this.acDDTable = AcDataDictionary.getTable({
      tableName: tableName,
      dataDictionaryName: dataDictionaryName,
    })!;
    this.acDataDictionary = AcDataDictionary.getInstance();
  }

  async execute(): Promise<AcResult> {
    const result = new AcResult();
    const handlers = AcSqlEventHandlersRegistry[this.tableName] || [];

    for (const HandlerClass of handlers) {
      const handlerInstance = new HandlerClass();
      const prototype = Object.getPrototypeOf(handlerInstance);

      for (const propertyName of Object.getOwnPropertyNames(prototype)) {
        if (propertyName === 'constructor') continue;

        const methodEvent = Reflect.getMetadata('ac_sql_event_callback', prototype, propertyName);
        if (methodEvent === this.eventType) {
          const callbackResult = await handlerInstance[propertyName](this);
          if (callbackResult instanceof AcResult && callbackResult.isFailure()) {
            return callbackResult;
          }
        }
      }
    }

    result.setSuccess();
    return result;
  }
}

