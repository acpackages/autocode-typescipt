import { AcEnumLogType, AcLogger, AcResult } from '@ac_packages/autocode';
import { AcEnumRowOperation, AcEnumSelectMode, AcEnumTableFieldFormat } from '../enums/_enums';
import { AcSqlConnection } from '../models/ac-sql-connection.model';

export class AcBaseSqlDao {
  logger: AcLogger = new AcLogger({ logType: AcEnumLogType.html });
  sqlConnection: AcSqlConnection = new AcSqlConnection();

  async checkDatabaseExist(): Promise<AcResult> {
    const result = new AcResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async createDatabase(): Promise<AcResult> {
    const acResult = new AcResult();
    try {
      const result = new AcResult();
      return result;
    } catch (ex) {
      this.logger.log(`Error in createDatabase ${ex}`);
    }
    return acResult;
  }

  async checkTableExist({ table }: { table: string; }): Promise<AcResult> {
    const result = new AcResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async deleteRows({ table, condition = "", parameters = {} }: { table: string; condition?: string; parameters?: any; }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  formatRow({ row, formatColumns = {} }: { row: Record<string, any>, formatColumns: Record<string, AcEnumTableFieldFormat[]> }): Record<string, any> {
    return row;
  }

  async getConnectionObject(): Promise<any> {
    try {
    } catch (ex) {
      this.logger.log(`Error in getConnectionObject ${ex}`);
    }
  }

  async getDatabaseTables(): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
      // Logic to get database tables
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async getTableDefinition({ table }: { table: string; }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async insertRows({ table, values, primaryKeyColumn }: { table: string; values: Record<string, any>;primaryKeyColumn?:string; }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async selectStatement({ statement, mode = AcEnumSelectMode.list, condition = "", parameters = {}, formatColumns = {}, firstRowOnly = false }: { statement: string; condition?: string; mode?: AcEnumSelectMode; parameters?: Record<string, any>; formatColumns?: Record<string, string[]>; firstRowOnly?: boolean; }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
      // Logic for select statement
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async setSqlConnectionFromJson({ jsonData }: { jsonData: any; }): Promise<AcResult> {
    const result = new AcResult();
    try {
      this.sqlConnection.setValuesFromJson(jsonData);
      result.setSuccess({ value: true });
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  setSqlStatementParameters({ statement, parameters, values }: { statement: string; parameters: Record<string, any>; values: any[] }): { statement: string; parameters: Record<string, any>; values: any[] } {
    const keys = Object.keys(parameters);
    for (const key of keys) {
      let value = parameters[key];
      while (statement.indexOf(key) > 0) {
        const beforeQueryString = statement.substring(0, statement.indexOf(key));
        const parameterIndex = (beforeQueryString.match(/\?/g) || []).length;
        if (Array.isArray(value)) {
          statement = statement.replace(key, Array(value.length).fill('?').join(","));
          values.splice(parameterIndex, 0, ...value);
        } else {
          statement = statement.replace(key, "?");
          values.splice(parameterIndex, 0, value);
        }
      }
    }
    return { statement, parameters, values };
  }

  async sqlStatement({ statement, operation = AcEnumRowOperation.unknown, parameters = {} }: { statement: string; operation?: AcEnumRowOperation; parameters?: Record<string, any>; }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async sqlBatchStatement({ statements, parameters = [] }: { statements: string[]; parameters?: Record<string, any>; }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

  async updateRows({ table, values, condition = "", parameters = {} }: { table: string; values: Record<string, any>; condition?: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
    const result = new AcSqlDaoResult();
    try {
    } catch (ex) {
      result.setException(ex);
    }
    return result;
  }

}

export class AcSqlDaoResult extends AcResult {
  static readonly keyRows = 'rows';
  static readonly keyRow = 'row';
  static readonly keyAffectedRowsCount = 'affected_rows_count';
  static readonly keyLastInsertedId = 'last_inserted_id';

  rows: Array<any> = [];
  row: any = {};
  affectedRowsCount: number = 0;
  lastInsertedId: any = null;

  get hasAffectedRows(): boolean {
    return this.affectedRowsCount > 0;
  }

  get hasRow(): boolean {
    return Object.keys(this.row).length > 0;
  }

  get hasRows(): boolean {
    return this.rows.length > 0;
  }

  get rowsCount(): number {
    return this.rows.length;
  }

  toJson(): any {
    const result = super.toJson();
    result[AcSqlDaoResult.keyAffectedRowsCount] = this.affectedRowsCount;
    result[AcSqlDaoResult.keyLastInsertedId] = this.lastInsertedId;
    result[AcSqlDaoResult.keyRow] = this.row;
    result[AcSqlDaoResult.keyRows] = this.rows;
    return result;
  }
}
