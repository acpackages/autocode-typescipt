
import { AcSqliteDao } from './ac-sqlite-dao';
import { AcSqlDbTable, AcSqlDatabase, AcSqlConnection } from '@autocode-ts/ac-sql';
import { AcDataDictionary, AcDDTable, AcDDTableColumn, AcEnumDDColumnType, AcEnumSqlDatabaseType, AcEnumDDRowEvent } from '@autocode-ts/ac-data-dictionary';
import { AcSqlEventHandlersRegistry, AcSqlEventCallback, AcSqlEventHandler } from '@autocode-ts/ac-sql';
import fs from 'fs';
import path from 'path';

// Define a Custom Event Handler for the 'users' table
@AcSqlEventHandler({ tableName: 'users' })
class UsersEventHandler {
  @AcSqlEventCallback({ event: AcEnumDDRowEvent.BeforeFormat })
  async beforeFormat(args: any) {
    if (args.row.username) {
      args.row.username = args.row.username.toLowerCase();
    }
  }

  @AcSqlEventCallback({ event: AcEnumDDRowEvent.AfterInsert })
  async afterInsert(args: any) {
    args.result.message = 'EVENT_SUCCESS: ' + args.result.message;
  }
}

async function runScenarioTests() {
  const dbPath = path.join(__dirname, 'scenario_test.sqlite');
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);

  console.log('--- Starting Standalone Test Runner ---');

  // 1. Setup Environment
  const connection = new AcSqlConnection();
  connection.database = dbPath;
  AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.Sqlite;
  AcSqlDatabase.sqlConnection = connection;

  const dao = new AcSqliteDao();
  dao.setSqlConnection({ sqlConnection: connection });

  // 2. Mock Data Dictionary
  const dd = AcDataDictionary.getInstance({ dataDictionaryName: 'default' });
  const table = new AcDDTable({ tableName: 'users' });
  table.tableColumns.push(new AcDDTableColumn({ columnName: 'id', columnType: AcEnumDDColumnType.Integer, isPrimaryKey: true, isAutoIncrement: true }));
  table.tableColumns.push(new AcDDTableColumn({ columnName: 'username', columnType: AcEnumDDColumnType.String, isUniqueKey: true, checkInSave: true }));
  table.tableColumns.push(new AcDDTableColumn({ columnName: 'email', columnType: AcEnumDDColumnType.String }));
  table.tableColumns.push(new AcDDTableColumn({ columnName: 'settings', columnType: AcEnumDDColumnType.Json }));
  dd.tables.push(table);

  // 3. Create Database Table
  await dao.createDatabase();
  await dao.executeStatement({
    statement: `CREATE TABLE users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      email TEXT,
      settings TEXT
    )`
  });

  const sqlTable = new AcSqlDbTable({ tableName: 'users' });
  sqlTable.dao = dao;

  // --- SCENARIO A: INSERT with BeforeFormat Event ---
  console.log('\n[Scenario A] Testing Insert with BeforeFormat Event (Lowercase username)');
  const rowA = { username: 'AdminUser', email: 'admin@ac.com' };
  const resA = await sqlTable.insertRow({ row: rowA });
  if (resA.isSuccess() && resA.rows[0].username === 'adminuser') {
    console.log('✅ Result: Username was lowercased. Message:', resA.message);
  } else {
    console.log('❌ Result: Failed. Received:', resA.rows[0].username);
  }

  // --- SCENARIO B: JSON Data Normalization ---
  console.log('\n[Scenario B] Testing JSON Column Serialization');
  const rowB = { username: 'jsonuser', settings: { theme: 'dark', notifications: true } };
  const resB = await sqlTable.insertRow({ row: rowB });
  const rawRow = await dao.getRows({ statement: 'SELECT * FROM users WHERE username = "jsonuser"' });
  if (typeof rawRow.rows[0].settings === 'string') {
    console.log('✅ Result: Data normalized to JSON string in DB. DB Value:', rawRow.rows[0].settings);
  } else {
    console.log('❌ Result: JSON was not stringified.');
  }

  // --- SCENARIO C: SAVE (Upsert) via Unique Check ---
  console.log('\n[Scenario C] Testing Save (Upsert) using checkInSave field');
  // First update existing admin
  const rowC = { username: 'adminuser', email: 'NEW_EMAIL@ac.com' }; // This 'adminuser' exists from Scenario A
  const resC = await sqlTable.saveRow({ row: rowC });
  if (resC.operation.toString().includes('Update')) {
      console.log('✅ Result: Automatically pivoted to UPDATE for existing username.');
  } else {
      console.log('❌ Result: Failed to detect existing user by username.');
  }

  // --- SCENARIO D: DELETE with condition ---
  console.log('\n[Scenario D] Testing Delete with Condition');
  const resD = await sqlTable.deleteRows({ condition: 'email = :email', parameters: { ':email': 'NEW_EMAIL@ac.com' } });
  if (resD.affectedRowsCount === 1) {
    console.log('✅ Result: Correctly deleted row matching condition.');
  } else {
    console.log('❌ Result: Delete failed or affected wrong number of rows:', resD.affectedRowsCount);
  }

  // --- SCENARIO E: UNIQUE Key Violation ---
  console.log('\n[Scenario E] Testing Unique Key Violation Detection');
  // recreate admin
  await sqlTable.insertRow({ row: { username: 'duplicate' } });
  const resE = await sqlTable.insertRow({ row: { username: 'duplicate' } });
  if (resE.isFailure() && resE.message.includes('Unique key violated')) {
    console.log('✅ Result: Correctly blocked insertion and caught unique violation.');
  } else {
    console.log('❌ Result: Failed to catch duplicate entry. Msg:', resE.message);
  }

  // Cleanup
  if (fs.existsSync(dbPath)) fs.unlinkSync(dbPath);
  console.log('\n--- All Scenario Tests Completed ---');
}

runScenarioTests().catch(err => {
    console.error('Fatal Test Error:', err);
});
