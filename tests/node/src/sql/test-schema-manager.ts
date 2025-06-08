import fs from 'fs';
import path from 'path';
import { AcDataDictionary }  from '@autocode-ts/ac-data-dictionary';
import { AcSqlConnection, AcSqlDatabase, AcSqlDbSchemaManager }  from '@autocode-ts/ac-sql';
import { AcEnumSqlDatabaseType } from '@autocode-ts/autocode';
export async function testSchemaManager(): Promise<void> {
  console.log("Testing Schema Manager");
  const dataDictionaryFilePath = path.resolve('assets/data_dictionary.json');

  if (fs.existsSync(dataDictionaryFilePath)) {
    const dataDictionaryContent = fs.readFileSync(dataDictionaryFilePath, 'utf-8');
    const dataDictionaryJson = JSON.parse(dataDictionaryContent);

    AcDataDictionary.registerDataDictionary({ jsonData: dataDictionaryJson });

    AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.MYSQL;

    const sqlConnection = AcSqlConnection.instanceFromJson({
      jsonData: {
        [AcSqlConnection.KEY_CONNECTION_USERNAME]: 'root',
        [AcSqlConnection.KEY_CONNECTION_PASSWORD]: '',
        [AcSqlConnection.KEY_CONNECTION_HOSTNAME]: 'localhost',
        [AcSqlConnection.KEY_CONNECTION_PORT]: 3306,
        [AcSqlConnection.KEY_CONNECTION_DATABASE]: 'acsm_test_dart',
      },
    });

    AcSqlDatabase.sqlConnection = sqlConnection;

    const schemaManager = new AcSqlDbSchemaManager();
    const schemaInitResult = await schemaManager.initDatabase();

    console.log('Schema init result : ');
    console.log(schemaInitResult);
  } else {
    console.log(`Could not find data dictionary json file at location : ${dataDictionaryFilePath}`);
  }
}
