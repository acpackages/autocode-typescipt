import { AcResult } from "@autocode-ts/autocode";
import { AcSqlDbTable } from "../database/ac-sql-db-table";

/**
 * Represents the arguments passed to a SQL event handler method.
 */
export class AcSqlEventArgs {
  sqlDbTableInstance!: AcSqlDbTable;
  row?: Record<string, any>;
  rows?: Array<Record<string, any>>;
  rowsWithConditions?: Array<Record<string, any>>;
  parameters?: Record<string, any>;
  condition?: string;
  result?: AcResult;

  constructor({
    sqlDbTableInstance,
    row,
    rows,
    rowsWithConditions,
    parameters,
    condition,
    result,
  }: {
    sqlDbTableInstance: AcSqlDbTable;
    row?: Record<string, any>;
    rows?: Array<Record<string, any>>;
    rowsWithConditions?: Array<Record<string, any>>;
    parameters?: Record<string, any>;
    condition?: string;
    result?: AcResult;
  }) {
    this.sqlDbTableInstance = sqlDbTableInstance;
    if (row !== undefined) this.row = row;
    if (rows !== undefined) this.rows = rows;
    if (rowsWithConditions !== undefined) this.rowsWithConditions = rowsWithConditions;
    if (parameters !== undefined) this.parameters = parameters;
    if (condition !== undefined) this.condition = condition;
    if (result !== undefined) this.result = result;
  }
}
