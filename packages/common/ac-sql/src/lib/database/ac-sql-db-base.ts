/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumLogType, AcEnumSqlDatabaseType, AcEvents, AcLogger } from "@autocode-ts/autocode";
import { AcDataDictionary } from "@autocode-ts/ac-data-dictionary";
import { AcBaseSqlDao } from "../daos/ac-base-sql-dao";
import { AcSqlConnection } from "../models/ac-sql-connection.model";
import { AcSqlDatabase } from "./ac-sql-database";
import { AcDatabaseTypeDaoClassMap } from "../consts/ac-database-type-dao-class-map.const";

export class AcSqlDbBase {
  acDataDictionary!: AcDataDictionary;
  dao: AcBaseSqlDao | null = null;
  databaseType: string = AcEnumSqlDatabaseType.Unknown;
  dataDictionaryName: string = 'default';
  events!: AcEvents;
  logger!: AcLogger;
  sqlConnection: AcSqlConnection | null = null;

  constructor({ dataDictionaryName = 'default' }: { dataDictionaryName?: string } = {}) {
    this.databaseType = AcSqlDatabase.databaseType;
    this.sqlConnection = AcSqlDatabase.sqlConnection;
    if(AcDatabaseTypeDaoClassMap[this.databaseType] != undefined){
      this.dao = new AcDatabaseTypeDaoClassMap[this.databaseType]();
    }
    this.useDataDictionary({ dataDictionaryName });
    this.logger = new AcLogger({ logType: AcEnumLogType.Print, logMessages: true });
  }

  useDataDictionary({ dataDictionaryName = 'default' }: { dataDictionaryName?: string }) {
    this.dataDictionaryName = dataDictionaryName;
    this.acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });
  }
}
