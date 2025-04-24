import { ConnectionPool, Request }  from 'mssql';
import { AcBaseSqlDao, AcSqlDaoResult } from './ac-base-sql-dao';
import { AcResult } from '@ac_packages/autocode';
import { AcEnumRowOperation, AcEnumSelectMode } from '../enums/_enums';

export class AcMssqlDao extends AcBaseSqlDao {
    private pool: ConnectionPool | null = null; // Keep track of the connection pool

    async checkDatabaseExist(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const query = `SELECT database_id FROM sys.databases WHERE name = @databaseName`;
            const db = await new ConnectionPool({
                user: this.sqlConnection.username,
                password: this.sqlConnection.password,
                server: this.sqlConnection.hostname,
                port: this.sqlConnection.port,
                options: this.sqlConnection.options
            }).connect();
            if (!db) {
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const request = new Request(db);
            request.input('databaseName', this.sqlConnection.database);
            const response = await request.query(query);
            if (response.recordset.length > 0) {
                result.setSuccess({ value: true, message: "Database exist" });
            } else {
                result.setSuccess({ value: false, message: "Database does not exist" });
            }
            await db.close();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async checkTableExist({ table }: { table: string; }): Promise<AcResult> {
        const result = new AcResult();
        let connection:any;
        try {
            const query = `SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @tableName`;
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.error('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const request = new Request(connection);
            request.input('tableName', table);
            const response = await request.query(query);
            if (response.recordset.length > 0) {
                result.setSuccess({ value: true, message: "Table exists" });
            } else {
                result.setSuccess({ value: false, message: "Table does not exist" });
            }
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) {
                await connection.close();
            }
        }
        return result;
    }

    async createDatabase(): Promise<AcResult> {
        const result = new AcResult();
        try {
            const query = `IF NOT EXISTS (SELECT * FROM sys.databases WHERE name = '${this.sqlConnection.database}') CREATE DATABASE [${this.sqlConnection.database}]`;
            const db = await new ConnectionPool({
                user: this.sqlConnection.username,
                password: this.sqlConnection.password,
                server: this.sqlConnection.hostname,
                port: this.sqlConnection.port,
                options: this.sqlConnection.options
            }).connect();
            const request = db.request();
            await request.query(query);
            result.setSuccess({ value: true });
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async deleteRows({table, condition = "", parameters = {}}: {table: string; condition?: string; parameters?: Record<string, any>}): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let pool: ConnectionPool | null = null;
        try {
            pool = await this.getConnectionObject();
            if (!pool) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }    
            const statement = `DELETE FROM ${table} ${condition ? `WHERE ${condition}` : ""}`;
            const request = pool.request();
            for (const key of Object.keys(parameters)) {
                request.input(key, parameters[key]);
            }    
            const queryResult = await request.query(statement);
            result.affectedRowsCount = queryResult.rowsAffected[0];
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (pool) await pool.close();
        }
        return result;
    }    

    async getConnectionObject(): Promise<ConnectionPool | null> {
        try {
            this.pool = await new ConnectionPool({
                user: this.sqlConnection.username,
                password: this.sqlConnection.password,
                server: this.sqlConnection.hostname,
                port: this.sqlConnection.port,
                database: this.sqlConnection.database,
                options: this.sqlConnection.options
            }).connect();
        } catch (ex) {
            this.logger.log(`Database Connection Error: ${ex}`);
            this.pool = null; 
        }
        return this.pool;
    }

    async getDatabaseTables(): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let connection:any;
        try {
            const query = `SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'`;
            connection = await this.getConnectionObject();
            if (!connection) {
                this.logger.error('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const request = new Request(connection);
            const response = await request.query(query);
            result.rows = response.recordset.map(record => record.TABLE_NAME);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) {
                await connection.close();
            }
        }
        return result;
    }

    async getTableDefinition({table}: {table: string}): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let pool: ConnectionPool | null = null;
        try {
            pool = await this.getConnectionObject();
            if (!pool) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
    
            const statement = `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = @table`;
            const request = pool.request();
            request.input('table', table);
    
            const queryResult = await request.query(statement);
            result.rows = queryResult.recordset;
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (pool) await pool.close();
        }
        return result;
    }

    async insertRows({table, values, primaryKeyColumn = ""}: {table: string; values: Record<string, any>;primaryKeyColumn?:string;}): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let pool: ConnectionPool | null = null;
        try {
            pool = await this.getConnectionObject();
            if (!pool) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const columns = Object.keys(values).join(", ");
            const placeholders = Object.keys(values).map((_, index) => `@param${index}`).join(", ");
            let statement = `INSERT INTO ${table} (${columns})`;
            if(primaryKeyColumn != ""){
                statement+=` OUTPUT INSERTED.${primaryKeyColumn} AS lastInsertedId`;
            }
            statement+= ` VALUES (${placeholders});`;    
            if(primaryKeyColumn == ""){
                statement+=`SELECT SCOPE_IDENTITY() AS lastInsertedId`;
            }
            const request = pool.request();
            Object.values(values).forEach((value, index) => {
                request.input(`param${index}`, value);
            });
            const queryResult = await request.query(statement);
            result.affectedRowsCount = queryResult.rowsAffected[0];
            result.lastInsertedId = queryResult.recordset?.[0]?.lastInsertedId || null; // Assuming the table has an 'id' field
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (pool) await pool.close();
        }
        return result;
    }

