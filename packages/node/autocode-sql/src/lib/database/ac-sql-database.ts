/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumSqlDatabaseType } from "@autocode-typescript/autocode";
import { AcSqlConnection } from "../models/ac-sql-connection.model";

export class AcSqlDatabase {
  static dataDictionaryName: string = "default";
  static databaseType: AcEnumSqlDatabaseType = AcEnumSqlDatabaseType.UNKNOWN;
  static sqlConnection: AcSqlConnection | null = null;
}
