/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcResult } from "@autocode-ts/autocode";
import { AcEnumDDRowOperation } from "@autocode-ts/ac-data-dictionary";

export class AcSqlDaoResult extends AcResult {
  static readonly KEY_ROWS: string = 'rows';
  static readonly KEY_AFFECTED_ROWS_COUNT: string = 'affected_rows_count';
  static readonly KEY_LAST_INSERTED_ID: string = 'last_inserted_id';
  static readonly KEY_OPERATION: string = 'operation';
  static readonly KEY_PRIMARY_KEY_COLUMN: string = 'primary_key_column';
  static readonly KEY_PRIMARY_KEY_VALUE: string = 'primary_key_value';
  static readonly KEY_TOTAL_ROWS: string = 'total_rows';

  rows: Array<Record<string, any>> = [];

  @AcBindJsonProperty({ key: AcSqlDaoResult.KEY_AFFECTED_ROWS_COUNT })
  affectedRowsCount?: number;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KEY_LAST_INSERTED_ID })
  lastInsertedId?: number;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KEY_LAST_INSERTED_ID })
  lastInsertedIds?: any;

  operation: string = AcEnumDDRowOperation.UNKNOWN;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KEY_PRIMARY_KEY_COLUMN })
  primaryKeyColumn?: string;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KEY_PRIMARY_KEY_VALUE })
  primaryKeyValue?: any;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KEY_TOTAL_ROWS })
  totalRows: number = 0;

  constructor({ operation = AcEnumDDRowOperation.UNKNOWN }: { operation?: string } = {}) {
    super();
    this.operation = operation;
  }

  hasAffectedRows(): boolean {
    return this.affectedRowsCount !== undefined && this.affectedRowsCount > 0;
  }

  hasRows(): boolean {
    return this.rows.length > 0;
  }

  rowsCount(): number {
    return this.rows.length;
  }
}
