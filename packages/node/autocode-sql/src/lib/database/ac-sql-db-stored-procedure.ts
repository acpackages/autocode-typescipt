/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataDictionary, AcDDStoredProcedure } from "@autocode-typescript/autocode-data-dictionary";
import { AcSqlDbBase } from "./ac-sql-db-base";

export class AcSqlDbStoredProcedure extends AcSqlDbBase {
  acDDStoredProcedure!: AcDDStoredProcedure;
  storedProcedureName: string = "";

  constructor({
    storedProcedureName,
    dataDictionaryName = "default",
  }: {
    storedProcedureName: string;
    dataDictionaryName?: string;
  }) {
    super({ dataDictionaryName: "default" });
    this.storedProcedureName = storedProcedureName;
    this.acDDStoredProcedure = AcDataDictionary.getStoredProcedure({
      storedProcedureName: storedProcedureName,
      dataDictionaryName: dataDictionaryName,
    })!;
  }
}
