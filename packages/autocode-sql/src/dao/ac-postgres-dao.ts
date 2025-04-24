import { Pool } from 'pg';
import { AcBaseSqlDao, AcSqlDaoResult } from './ac-base-sql-dao';
import { AcResult } from '@ac_packages/autocode';

export class AcPostgresDao extends AcBaseSqlDao {
    private pool: Pool | null = null;

    /**
     * Get a connection object to PostgreSQL.
     */
    async getConnectionObject(): Promise<Pool | null> {
        if (!this.pool) {
            this.pool = new Pool({
                user: this.sqlConnection.username,
                password: this.sqlConnection.password,
                host: this.sqlConnection.hostname,
                port: this.sqlConnection.port,
                database: this.sqlConnection.database,
            });
        }
        return this.pool;
    }

    /**
     * Check if the PostgreSQL database exists.
     */
    async checkDatabaseExist(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const pool = await this.getConnectionObject();
            const query = `SELECT 1 FROM pg_database WHERE datname = $1`;
            const { rows } = await pool!.query(query, [this.sqlConnection.database]);
            if (rows.length > 0) {
                result.setSuccess({ value: true, message: 'Database exists' });
            } else {
                result.setSuccess({ value: false, message: 'Database does not exist' });
            }
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Create a new PostgreSQL database.
     */
    async createDatabase(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const pool = await this.getConnectionObject();
            const query = `CREATE DATABASE "${this.sqlConnection.database}"`;
            await pool!.query(query);
            result.setSuccess({ value: true, message: 'Database created successfully' });
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Check if a table exists in the PostgreSQL database.
     */
    async checkTableExist({ table }: { table: string }): Promise<AcResult> {
        const result = new AcResult();
        try {
            const pool = await this.getConnectionObject();
            const query = `SELECT to_regclass($1) AS table_name`;
            const { rows } = await pool!.query(query, [table]);
            if (rows[0].table_name) {
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
     * Delete rows from a table based on a condition.
     */
    async deleteRows({ table, condition = "", parameters = {} }: { table: string; condition?: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const pool = await this.getConnectionObject();
            const statement = `DELETE FROM ${table} ${condition ? `WHERE ${condition}` : ''}`;
            const queryResult = await pool!.query(statement, Object.values(parameters));
            result.affectedRowsCount = queryResult.rowCount!;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Get the list of tables in the PostgreSQL database.
     */
    async getDatabaseTables(): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const pool = await this.getConnectionObject();
            const query = `SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
            const { rows } = await pool!.query(query);
            result.rows = rows.map((row: { table_name: any; }) => row.table_name);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Get the definition of a table (columns and their types).
     */
    async getTableDefinition({ table }: { table: string }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const pool = await this.getConnectionObject();
            const query = `SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1`;
            const { rows } = await pool!.query(query, [table]);
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
            const pool = await this.getConnectionObject();
            const columns = Object.keys(values).join(', ');
            const placeholders = Object.keys(values).map((_, index) => `$${index + 1}`).join(', ');
            const statement = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
            const queryResult = await pool!.query(statement, Object.values(values));
            result.affectedRowsCount = queryResult.rowCount!;
            result.lastInsertedId = queryResult.rows[0]?.id || null; // Assuming the table has an 'id' field
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
            const pool = await this.getConnectionObject();
            const queryResult = await pool!.query(statement, Object.values(parameters));
            result.rows = firstRowOnly && queryResult.rows.length > 0 ? [queryResult.rows[0]] : queryResult.rows;
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
            const pool = await this.getConnectionObject();
            const queryResult = await pool!.query(statement, Object.values(parameters));
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
            const pool = await this.getConnectionObject();
            for (const statement of statements) {
                await pool!.query(statement, Object.values(parameters));
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
            const pool = await this.getConnectionObject();
            const setClause = Object.keys(values).map((key, index) => `${key} = $${index + 1}`).join(", ");
            const statement = `UPDATE ${table} SET ${setClause} ${condition ? `WHERE ${condition}` : ""}`;
            const params = [...Object.values(values), ...Object.values(parameters)];
            const queryResult = await pool!.query(statement, params);
            result.affectedRowsCount = queryResult.rowCount!;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }
}
