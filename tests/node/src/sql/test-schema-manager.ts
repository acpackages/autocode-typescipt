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

    AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.MySql;

    const sqlConnection = AcSqlConnection.instanceFromJson({
      jsonData: {
        [AcSqlConnection.KeyConnectionUsername]: 'root',
        [AcSqlConnection.KeyConnectionPassword]: '',
        [AcSqlConnection.KeyConnectionHostname]: 'localhost',
        [AcSqlConnection.KeyConnectionPort]: 3306,
        [AcSqlConnection.KeyConnectionDatabase]: 'acsm_test_dart',
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
