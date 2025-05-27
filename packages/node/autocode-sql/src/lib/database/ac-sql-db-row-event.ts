/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcLogger, AcResult } from "@autocode-typescript/autocode";
import { AcDataDictionary, AcDDTable } from "@autocode-typescript/autocode-data-dictionary";

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
    result.setSuccess();
    return result;
  }
}
