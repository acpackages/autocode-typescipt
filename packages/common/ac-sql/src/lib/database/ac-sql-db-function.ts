/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataDictionary, AcDDFunction } from "@autocode-ts/ac-data-dictionary";
import { AcSqlDbBase } from "./ac-sql-db-base";

export class AcSqlDbFunction extends AcSqlDbBase {
  acDDFunction!: AcDDFunction;
  functionName: string = '';

  constructor({
    functionName,
    dataDictionaryName = 'default',
  }: {
    functionName: string;
    dataDictionaryName?: string;
  }) {
    super({ dataDictionaryName });
    this.functionName = functionName;
    this.acDDFunction = AcDataDictionary.getFunction({
      functionName,
      dataDictionaryName,
    })!;
  }
}
