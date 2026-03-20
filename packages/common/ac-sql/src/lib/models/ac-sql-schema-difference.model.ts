/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcJsonUtils } from "@autocode-ts/autocode";

export class AcSqlSchemaDifference {
  missingTablesInDatabase: string[] = [];
  missingTablesInDataDictionary: string[] = [];
  modifiedTables: AcSqlSchemaTableDifference[] = [];

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return JSON.stringify(this.toJson(), null, 2);
  }
}

export class AcSqlSchemaTableDifference {
  tableName: string = '';
  missingColumnsInDatabase: string[] = [];
  missingColumnsInDataDictionary: string[] = [];

  constructor({ tableName }: { tableName?: string } = {}) {
    if (tableName !== undefined) {
      this.tableName = tableName;
    }
  }
}
