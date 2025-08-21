/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDDEDataStorage,AcDDEExtension, AcEnumDDEHook, IAcDDEExtension } from "@autocode-ts/ac-data-dictionary-editor";
import { AcSqliteDao, initSqliteBrowserDao } from "@autocode-ts/ac-sqlite-dao-browser";
import { DataDictionary, Tables, TblState } from "../ac-dde-browser-storage";
import { AcDataDictionary } from "@autocode-ts/ac-data-dictionary";
import { AcSqlConnection, AcSqlDatabase, AcSqlDbSchemaManager, AcSqlDbTable } from "@autocode-ts/ac-sql";
import { AcEnumSqlDatabaseType } from "@autocode-ts/autocode";

export class AcDDEBrowserStorageExtension extends AcDDEExtension {
  static readonly dataDictionaryName = 'ac_dde';
  sqliteDao!: AcSqliteDao;
  databaseInitialized: boolean = false;
  ignoreSetDataHooks:boolean = false;

  async handleDataDictionarySet() {
    if (this.editorApi && this.databaseInitialized) {
      const dataStorage: AcDDEDataStorage = this.editorApi.dataStorage;

      const sqlDbTable = new AcSqlDbTable({ tableName: Tables.DataDictionaries, dataDictionaryName: AcDDEBrowserStorageExtension.dataDictionaryName });
      sqlDbTable.logger.logMessages = false;
      let continueOperation: boolean = true;

      const saveRows = async (rows: any[]) => {
        for (const row of rows) {
          if (continueOperation) {
            const response = await sqlDbTable.saveRow({ row: row })
            if (response.isFailure()) {
              continueOperation = false;
              console.error(response);
            }
            else {
              // console.info(response);
            }
          }
        }
      }

      await saveRows(dataStorage.getDataDictionaries());

      sqlDbTable.setTable({ tableName: Tables.Tables });
      await saveRows(dataStorage.getTables());

      sqlDbTable.setTable({ tableName: Tables.TableColumns });
      await saveRows(dataStorage.getTableColumns());

      sqlDbTable.setTable({ tableName: Tables.Relationships });
      await saveRows(dataStorage.getRelationships());

      sqlDbTable.setTable({ tableName: Tables.Triggers });
      await saveRows(dataStorage.getTriggers());

      sqlDbTable.setTable({ tableName: Tables.StoredProcedures });
      await saveRows(dataStorage.getStoredProcedures());

      sqlDbTable.setTable({ tableName: Tables.Functions });
      await saveRows(dataStorage.getFunctions());

      sqlDbTable.setTable({ tableName: Tables.Views });
      await saveRows(dataStorage.getViews());

      sqlDbTable.setTable({ tableName: Tables.ViewColumns });
      await saveRows(dataStorage.getViewColumns());
    }
  }

  async handleStateChange() {
    if (this.editorApi && this.databaseInitialized) {
      const state:any  = this.editorApi.getState();

      const sqlDbTable = new AcSqlDbTable({ tableName: Tables.State, dataDictionaryName: AcDDEBrowserStorageExtension.dataDictionaryName });
      sqlDbTable.logger.logMessages = false;
      let continueOperation: boolean = true;

      const saveState = async (key:string ,value: any) => {
        if (continueOperation) {
          const stateRow:any = {
            [TblState.StateKey]:key,
            [TblState.StateValue]:value
          };
            const response = await sqlDbTable.saveRow({ row: stateRow })
            if (response.isFailure()) {
              continueOperation = false;
              console.error(response);
            }
            else {
              // console.info(response);
            }
          }
      }

      for(const key of Object.keys(state)){
        await saveState(key,state[key]);
      }
    }
  }

  override handleHook({ hookName, hookArgs }: { hookName: string; hookArgs: any; }): void {
    if (hookName == AcEnumDDEHook.DataDictionarySet && !this.ignoreSetDataHooks) {
      this.handleDataDictionarySet();
    }
    else if (hookName == AcEnumDDEHook.StateChange && !this.ignoreSetDataHooks) {
      this.handleStateChange();
    }
  }

  override async init() {
    initSqliteBrowserDao();
    AcDataDictionary.registerDataDictionary({ jsonData: DataDictionary, dataDictionaryName: AcDDEBrowserStorageExtension.dataDictionaryName });
    AcSqlDatabase.databaseType = AcEnumSqlDatabaseType.Sqlite;
    AcSqlDatabase.sqlConnection = AcSqlConnection.instanceFromJson({ jsonData: { [AcSqlConnection.KeyConnectionDatabase]: 'ac_dde' } });
    const schemaManager: AcSqlDbSchemaManager = new AcSqlDbSchemaManager({ dataDictionaryName: AcDDEBrowserStorageExtension.dataDictionaryName });
    schemaManager.logger.logMessages = false;
    const response = await schemaManager.initDatabase();
    if (response.isSuccess()) {
      this.databaseInitialized = true;
      this.sqliteDao = schemaManager.dao as AcSqliteDao;
      await this.handleDataDictionarySet();
      await this.loadExistingData();
      // this.sqliteDao.downloadDatabaseFile();
    }
    else {
      console.error(response);
    }
  }

  async loadExistingData() {
    const sqlDbTable = new AcSqlDbTable({ tableName: Tables.DataDictionaries, dataDictionaryName: AcDDEBrowserStorageExtension.dataDictionaryName });
    const dataStorage: AcDDEDataStorage = this.editorApi.dataStorage;
    sqlDbTable.logger.logMessages = false;
    let continueOperation: boolean = true;
    this.ignoreSetDataHooks = true;

    const setRows = async (tableName: string, saveFunction: Function) => {
      if (continueOperation) {
        sqlDbTable.setTable({ tableName: tableName });
        const getResponse = await sqlDbTable.getRows();
        if (getResponse.isSuccess()) {
          for(const row of getResponse.rows){
            saveFunction(row);
          }
        }
        else {
          console.error(getResponse);
          continueOperation = false;
        }
      }
    }

    await setRows(Tables.DataDictionaries, (row:any)=>{
      dataStorage.saveDataDictionary(row);
    });
    await setRows(Tables.Tables,  (row:any)=>{
      dataStorage.saveTable(row);
    });
    await setRows(Tables.TableColumns,  (row:any)=>{
      dataStorage.saveTableColumn(row);
    });
    await setRows(Tables.Relationships,  (row:any)=>{
      dataStorage.saveRelationship(row);
    });
    await setRows(Tables.StoredProcedures,  (row:any)=>{
      dataStorage.saveStoredProcedure(row);
    });
    await setRows(Tables.Functions,  (row:any)=>{
      dataStorage.saveFunction(row);
    });
    await setRows(Tables.Views,  (row:any)=>{
      dataStorage.saveView(row);
    });
    await setRows(Tables.ViewColumns,  (row:any)=>{
      dataStorage.saveViewColumn(row);
    });

    sqlDbTable.setTable({tableName:Tables.State});
    const stateRowsResponse = await sqlDbTable.getRows();
    if(stateRowsResponse.isSuccess()){
      const state:any = {};
      for(const row of stateRowsResponse.rows as any[]){
        state[row[TblState.StateKey]] = row[TblState.StateValue];
      }
      this.editorApi.editorState.apply(state);
    }
    else{
      console.error(stateRowsResponse);
    }

    this.editorApi.hooks.execute({hookName:AcEnumDDEHook.DataDictionarySet});

    this.ignoreSetDataHooks = false;

  }

}

export const AcBrowserStorageDDEExtension: IAcDDEExtension = {
  extensionName: 'codeGeneratorExtension',
  extensionClass: AcDDEBrowserStorageExtension
}
