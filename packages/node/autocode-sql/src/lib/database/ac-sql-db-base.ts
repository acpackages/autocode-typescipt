/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumLogType, AcEnumSqlDatabaseType, AcEvents, AcLogger } from "@autocode-typescript/autocode";
import { AcDataDictionary } from "@autocode-typescript/autocode-data-dictionary";
import { AcBaseSqlDao } from "../daos/ac-base-sql-dao";
import { AcSqlConnection } from "../models/ac-sql-connection.model";
import { AcSqlDatabase } from "./ac-sql-database";
import { AcMysqlDao } from "../daos/ac-mysql-dao";

export class AcSqlDbBase {
  acDataDictionary!: AcDataDictionary;
  dao: AcBaseSqlDao | null = null;
  databaseType: string = AcEnumSqlDatabaseType.UNKNOWN;
  dataDictionaryName: string = 'default';
  events!: AcEvents;
  logger!: AcLogger;
  sqlConnection: AcSqlConnection | null = null;

  constructor({ dataDictionaryName = 'default' }: { dataDictionaryName?: string } = {}) {
    this.databaseType = AcSqlDatabase.databaseType;
    this.sqlConnection = AcSqlDatabase.sqlConnection;
    this.useDataDictionary({ dataDictionaryName });
    this.logger = new AcLogger({ logType: AcEnumLogType.PRINT, logMessages: true });

    if (this.databaseType === AcEnumSqlDatabaseType.MYSQL) {
      this.dao = new AcMysqlDao();
      this.dao.setSqlConnection({ sqlConnection: this.sqlConnection! });
    }
  }

  useDataDictionary({ dataDictionaryName = 'default' }: { dataDictionaryName?: string }) {
    this.dataDictionaryName = dataDictionaryName;
    this.acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });
  }
}
