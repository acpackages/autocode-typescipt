import { AcResult } from "@autocode-ts/autocode";
import { AcSqlDbTable } from "../database/ac-sql-db-table";

export interface IAcSqlEventArgs {
  sqlDbTableInstance?: AcSqlDbTable;
  row?: Record<string, any>;
  rows?: Array<Record<string, any>>;
  rowsWithConditions?: Array<Record<string, any>>;
  parameters?: Record<string, any>;
  condition?: string;
  result?: AcResult;
}
