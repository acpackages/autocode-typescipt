/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataDictionary, AcDDTrigger } from "@autocode-typescript/autocode-data-dictionary";
import { AcSqlDbBase } from "./ac-sql-db-base";

export class AcSqlDbTrigger extends AcSqlDbBase {
  acDDTrigger!: AcDDTrigger;
  triggerName: string = '';

  constructor({
    triggerName,
    dataDictionaryName = 'default',
  }: {
    triggerName: string;
    dataDictionaryName?: string;
  }) {
    super({ dataDictionaryName });

    this.triggerName = triggerName;

    this.acDDTrigger = AcDataDictionary.getTrigger({
      triggerName: triggerName,
      dataDictionaryName: dataDictionaryName,
    })!;
  }
}
