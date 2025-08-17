/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcResult } from "@autocode-ts/autocode";
import { AcEnumDDRowOperation } from "@autocode-ts/ac-data-dictionary";

export class AcSqlDaoResult extends AcResult {
  static readonly KeyRows: string = 'rows';
  static readonly KeyAffectedRowsCount: string = 'affected_rows_count';
  static readonly KeyLastInsertedId: string = 'last_inserted_id';
  static readonly KeyOperation: string = 'operation';
  static readonly KeyPrimaryKeyColumn: string = 'primary_key_column';
  static readonly KeyPrimaryKeyValue: string = 'primary_key_value';
  static readonly KeyTotalRows: string = 'total_rows';

  rows: Array<Record<string, any>> = [];

  @AcBindJsonProperty({ key: AcSqlDaoResult.KeyAffectedRowsCount })
  affectedRowsCount?: number;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KeyLastInsertedId })
  lastInsertedId?: any;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KeyLastInsertedId })
  lastInsertedIds?: any;

  operation: string = AcEnumDDRowOperation.Unknown;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KeyPrimaryKeyColumn })
  primaryKeyColumn?: string;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KeyPrimaryKeyValue })
  primaryKeyValue?: any;

  @AcBindJsonProperty({ key: AcSqlDaoResult.KeyTotalRows })
  totalRows: number = 0;

  constructor({ operation = AcEnumDDRowOperation.Unknown }: { operation?: string } = {}) {
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
