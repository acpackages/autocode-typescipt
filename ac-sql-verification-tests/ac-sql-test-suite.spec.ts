
import { AcSqliteDao } from './ac-sqlite-dao';
import { AcSqlDbTable, AcSqlDatabase, AcSqlConnection } from '@autocode-ts/ac-sql';
import { AcDataDictionary, AcDDTable, AcDDTableColumn, AcEnumDDColumnType, AcEnumSqlDatabaseType } from '@autocode-ts/ac-data-dictionary';
import fs from 'fs';
import path from 'path';

describe('AcSql thoroughly testing', () => {
  const dbPath = path.join(__dirname, 'test.sqlite');
  let dao: AcSqliteDao;
  let sqlTable: AcSqlDbTable;

  beforeAll(async () => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
    
    // 1. Setup Connection
    const connection = new AcSqlConnection();
    connection.database = dbPath;
    
    AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.Sqlite;
    AcSqlDatabase.sqlConnection = connection;

    dao = new AcSqliteDao();
    dao.setSqlConnection({ sqlConnection: connection });

    // 2. Setup Data Dictionary
    const dd = AcDataDictionary.getInstance({ dataDictionaryName: 'default' });
    const table = new AcDDTable({ tableName: 'users' });
    table.tableColumns.push(new AcDDTableColumn({ columnName: 'id', columnType: AcEnumDDColumnType.Integer, isPrimaryKey: true, isAutoIncrement: true }));
    table.tableColumns.push(new AcDDTableColumn({ columnName: 'username', columnType: AcEnumDDColumnType.String, size: 50, isNotNull: true, isUniqueKey: true }));
    table.tableColumns.push(new AcDDTableColumn({ columnName: 'email', columnType: AcEnumDDColumnType.String, size: 100 }));
    table.tableColumns.push(new AcDDTableColumn({ columnName: 'metadata', columnType: AcEnumDDColumnType.Json }));
    table.tableColumns.push(new AcDDTableColumn({ columnName: 'created_at', columnType: AcEnumDDColumnType.Timestamp }));
    
    dd.tables.push(table);

    // 3. Create Table in Database
    await dao.createDatabase();
    const createTableSql = `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      email TEXT,
      metadata TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
    await dao.executeStatement({ statement: createTableSql });
    
    sqlTable = new AcSqlDbTable({ tableName: 'users' });
    sqlTable.dao = dao; // Manually assign since AC_DB_TYPE_DAO_MAP might be empty
  });

  afterAll(() => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  describe('AcSqliteDao', () => {
    it('T-SQ-01: should check if database exists', async () => {
      const result = await dao.checkDatabaseExist();
      expect(result.isSuccess()).toBe(true);
      expect(result.value).toBe(true);
    });

    it('T-SQ-03: should insert a row and return lastInsertedId', async () => {
      const result = await dao.insertRow({
        tableName: 'users',
        row: { username: 'testuser', email: 'test@example.com', metadata: JSON.stringify({ role: 'admin' }) }
      });
      expect(result.isSuccess()).toBe(true);
      expect(result.lastInsertedId).toBe(1);
    });

    it('T-SQ-04: should update a row', async () => {
      const result = await dao.updateRow({
        tableName: 'users',
        row: { email: 'updated@example.com' },
        condition: 'username = ?',
        parameters: { username: 'testuser' }
      });
      expect(result.isSuccess()).toBe(true);
      expect(result.affectedRowsCount).toBe(1);
    });

    it('T-SQ-05: should get table columns via PRAGMA', async () => {
      const result = await dao.getTableColumns({ tableName: 'users' });
      expect(result.isSuccess()).toBe(true);
      const usernameCol = result.rows.find(r => r.column_name === 'username');
      expect(usernameCol).toBeDefined();
      expect(usernameCol!.column_properties.not_null).toBe(true);
    });
  });

  describe('AcSqlDbTable', () => {
    it('T-TAB-05/07: should format values (JSON and Strings) before insert', async () => {
      const row = { username: 'NEWUSER', metadata: { foo: 'bar' } };
      // Note: formatValues might need data dictionary setup to work correctly
      const formatResult = await sqlTable.formatValues({ row, insertMode: true });
      expect(formatResult.isSuccess()).toBe(true);
      expect(typeof formatResult.value.metadata).toBe('string');
      // If we had UPPERCASE format on username, it would change. For now we just check JSON.
    });

    it('T-TAB-12: should detect unique key violation', async () => {
      // First ensure testuser exists (already inserted in DAO tests)
      const row = { username: 'testuser', email: 'duplicate@example.com' };
      const uniqueResult = await sqlTable.checkUniqueValues({ row });
      expect(uniqueResult.isFailure()).toBe(true);
      expect(uniqueResult.message).toContain('Unique key violated');
    });

    it('T-TAB-09: should insert row with high-level insertRow method', async () => {
      const row = { username: 'highlevel', email: 'hl@example.com', metadata: { a: 1 } };
      const result = await sqlTable.insertRow({ row });
      expect(result.isSuccess()).toBe(true);
      expect(result.lastInsertedId).toBeGreaterThan(1);
    });

    it('T-TAB-11: should fail validation if required field is missing', async () => {
        // We need to implement validateValues or check its implementation
        // For now, let's assume it checks not_null columns from DD
        const row = { email: 'missing-username@example.com' };
        const validateResult = await sqlTable.validateValues({ row, isInsert: true });
        expect(validateResult.isFailure()).toBe(true);
        expect(validateResult.message).toContain('is required');
    });

    it('T-TAB-12: should successfully delete rows', async () => {
        const result = await sqlTable.deleteRows({ condition: 'username = :username', parameters: { ':username': 'highlevel' } });
        expect(result.isSuccess()).toBe(true);
        expect(result.affectedRowsCount).toBe(1);
    });
  });
});
