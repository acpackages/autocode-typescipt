
import 'reflect-metadata';
import { AcSqliteDao } from './ac-sqlite-dao';

// Common SQL models
import { AcSqlConnection } from '../../../../../common/ac-sql/src/lib/models/ac-sql-connection.model';
import { AcSqlDatabase } from '../../../../../common/ac-sql/src/lib/database/ac-sql-database';
import { AcSqlDbTable } from '../../../../../common/ac-sql/src/lib/database/ac-sql-db-table';
import { AcSqlDaoResult } from '../../../../../common/ac-sql/src/lib/models/ac-sql-dao-result.model';

// Data Dictionary models
import { AcDataDictionary } from '../../../../../common/ac-data-dictionary/src/lib/models/ac-data-dictionary.model';
import { AcDDTable } from '../../../../../common/ac-data-dictionary/src/lib/models/ac-dd-table.model';
import { AcDDTableColumn } from '../../../../../common/ac-data-dictionary/src/lib/models/ac-dd-table-column.model';
import { AcEnumDDColumnType } from '../../../../../common/ac-data-dictionary/src/lib/enums/ac-enum-dd-column-type.enum';
import { AcEnumDDRowEvent } from '../../../../../common/ac-data-dictionary/src/lib/enums/ac-enum-dd-row-event.enum';

// Autocode models/enums
import { AcEnumSqlDatabaseType } from '../../../../../common/autocode/src/lib/enums/ac-enum-sql-database-type.enum';

// Decorators
import { AcSqlEventHandler, AcSqlEventCallback } from '../../../../../common/ac-sql/src/lib/annotations/ac-sql-event-handler';

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

async function runAuditFixTests() {
  const dbPath = path.join(__dirname, 'audit_test_final.sqlite');
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

  const results: any[] = [];
  console.log('--- Starting Audit Fix Verification ---');

  // Setup
  const connection = new AcSqlConnection();
  connection.database = dbPath;
  AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.Sqlite;
  AcSqlDatabase.sqlConnection = connection;

  const dao = new AcSqliteDao();
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

  const sqlTable = new AcSqlDbTable({ tableName: 'safety_test' });
  sqlTable.dao = dao;

  // TEST 1: Update Safety (Empty Condition)
  console.log('Test 1: Update Safety...');
  const res1 = await sqlTable.updateRow({ row: { val: 'should fail' }, condition: '' });
  results.push({
    test: 'Update Safety (Empty Condition)',
    success: res1.isFailure() && res1.message.includes('Prevented accidental full-table update'),
    actual_message: res1.message
  });

  // TEST 2: Delete Safety (Empty Condition)
  console.log('Test 2: Delete Safety...');
  const res2 = await sqlTable.deleteRows({ condition: '' });
  results.push({
    test: 'Delete Safety (Empty Condition)',
    success: res2.isFailure() && res2.message.includes('Prevented accidental full-table deletion'),
    actual_message: res2.message
  });

  // TEST 3: AfterInsert failure handling fix
  console.log('Test 3: AfterInsert Failure Handling...');
  const res3 = await sqlTable.insertRow({ row: { val: 'event-fail-test' } });
  results.push({
    test: 'AfterInsert Failure Discrepancy Fix',
    success: res3.isFailure() && res3.message.includes('DB_SUCCESS_BUT_EVENT_FAILURE'),
    actual_message: res3.message,
    db_row_inserted: res3.rows.length > 0
  });

  // Final validation
  const allPassed = results.every(r => r.success);
  console.log(`\nTests Completed. All Passed: ${allPassed}`);
  
  const resultsPath = path.join('f:', 'Packages', 'AutoCode', 'Github', 'autocode-typescript', 'audit_fix_execution_results.json');
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log('Results written to:', resultsPath);

  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
}

runAuditFixTests().catch(err => {
    console.error('Fatal Test Error:', err);
});
