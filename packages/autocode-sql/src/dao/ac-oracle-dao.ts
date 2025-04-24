import oracledb, { Connection } from 'oracledb';
import { AcBaseSqlDao, AcSqlDaoResult } from './ac-base-sql-dao';
import { AcResult } from '@ac_packages/autocode';
import { AcEnumRowOperation, AcEnumSelectMode } from '../enums/_enums';

export class AcOracleDao extends AcBaseSqlDao {
    private db: Connection | null = null;

    /**
     * Check if the Oracle database exists.
     * In Oracle, checking the existence of a schema instead of a database.
     */
    async checkDatabaseExist(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const db = await this.getConnectionObject();
            const query = `SELECT username FROM dba_users WHERE username = UPPER(:databaseName)`;
            const [rows]:any = await db!.execute(query, [this.sqlConnection.username]);
            if (rows.length > 0) {
                result.setSuccess({ value: true, message: 'Database schema exists' });
            } else {
                result.setSuccess({ value: false, message: 'Database schema does not exist' });
            }
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Oracle database creation typically requires a DBA and is not done directly from user-level code.
     */
    async createDatabase(): Promise<AcResult> {
        const result = new AcResult();
        result.setFailure({
            message: 'Oracle database creation is usually handled by a DBA and cannot be done through SQL directly.',
        });
        return result;
    }

    /**
     * Check if a table exists in the Oracle schema.
     */
    async checkTableExist({ table }: { table: string }): Promise<AcResult> {
        const result = new AcResult();
        try {
            const db = await this.getConnectionObject();
            const query = `SELECT table_name FROM user_tables WHERE table_name = UPPER(:tableName)`;
            const [rows]:any = await db!.execute(query, [table]);
            if (rows.length > 0) {
                result.setSuccess({ value: true, message: 'Table exists' });
            } else {
                result.setSuccess({ value: false, message: 'Table does not exist' });
            }
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Delete rows from a table with an optional condition.
     */
    async deleteRows({ table, condition = "", parameters = {} }: { table: string; condition?: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            const statement = `DELETE FROM ${table} ${condition ? `WHERE ${condition}` : ""}`;
            const queryResult = await db!.execute(statement, Object.values(parameters));
            result.affectedRowsCount = queryResult.rowsAffected!;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Get a connection object to Oracle DB.
     */
    async getConnectionObject(): Promise<Connection | null> {
        if (this.db) {
            return this.db;
        }
        try {
            this.db = await oracledb.getConnection({
                user: this.sqlConnection.username,
                password: this.sqlConnection.password,
                connectString: `${this.sqlConnection.hostname}:${this.sqlConnection.port}/${this.sqlConnection.database}`,
            });
        } catch (ex) {
            this.logger.log(`Database Connection Error: ${ex}`);
            this.db = null;
        }
        return this.db;
    }

    /**
     * Get list of tables from the Oracle schema.
     */
    async getDatabaseTables(): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            const query = `SELECT table_name FROM user_tables`;
            const [rows]:any = await db!.execute(query);
            result.rows = rows.map((row: any) => row.TABLE_NAME);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Get the definition of a table (columns and their types) using `ALL_TAB_COLUMNS`.
     */
    async getTableDefinition({ table }: { table: string }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            const query = `SELECT column_name, data_type FROM all_tab_columns WHERE table_name = UPPER(:table)`;
            const [rows]:any = await db!.execute(query, [table]);
            result.rows = rows;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Insert rows into a table. Values are passed as a map.
     */
    async insertRows({ table, values, primaryKeyColumn }: { table: string; values: Record<string, any>;primaryKeyColumn?:string; }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            const columns = Object.keys(values).join(", ");
            const placeholders = Object.keys(values).map((_, i) => `:param${i}`).join(", ");
            const statement = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
            const params = Object.values(values);
            await db!.execute(statement, params);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Execute a SELECT statement with optional parameters.
     */
    async selectStatement({ statement, parameters = {}, firstRowOnly = false }: { statement: string; parameters?: Record<string, any>; firstRowOnly?: boolean }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            const queryResult:any = await db!.execute(statement, Object.values(parameters));
            if (firstRowOnly && queryResult.rows.length > 0) {
                result.rows = [queryResult.rows[0]];
            } else {
                result.rows = queryResult.rows;
            }
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Execute an arbitrary SQL statement (INSERT, UPDATE, DELETE, etc.).
     */
    async sqlStatement({ statement, parameters = {} }: { statement: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            const queryResult = await db!.execute(statement, Object.values(parameters));
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Execute multiple SQL statements as a batch.
     */
    async sqlBatchStatement({ statements, parameters = {} }: { statements: string[]; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            for (const statement of statements) {
                await db!.execute(statement, Object.values(parameters));
            }
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Update rows in a table based on a condition.
     */
    async updateRows({ table, values, condition = "", parameters = {} }: { table: string; values: Record<string, any>; condition?: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            const setClause = Object.keys(values).map((key, i) => `${key} = :param${i}`).join(", ");
            const statement = `UPDATE ${table} SET ${setClause} ${condition ? `WHERE ${condition}` : ""}`;
            const params = Object.values(values).concat(Object.values(parameters));
            await db!.execute(statement, params);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }
}