    async selectStatement({statement,mode = AcEnumSelectMode.list,condition="",parameters = {},formatColumns = {},firstRowOnly = false}: {statement: string;condition?:string;mode?: AcEnumSelectMode;parameters?: Record<string,any>;formatColumns?: Record<string, string[]>;    firstRowOnly?: boolean;}): Promise<AcSqlDaoResult>{
        const result = new AcSqlDaoResult();
        let connection: ConnectionPool | null = null;
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
            this.logger.log(`Executing SELECT Statement : ${statement}`);
            const request = connection.request();
            for (const key of Object.keys(parameters)) {
                this.logger.log(`Adding parameter : ${key}`);
                console.log(`Adding parameter : ${key}`);
                request.input(key, parameters[key]);
            }           
            const queryResult = await request.query(statement);
            this.logger.log(`Query Executed`);
            for(let record of queryResult.recordset){
                result.rows.push(record);
            }
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (connection) {
                await connection.close(); // Ensure the pool is closed after execution
            }
        }

        return result;
    }

    async sqlStatement({statement,operation = AcEnumRowOperation.unknown,parameters = {}}:{statement: string;operation?:AcEnumRowOperation;parameters?: Record<string,any>;}): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let pool: ConnectionPool | null = null;
        try {
            pool = await this.getConnectionObject();
            if (!pool) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            this.logger.log(`Executing Statement: ${statement}`);
            const request = pool.request();
            for (const key of Object.keys(parameters)) {
                request.input(key, parameters[key]);
            }
            await request.query(statement);
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async sqlBatchStatement({statements,parameters = {}}: {statements: string[];parameters?: Record<string,any>;}): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        try {
            const pool = await this.getConnectionObject();
            if (!pool) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }
            const request = pool.request();
            for (const key of Object.keys(parameters)) {
                request.input(key, parameters[key]);
            }
            await request.batch(statements.join(";"));
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        }
        return result;
    }

    async updateRows({table, values, condition = "", parameters = {}}: {table: string; values: Record<string, any>; condition?: string; parameters?: Record<string, any>}): Promise<AcSqlDaoResult> {
        const result = new AcSqlDaoResult();
        let pool: ConnectionPool | null = null;
        try {
            pool = await this.getConnectionObject();
            if (!pool) {
                this.logger.log('Database Connection Error');
                result.setFailure({ message: 'Database connection error' });
                return result;
            }    
            const setClause = Object.keys(values).map((key, index) => `${key} = @param${index}`).join(", ");
            const statement = `UPDATE ${table} SET ${setClause} ${condition ? `WHERE ${condition}` : ""}`;    
            const request = pool.request();
            Object.values(values).forEach((value, index) => {
                request.input(`param${index}`, value);
            });
            for (const key of Object.keys(parameters)) {
                request.input(key, parameters[key]);
            }
    
            const queryResult = await request.query(statement);
            result.affectedRowsCount = queryResult.rowsAffected[0];
            result.setSuccess();
        } catch (ex) {
            result.setException(ex);
        } finally {
            if (pool) await pool.close();
        }
        return result;
    }
    
}
