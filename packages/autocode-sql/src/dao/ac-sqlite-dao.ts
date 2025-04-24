import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { AcBaseSqlDao, AcSqlDaoResult } from './ac-base-sql-dao';
import { AcResult } from '@ac_packages/autocode';
import { AcEnumSelectMode } from '../enums/_enums';
import { promises as fs } from 'fs';

export class AcSqliteDao extends AcBaseSqlDao {
    private db: Database | null = null;

    async checkDatabaseExist(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const dbFilePath = this.sqlConnection.database;
            try {
                this.logger.log(`Checking database exist for path ${dbFilePath}`);
                await fs.access(dbFilePath);
                this.logger.log(`Found database`);
                result.setSuccess({ value: true, message: 'Database file exists' });
            } catch {
                this.logger.log(`Did not find database`);
                result.setSuccess({ value: false, message: 'Database file does not exist' });
            }
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async createDatabase(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const dbFilePath = this.sqlConnection.database;
            this.logger.log(`Creating database at path ${dbFilePath}`);
            this.db = await open({
                filename: dbFilePath,
                driver: sqlite3.Database,
            });
            this.logger.log(`Database created (if it did not exist)`);
            result.setSuccess({ value: true, message: 'Database created (if it did not exist)' });
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async checkTableExist({ table }: { table: string }): Promise<AcResult> {
        const result = new AcResult();
        try {
            const query = `SELECT name FROM sqlite_master WHERE type='table' AND name = ?`;
            this.logger.log(`Checking table ${table} exist`);
            const db = await this.getConnectionObject();
            if (!db) {
                this.logger.error(`Error connecting database`);
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            this.logger.log(`Executing query : `,query);
            const row = await db.get(query, [table]);
            if (row) {
                this.logger.log(`Found table ${table}`);
                result.setSuccess({ value: true, message: "Table exists" });
            } else {
                this.logger.log(`Did not find table ${table}`);
                result.setSuccess({ value: false, message: "Table does not exist" });
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
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            let statement = `DELETE FROM ${table} ${condition ? `WHERE ${condition}` : ""}`;
            let parameterValues:any[] = [];
            let parameterResponse = this.setSqlStatementParameters({statement:statement,parameters:parameters,values:parameterValues});
            statement = parameterResponse.statement;
            parameterValues = parameterResponse.values;
            const queryResult = await db.run(statement, parameterValues);
            result.affectedRowsCount = queryResult.changes || 0;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Get the connection object (opens the database).
     */
    async getConnectionObject(): Promise<Database | null> {
        try {
            if (!this.db) {
                this.db = await open({
                    filename: this.sqlConnection.database,
                    driver: sqlite3.Database,
                });
            }
            return this.db;
        } catch (ex) {
            this.logger.log(`Database Connection Error: ${ex}`);
            return null;
        }
    }

    /**
     * Get a list of all tables in the database.
     */
    async getDatabaseTables(): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const query = `SELECT name as table_name FROM sqlite_master WHERE type='table'`;
            const rows:any[] = await db.all(query);
            result.rows = rows;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Get table definition (columns and their types).
     */
    async getTableDefinition({ table }: { table: string }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const query = `PRAGMA table_info(${table})`;
            const rows:any[] = await db.all(query);
            result.rows = rows.map(row => ({
                column_name: row.name,
                column_type : row.type,
                column_properties : {
                    default_value : row.dflt_value,
                    is_primary_key : row.pk == 1,
                    not_null : row.notnull == 1,
                }
            }));
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Insert rows into a table.
     */
    async insertRows({ table, values, primaryKeyColumn }: { table: string; values: Record<string, any>; primaryKeyColumn?:string; }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }

            const columns = Object.keys(values).join(", ");
            const placeholders = Object.keys(values).map(() => "?").join(", ");
            const statement = `INSERT INTO ${table} (${columns}) VALUES (${placeholders})`;
            const queryResult = await db.run(statement, Object.values(values));
            result.affectedRowsCount = queryResult.changes || 0;
            result.lastInsertedId = queryResult.lastID || null;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async selectStatement({ statement, mode = AcEnumSelectMode.list, condition = "", parameters = {}, formatColumns = {}, firstRowOnly = false }: { statement: string; condition?: string; mode?: AcEnumSelectMode; parameters?: Record<string, any>; formatColumns?: Record<string, string[]>; firstRowOnly?: boolean; }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            if(condition!=""){
                statement+=` WHERE ${condition}`;
            }
            let parameterValues:any[] = [];
            let parameterResponse = this.setSqlStatementParameters({statement:statement,parameters:parameters,values:parameterValues});
            statement = parameterResponse.statement;
            parameterValues = parameterResponse.values;
            const queryResult = await db.all(statement,parameterValues);
            result.rows = queryResult;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Execute an SQL statement (for UPDATE, DELETE, etc.).
     */
    async sqlStatement({ statement, parameters = {} }: { statement: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            let parameterValues:any[] = [];
            let parameterResponse = this.setSqlStatementParameters({statement:statement,parameters:parameters,values:parameterValues});
            statement = parameterResponse.statement;
            parameterValues = parameterResponse.values;
            await db.run(statement, parameterValues);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Execute batch SQL statements.
     */
    async sqlBatchStatement({ statements, parameters = {} }: { statements: string[]; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const batch = statements.join("; ");
            await db.exec(batch);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    /**
     * Update rows in a table.
     */
    async updateRows({ table, values, condition = "", parameters = {} }: { table: string; values: Record<string, any>; condition?: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const db = await this.getConnectionObject();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            let fields:string[] = [];
            let parameterValues:any[] = [];
            for(let key of Object.keys(values)){
                fields.push(`${key} = ?`);
                parameterValues.push(values[key]);
            }
            let statement = `UPDATE \`${table}\` SET ${fields.join(",")} ${condition ? `WHERE ${condition}` : ""}`;
            let parameterResponse = this.setSqlStatementParameters({statement:statement,parameters:parameters,values:parameterValues});
            statement = parameterResponse.statement;
            parameterValues = parameterResponse.values;
            this.logger.log(`Executing Statement: ${statement}`);
            const queryResult = await db.run(statement, parameterValues);
            result.affectedRowsCount = queryResult.changes || 0;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }
}
