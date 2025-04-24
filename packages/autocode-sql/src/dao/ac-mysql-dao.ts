import mysql, { Pool, PoolConnection } from 'mysql2/promise';
import { AcBaseSqlDao, AcSqlDaoResult } from './ac-base-sql-dao';
import { AcResult } from '@ac_packages/autocode';
import { AcEnumRowOperation, AcEnumSelectMode } from '../enums/_enums';

export class AcMysqlDao extends AcBaseSqlDao {
    private pool: Pool | null = null; // Keep track of the connection pool

    async checkDatabaseExist(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const query = `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = ?`;
            let pool = mysql.createPool({
                host: this.sqlConnection.hostname,
                user: this.sqlConnection.username,
                password: this.sqlConnection.password,
                port: this.sqlConnection.port,
                connectionLimit: 10,
            });
            const db = await pool.getConnection();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const [rows] = await db.execute(query, [this.sqlConnection.database]);
            if ((rows as any[]).length > 0) {
                result.setSuccess({ value: true, message: "Database exists" });
            } else {
                result.setSuccess({ value: false, message: "Database does not exist" });
            }
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async checkTableExist({ table }: { table: string }): Promise<AcResult> {
        const result = new AcResult();
        let connection: PoolConnection | null = null;
        try {
            const query = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?`;
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.error('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const [rows] = await connection.execute(query, [table, this.sqlConnection.database]);
            if ((rows as any[]).length > 0) {
                result.setSuccess({ value: true, message: "Table exists" });
            } else {
                result.setSuccess({ value: false, message: "Table does not exist" });
            }
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async createDatabase(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const statement = `CREATE DATABASE IF NOT EXISTS \`${this.sqlConnection.database}\``;
            let pool = mysql.createPool({
                host: this.sqlConnection.hostname,
                user: this.sqlConnection.username,
                password: this.sqlConnection.password,
                port: this.sqlConnection.port,
                connectionLimit: 10,
            });
            let connection = await pool.getConnection();
            await connection.execute(statement);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async deleteRows({ table, condition = "", parameters = {} }: { table: string; condition?: string; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            let statement = `DELETE FROM \`${table}\` ${condition ? `WHERE ${condition}` : ""}`;
            let parameterValues:any[] = [];
            let parameterResponse = this.setSqlStatementParameters({statement:statement,parameters:parameters,values:parameterValues});
            statement = parameterResponse.statement;
            parameterValues = parameterResponse.values;
            const [queryResult]: any = await connection.execute(statement, parameterValues);
            result.affectedRowsCount = queryResult.affectedRows;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async getConnectionObject(): Promise<PoolConnection | null> {
        try {
            if (!this.pool) {
                this.pool = mysql.createPool({
                    host: this.sqlConnection.hostname,
                    user: this.sqlConnection.username,
                    password: this.sqlConnection.password,
                    database: this.sqlConnection.database,
                    port: this.sqlConnection.port,
                    connectionLimit: 10,
                });
            }
            return await this.pool.getConnection();
        } catch (ex) {
            this.logger.log(`Database Connection Error: ${ex}`);
            return null;
        }
    }

    async getDatabaseTables(): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            const query = `SELECT TABLE_NAME as table_name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA = ?`;
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.error('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const [rows] = await connection.execute(query, [this.sqlConnection.database]);
            result.rows = rows as any[];
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async getTableDefinition({ table }: { table: string }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const statement = `SELECT COLUMN_NAME as column_name, DATA_TYPE as column_type FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?`;
            const [rows] = await connection.execute(statement, [table, this.sqlConnection.database]);
            result.rows = rows as any[];
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async insertRows({ table, values, primaryKeyColumn }: { table: string; values: Record<string, any>;primaryKeyColumn?:string; }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }

            const columns = Object.keys(values).map(key => `\`${key}\``).join(", ");
            const placeholders = Object.keys(values).map(() => "?").join(", ");
            const statement = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;
            const [queryResult]: any = await connection.execute(statement, Object.values(values));
            result.affectedRowsCount = queryResult.affectedRows;
            result.lastInsertedId = queryResult.insertId || null;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async selectStatement({ statement, mode = AcEnumSelectMode.list, condition = "", parameters = {}, formatColumns = {}, firstRowOnly = false }: { statement: string; condition?: string; mode?: AcEnumSelectMode; parameters?: Record<string, any>; formatColumns?: Record<string, string[]>; firstRowOnly?: boolean; }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.error('Database Connection Error');
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
            this.logger.log(`Executing SELECT Statement: ${statement}`);
            const [rows] = await connection.execute(statement, parameterValues);
            result.rows = rows as any[];
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async sqlStatement({ statement, operation = AcEnumRowOperation.unknown, parameters = {} }: 
        { statement: string; operation?: AcEnumRowOperation; parameters?: Record<string, any>; }): 
        Promise<AcSqlDaoResult> {
        
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            let parameterValues:any[] = [];
            let parameterResponse = this.setSqlStatementParameters({statement:statement,parameters:parameters,values:parameterValues});
            statement = parameterResponse.statement;
            parameterValues = parameterResponse.values;
            this.logger.log(`Executing Statement: ${statement}`);
            await connection.execute(statement, parameterValues);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async sqlBatchStatement({ statements, parameters = {} }: { statements: string[]; parameters?: Record<string, any> }): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            let statement = statements.join("; ");
            let parameterValues:any[] = [];
            let parameterResponse = this.setSqlStatementParameters({statement:statement,parameters:parameters,values:parameterValues});
            statement = parameterResponse.statement;
            parameterValues = parameterResponse.values;
            this.logger.log(`Executing Statement: ${statement}`);
            await connection.execute(statement, parameterValues);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }

    async updateRows({ table, values, condition = "", parameters = {} }: 
        { table: string; values: Record<string, any>; condition?: string; parameters?: Record<string, any>; }): 
        Promise<AcSqlDaoResult> {        
        const result = new AcSqlDaoResult();
        let connection: PoolConnection | null = null;
        try {
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.log('Database Connection Error');
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
            const [queryResult]: any = await connection.execute(statement, parameterValues);
            result.affectedRowsCount = queryResult.affectedRows;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) await connection.release();
        }
        return result;
    }
}
