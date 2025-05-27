/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDataDictionary, AcDDTable, AcDDTableColumn } from "@autocode-typescript/autocode-data-dictionary";
import { AcSqlDbBase } from "./ac-sql-db-base";

export class AcSqlDbTableColumn extends AcSqlDbBase {
  columnName!: string;
  tableName!: string;
  acDDTable!: AcDDTable;
  acDDTableColumn!: AcDDTableColumn;

  constructor({
    tableName,
    columnName,
    dataDictionaryName = "default",
  }: {
    tableName: string;
    columnName: string;
    dataDictionaryName?: string;
  }) {
    super({ dataDictionaryName });

    this.tableName = tableName;
    this.columnName = columnName;

    this.acDDTable = AcDataDictionary.getTable({
      tableName,
      dataDictionaryName,
    })!;

    this.acDDTableColumn = AcDataDictionary.getTableColumn({
      tableName,
      columnName,
      dataDictionaryName,
    })!;
  }
}
