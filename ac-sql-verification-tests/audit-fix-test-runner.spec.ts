
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { AcSqliteDao } from '@autocode-ts/ac-sql-node';
import { AcSqlDbTable, AcSqlDatabase, AcSqlConnection } from '@autocode-ts/ac-sql';
import { AcDataDictionary, AcDDTable, AcDDTableColumn, AcEnumDDColumnType, AcEnumDDRowEvent } from '@autocode-ts/ac-data-dictionary';
import { AcEnumSqlDatabaseType } from '@autocode-ts/autocode';
import { AcSqlEventHandlersRegistry, AcSqlEventCallback, AcSqlEventHandler } from '@autocode-ts/ac-sql';
import fs from 'fs';
import path from 'path';

// Define a Custom Event Handler that fails on AfterInsert
@AcSqlEventHandler({ tableName: 'safety_test' })
class FailureEventHandler {
  @AcSqlEventCallback({ event: AcEnumDDRowEvent.AfterInsert })
  async afterInsert(args: any) {
    args.result.setFailure({ message: 'STIMULATED_EVENT_FAILURE' });
  }
}

describe('Audit Fixes Verification', () => {
  const dbPath = path.join(__dirname, 'audit_test_final.sqlite');
  let dao: AcSqliteDao;
  let sqlTable: AcSqlDbTable;
  const results: any[] = [];

  beforeAll(async () => {
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

    const connection = new AcSqlConnection();
    connection.database = dbPath;
    AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.Sqlite;
    AcSqlDatabase.sqlConnection = connection;

    dao = new AcSqliteDao();
    dao.setSqlConnection({ sqlConnection: connection });

    const dd = AcDataDictionary.getInstance();
    const table = new AcDDTable();
    table.tableName = 'safety_test';
    
    const col1 = new AcDDTableColumn();
    col1.columnName = 'id';
    col1.columnType = AcEnumDDColumnType.Integer;
    col1.isPrimaryKey = () => true;
    col1.isAutoIncrement = () => true;
    
    const col2 = new AcDDTableColumn();
    col2.columnName = 'val';
    col2.columnType = AcEnumDDColumnType.String;

    table.tableColumns.push(col1);
    table.tableColumns.push(col2);
    
    dd.tables['safety_test'] = table;

    await dao.createDatabase();
    await dao.executeStatement({
      statement: `CREATE TABLE safety_test (id INTEGER PRIMARY KEY AUTOINCREMENT, val TEXT)`
    });

    sqlTable = new AcSqlDbTable({ tableName: 'safety_test' });
    sqlTable.dao = dao;
  });

  afterAll(async () => {
    const resultsPath = path.join('f:', 'Packages', 'AutoCode', 'Github', 'autocode-typescript', 'audit_fix_execution_results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
    if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  });

  it('Verify Update Safety (Empty Condition)', async () => {
    const res = await sqlTable.updateRow({ row: { val: 'should fail' }, condition: '' });
    expect(res.isFailure()).toBe(true);
    expect(res.message).toContain('Prevented accidental full-table update');
    results.push({ test: 'Update Safety', success: true, message: res.message });
  });

  it('Verify Delete Safety (Empty Condition)', async () => {
    const res = await sqlTable.deleteRows({ condition: '' });
    expect(res.isFailure()).toBe(true);
    expect(res.message).toContain('Prevented accidental full-table deletion');
    results.push({ test: 'Delete Safety', success: true, message: res.message });
  });

  it('Verify AfterInsert failure handling fix (DB_SUCCESS_BUT_EVENT_FAILURE)', async () => {
    // We expect the row to be inserted, but the result to be failure with our custom message
    const res = await sqlTable.insertRow({ row: { val: 'event-fail-test' } });
    expect(res.isFailure()).toBe(true);
    expect(res.message).toContain('DB_SUCCESS_BUT_EVENT_FAILURE');
    expect(res.rows.length).toBeGreaterThan(0); // DB write succeeded
    results.push({ test: 'AfterInsert Fix', success: true, message: res.message, db_inserted: true });
  });
});
