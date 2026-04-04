import { AcWebOnExpress } from '@autocode-ts/ac-web-on-express';
import { AcDataDictionaryAutoApi, AcWebRequestHandlerArgs, AcWebResponse } from '@autocode-ts/ac-web';
import axios from 'axios';
import { AcEnumSqlDatabaseType } from '@autocode-ts/autocode';
import { AC_DB_TYPE_DAO_MAP, AcSqlConnection, AcSqlDatabase } from '@autocode-ts/ac-sql';
import { AcSqliteDao } from '@autocode-ts/ac-sql-node';
import path from 'path';
import { AcDataDictionary } from '@autocode-ts/ac-data-dictionary';
import { dataDictionaryJson } from '../consts/data-dictionary';
import './controllers/_controllers.export';

export async function testAcWebOnExpress(): Promise<void> {
  console.log("Testing AcWebOnExpress...");
  AcDataDictionary.registerDataDictionary({ jsonData: dataDictionaryJson });

  AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.Sqlite;
  AC_DB_TYPE_DAO_MAP[AcEnumSqlDatabaseType.Sqlite] = AcSqliteDao;

  const dbPath = path.join(process.cwd(), 'accountee.db');

  const sqlConnection = AcSqlConnection.instanceFromJson({
    jsonData: {
      [AcSqlConnection.KeyConnectionDatabase]: dbPath,
    },
  });

  AcSqlDatabase.sqlConnection = sqlConnection;

  const acWeb = new AcWebOnExpress();
  acWeb.port = 3001; // Use a different port than 3000 just in case

  const acDataDictionaryAutoApi = new AcDataDictionaryAutoApi({
        acWeb: acWeb
  });
  acDataDictionaryAutoApi.urlPrefix = '/api';
  acDataDictionaryAutoApi.generate({update: false,insert: false});

  // Register a test route
  acWeb.get({
    url: '/test',
    handler: async (args: AcWebRequestHandlerArgs) => {
      return AcWebResponse.json({ data: { message: 'Hello from AcWebOnExpress!' } });
    }
  });

  // Start the server
  const startResult = await acWeb.start();
  if (startResult.isSuccess()) {
    console.log("Server started successfully on port 3001.");

    try {
      // Perform a request using axios
      const response = await axios.get('http://localhost:3001/test');
      console.log('Response from server:');
      console.log(JSON.stringify(response.data, null, 2));

      if (response.data && response.data.message === 'Hello from AcWebOnExpress!') {
        console.log('Test Passed!');
      } else {
        console.error('Test Failed: Unexpected response content.');
        console.log('Received:', response.data);
      }
    } catch (error: any) {
      console.error('Test Failed: Error during axios request.');
      console.error(error.message);
      if (error.response) {
        console.error('Status:', error.response.status);
        console.error('Data:', error.response.data);
      }
    } finally {
      // Stop the server
      // await acWeb.stop();
      // console.log("Server stopped.");
    }
  } else {
    console.error("Failed to start server:");
    console.error(startResult.message);
  }
}
