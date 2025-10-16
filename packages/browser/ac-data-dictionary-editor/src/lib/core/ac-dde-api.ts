/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcEvents, AcHooks } from "@autocode-ts/autocode";
import { AcDDTableColumn, AcDDTable, AcDataDictionary, AcDDView, AcDDViewColumn, AcDDTrigger, AcDDRelationship, AcDDFunction, AcDDStoredProcedure, AcEnumDDColumnType } from "@autocode-ts/ac-data-dictionary";
import { IAcDDEMenuGroup } from "../interfaces/ac-dde-menu-group.interface";
import { AcDDEExtension } from "./ac-dde-extension";
import { IAcDDEMenuGroupAddHookArgs } from "../interfaces/hook-args/ac-dde-menu-group-add-hook-args.interface";
import { AcEnumDDEHook } from "../enums/ac-enum-dde-hooks.enum";
import { AcDDEExtensionManager } from "./ac-dde-extension-manager";
import { IAcDDEExtensionEnabledHookArgs } from "../interfaces/hook-args/ac-dde-extension-enabled-hook-args.interface";
import { AcDataDictionaryEditor } from "../elements/core/ac-data-dictionary-editor.element";
import { IAcDDEActiveDataDictionaryChangeHookArgs } from "../interfaces/hook-args/ac-dde-active-data-dictionary-change-hook-args.interface";
import { IAcDDEState } from "../interfaces/ac-dde-state.interface";
import { AcDDEState } from "./ac-dde-state";
import { AcDDEDataStorage } from "./ac-dde-data-storage";
import { IAcDDEDataDictionary } from "../interfaces/ac-dde-data-dictionary.inteface";
import { AcEnumDDETab } from "../enums/ac-enum-dde-tab.enum";
import { IAcDDEHookArgs } from "../interfaces/hook-args/ac-dde-hook-args.interface";
import { AcDDEEventHandler } from "./ac-dde-event-handler";

export class AcDDEApi {
  private _activeDataDictionary?: IAcDDEDataDictionary;
  get activeDataDictionary(): IAcDDEDataDictionary | undefined {
    return this._activeDataDictionary;
  }
  set activeDataDictionary(value: IAcDDEDataDictionary) {
    const oldActiveDataDictionary = this._activeDataDictionary;
    this._activeDataDictionary = value;
    const hookArgs: IAcDDEActiveDataDictionaryChangeHookArgs = {
      activeDataDictionary: value,
      editorApi: this,
      oldActiveDataDictionary: oldActiveDataDictionary,
    };
    this.hooks.execute({ hook: AcEnumDDEHook.ActiveDataDictionaryChange, args: hookArgs });
  }

  private _activeEditorTab: AcEnumDDETab = AcEnumDDETab.TableEditor;
  get activeEditorTab(): AcEnumDDETab {
    return this._activeEditorTab;
  }
  set activeEditorTab(value: AcEnumDDETab) {
    this._activeEditorTab = value;
    const hookArgs: IAcDDEHookArgs = {
      editorApi: this,
      value: value,
    };
    this.hooks.execute({ hook: AcEnumDDEHook.EditorTabChange, args: hookArgs });
  }

  dataStorage: AcDDEDataStorage;
  editor!: AcDataDictionaryEditor;
  editorState: AcDDEState;
  events: AcEvents = new AcEvents();
  eventHandler: AcDDEEventHandler;
  extensions: Record<string, AcDDEExtension> = {};
  hooks: AcHooks = new AcHooks();
  menus: IAcDDEMenuGroup[] = [];

  constructor({ editor }: { editor: AcDataDictionaryEditor }) {
    editor = this.editor;
    this.eventHandler = new AcDDEEventHandler({editorApi:this});
    this.dataStorage = new AcDDEDataStorage({ editorApi: this });
    this.editorState = new AcDDEState({ editorApi: this });
    AcDDEExtensionManager.registerBuiltInExtensions();
  }

  addMenuGroup({ menuGroup }: { menuGroup: IAcDDEMenuGroup }) {
    this.menus.push(menuGroup);
    const hookArgs: IAcDDEMenuGroupAddHookArgs = {
      editorApi: this,
      menuGroup: menuGroup
    };
    this.hooks.execute({ hook: AcEnumDDEHook.MenuGroupAdd, args: hookArgs });
  }

  enableExtension({ extensionName }: { extensionName: string }): AcDDEExtension | null {
    if (AcDDEExtensionManager.hasExtension({ extensionName: extensionName })) {
      const extensionInstance = AcDDEExtensionManager.createInstance({ extensionName: extensionName });
      if (extensionInstance) {
        extensionInstance.editorApi = this;
        const hookId: string = this.hooks.subscribeAllHooks({
          callback: (hook: string, args: any) => {
            extensionInstance.handleHook({ hook: hook, args: args });
          }
        });
        extensionInstance.hookId = hookId;
        extensionInstance.init();
        this.extensions[extensionName] = extensionInstance;
        const hookArgs: IAcDDEExtensionEnabledHookArgs = {
          extensionName: extensionName,
          editorApi: this,
        };
        this.hooks.execute({ hook: AcEnumDDEHook.ExtensionEnabled, args: hookArgs });
        return extensionInstance;
      }
    }
    return null;
  }

  getDataDictionaryJson({ dataDictionaryId }: { dataDictionaryId: string }) {
    const dataDictionary: any = {
      [AcDataDictionary.KeyName]: 0,
      [AcDataDictionary.KeyVersion]: 0,
      [AcDataDictionary.KeyTables]: {},
      [AcDataDictionary.KeyViews]: {},
      [AcDataDictionary.KeyRelationships]: [],
      [AcDataDictionary.KeyStoredProcedures]: {},
      [AcDataDictionary.KeyFunctions]: {},
    };
    const dataDictionaryRows = this.dataStorage.getDataDictionaries({ dataDictionaryId: dataDictionaryId });
    if (dataDictionaryRows.length > 0) {
      const dataDictionartRow: IAcDDEDataDictionary = dataDictionaryRows[0];
      dataDictionary[AcDataDictionary.KeyVersion] = dataDictionartRow.dataDictionaryVersion;
      dataDictionary[AcDataDictionary.KeyName] = dataDictionartRow.dataDictionaryName;

      const tables: any = {};
      for (const tableRow of this.dataStorage.getTables({ dataDictionaryId: dataDictionartRow.dataDictionaryId })) {
        const columns: any = {};
        for (const columnRow of this.dataStorage.getTableColumns({ tableId: tableRow.tableId! })) {
          columns[columnRow.columnName!] = {
            [AcDDTableColumn.KeyColumnName]: columnRow.columnName,
            [AcDDTableColumn.KeyColumnType]: columnRow.columnType,
            [AcDDTableColumn.KeyColumnProperties]: columnRow.columnProperties
          };
        }
        tables[tableRow.tableName!] = {
          [AcDDTable.KeyTableName]: tableRow.tableName,
          [AcDDTable.KeyTableColumns]: columns,
          [AcDDTable.KeyTableProperties]: tableRow.tableProperties
        };
      }
      dataDictionary[AcDataDictionary.KeyTables] = tables;

      const views: any = {};
      for (const viewRow of this.dataStorage.getViews({ dataDictionaryId: dataDictionartRow.dataDictionaryId })) {
        const columns: any = {};
        for (const columnRow of this.dataStorage.getViewColumns({ viewId: viewRow.viewId })) {
          columns[columnRow.columnName!] = {
            [AcDDViewColumn.KeyColumnName]: columnRow.columnName,
            [AcDDViewColumn.KeyColumnType]: columnRow.columnType,
            [AcDDViewColumn.KeyColumnProperties]: columnRow.columnProperties,
            [AcDDViewColumn.KeyColumnSource]: columnRow.columnSource,
            [AcDDViewColumn.KeyColumnSourceName]: columnRow.columnSourceName,
          };
        }
        views[viewRow.viewName!] = {
          [AcDDView.KeyViewName]: viewRow.viewName,
          [AcDDView.KeyViewColumns]: columns,
          [AcDDView.KeyViewQuery]: viewRow.viewQuery,
        };
      }
      dataDictionary[AcDataDictionary.KeyViews] = views;

      const relationships: any[] = [];
      for (const relationshipRow of this.dataStorage.getRelationships({ dataDictionaryId: dataDictionartRow.dataDictionaryId })) {
        if (
          this.dataStorage.hasTableColumnWithId(relationshipRow.destinationColumnId!) &&
          this.dataStorage.hasTableColumnWithId(relationshipRow.sourceColumnId!) &&
          this.dataStorage.hasTableWithId(relationshipRow.destinationTableId!) &&
          this.dataStorage.hasTableWithId(relationshipRow.sourceTableId!)
        ) {
          relationships.push({
            [AcDDRelationship.KeyCascadeDeleteDestination]: relationshipRow.cascadeDeleteDestination,
            [AcDDRelationship.KeyCascadeDeleteSource]: relationshipRow.cascadeDeleteSource,
            [AcDDRelationship.KeyDestinationColumn]: this.dataStorage.getTableColumns({ columnId: relationshipRow.destinationColumnId })[0].columnName,
            [AcDDRelationship.KeyDestinationTable]: this.dataStorage.getTables({ tableId: relationshipRow.destinationTableId })[0].tableName,
            [AcDDRelationship.KeySourceColumn]: this.dataStorage.getTableColumns({ columnId: relationshipRow.sourceColumnId })[0].columnName,
            [AcDDRelationship.KeySourceTable]: this.dataStorage.getTables({ tableId: relationshipRow.sourceTableId })[0].tableName
          });
        }
      }
      dataDictionary[AcDataDictionary.KeyRelationships] = relationships;

      const triggers: any = {};
      for (const triggerRow of this.dataStorage.getTriggers({ dataDictionaryId: dataDictionartRow.dataDictionaryId })) {
        if (this.dataStorage.hasTableWithId(triggerRow.tableId!)) {
          triggers[triggerRow.triggerName!] = ({
            [AcDDTrigger.KeyTriggerExecution]: triggerRow.triggerExecution,
            [AcDDTrigger.KeyRowOperation]: triggerRow.rowOperation,
            [AcDDTrigger.KeyTableName]: this.dataStorage.getTables({ tableId: triggerRow.tableId })[0].tableName,
            [AcDDTrigger.KeyTriggerName]: triggerRow.triggerName,
            [AcDDTrigger.KeyTriggerCode]: triggerRow.triggerCode,
          });
        }
      }
      dataDictionary[AcDataDictionary.KeyTriggers] = triggers;

      const functions: any = {};
      for (const functionRow of this.dataStorage.getFunctions({ dataDictionaryId: dataDictionartRow.dataDictionaryId })) {
        functions[functionRow.functionName!] = ({
          [AcDDFunction.KeyFunctionName]: functionRow.functionName,
          [AcDDFunction.KeyFunctionCode]: functionRow.functionCode
        });
      }
      dataDictionary[AcDataDictionary.KeyFunctions] = functions;

      const storedProcedures: any = {};
      for (const storedProcedureRow of this.dataStorage.getStoredProcedures({ dataDictionaryId: dataDictionartRow.dataDictionaryId })) {
        functions[storedProcedureRow.storedProcedureName!] = ({
          [AcDDStoredProcedure.KeyStoredProcedureName]: storedProcedureRow.storedProcedureName,
          [AcDDStoredProcedure.KeyStoredProcedureCode]: storedProcedureRow.storedProcedureCode
        });
      }
      dataDictionary[AcDataDictionary.KeyFunctions] = storedProcedures;
    }
    return dataDictionary;
  }

  getState(): IAcDDEState {
    return this.editorState.toJson();
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event,callback});
  }

  setDataDictionaryJson({ dataDictionaryJson, dataDictionaryName }: { dataDictionaryName?: string, dataDictionaryJson: any }) {
    let version: number = 0;
    if (dataDictionaryJson[AcDataDictionary.KeyVersion]) {
      version = dataDictionaryJson[AcDataDictionary.KeyVersion];
    }
    if(dataDictionaryName == undefined && dataDictionaryJson[AcDataDictionary.KeyName]){
      dataDictionaryName = dataDictionaryJson[AcDataDictionary.KeyName];
    }
    const dataDictionaries = this.dataStorage.getDataDictionaries({dataDictionaryName:dataDictionaryName});
    let dataDictionaryRow:IAcDDEDataDictionary;
    if(dataDictionaries.length > 0){
      dataDictionaryRow = dataDictionaries[0];
    }
    else{
      dataDictionaryRow = this.dataStorage.addDataDictionary({ dataDictionaryName: dataDictionaryName, dataDictionaryVersion: version });
    }
    const dataDictionaryId = dataDictionaryRow.dataDictionaryId;

    if (dataDictionaryJson[AcDataDictionary.KeyTables]) {
      const tableNames:string[] = Object.keys(dataDictionaryJson[AcDataDictionary.KeyTables]);
      tableNames.sort();
      for (const tableName of tableNames) {
        const tableDetails = dataDictionaryJson[AcDataDictionary.KeyTables][tableName];
        const tableColumns = tableDetails[AcDDTable.KeyTableColumns];
        const tableProperties = tableDetails[AcDDTable.KeyTableProperties];
        const tableRow = this.dataStorage.addTable({
          dataDictionaryId: dataDictionaryId,
          tableName: tableName,
          tableProperties: tableProperties
        });

        for (const columnDetails of Object.values(tableColumns) as any[]) {
          const columnName = columnDetails[AcDDTableColumn.KeyColumnName];
          const columnProperties = columnDetails[AcDDTableColumn.KeyColumnProperties];
          const columnType = columnDetails[AcDDTableColumn.KeyColumnType];
          this.dataStorage.addTableColumn({ dataDictionaryId: dataDictionaryId, tableId: tableRow.tableId, columnName: columnName, columnType: columnType, columnProperties: columnProperties });
        }
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyViews]) {
      const viewNames:string[] = Object.keys(dataDictionaryJson[AcDataDictionary.KeyViews]);
      viewNames.sort();
      for (const viewName of viewNames) {
        const viewDetails = dataDictionaryJson[AcDataDictionary.KeyViews][viewName];
        const viewQuery = viewDetails[AcDDView.KeyViewQuery];
        const viewColumns = viewDetails[AcDDView.KeyViewColumns];
        const viewRow = this.dataStorage.addView({ dataDictionaryId: dataDictionaryId, viewName: viewName, viewQuery: viewQuery });
        if (viewColumns) {
          for (const columnDetails of Object.values(viewColumns) as any[]) {
            const columnName = columnDetails[AcDDViewColumn.KeyColumnName];
            const columnProperties = columnDetails[AcDDViewColumn.KeyColumnProperties];
            const columnType = columnDetails[AcDDViewColumn.KeyColumnType];
            this.dataStorage.addViewColumn({ dataDictionaryId: dataDictionaryId, viewId: viewRow.viewId, columnName: columnName, columnType: columnType, columnProperties: columnProperties, columnSource: '', columnSourceName: '' });
          }
        }

      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyTriggers]) {
      const triggerNames:string[] = Object.keys(dataDictionaryJson[AcDataDictionary.KeyTriggers]);
      triggerNames.sort();
      for (const triggerName of triggerNames) {
        const triggerDetails = dataDictionaryJson[AcDataDictionary.KeyTriggers][triggerName];
        const tableRows = this.dataStorage.getTables({ tableName: triggerDetails[AcDDTrigger.KeyTableName], dataDictionaryId: dataDictionaryId! });
        if (tableRows.length > 0) {
          const triggerId = this.dataStorage.addTrigger({
            dataDictionaryId: dataDictionaryId,
            triggerName: triggerDetails[AcDDTrigger.KeyTriggerName],
            rowOperation: triggerDetails[AcDDTrigger.KeyRowOperation],
            tableId: tableRows[0].tableId,
            triggerCode: triggerDetails[AcDDTrigger.KeyTriggerCode],
            triggerExecution: triggerDetails[AcDDTrigger.KeyTriggerExecution]
          });
        }
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyRelationships]) {
      const relationshipRows: any = [];
      // for (const l1Details of Object.values(dataDictionaryJson[AcDataDictionary.KeyRelationships]) as any[]) {
      //   for (const l2Details of Object.values(l1Details) as any[]) {
      //     for (const l3Details of Object.values(l2Details) as any[]) {
      //       for (const relationshipDetails of Object.values(l3Details) as any[]) {
      //         // console.log(relationshipDetails);
      //         const destinationTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeyDestinationTable], dataDictionaryId: dataDictionaryId! });
      //         const sourceTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeySourceTable], dataDictionaryId: dataDictionaryId! });
      //         if (sourceTableRows.length > 0 && destinationTableRows.length > 0) {
      //           const sourceTableId = sourceTableRows[0].tableId;
      //           const destinationTableId = destinationTableRows[0].tableId;

      //           const sourceColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeySourceColumn], dataDictionaryId: dataDictionaryId!, tableId: sourceTableId! })
      //           const destinationColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeyDestinationColumn], dataDictionaryId: dataDictionaryId!, tableId: destinationTableId! });

      //           if (sourceColumnRows.length > 0 && destinationColumnRows.length > 0) {
      //             const relationshipId = this.dataStorage.addRelationship({
      //               dataDictionaryId: dataDictionaryId,
      //               sourceTableId: sourceTableId,
      //               sourceColumnId: sourceColumnRows[0].columnId,
      //               destinationColumnId: destinationColumnRows[0].columnId,
      //               destinationTableId: destinationTableId,
      //               cascadeDeleteDestination: relationshipDetails[AcDDRelationship.KeyCascadeDeleteDestination],
      //               cascadeDeleteSource: relationshipDetails[AcDDRelationship.KeyCascadeDeleteSource]
      //             });
      //           }
      //         }
      //       }
      //     }
      //   }
      // }
      for (const relationshipDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyRelationships]) as any[]) {
        const destinationTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeyDestinationTable], dataDictionaryId: dataDictionaryId! });
        const sourceTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeySourceTable], dataDictionaryId: dataDictionaryId! });
        if (sourceTableRows.length > 0 && destinationTableRows.length > 0) {
          const sourceTableId = sourceTableRows[0].tableId;
          const destinationTableId = destinationTableRows[0].tableId;

          const sourceColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeySourceColumn], dataDictionaryId: dataDictionaryId!, tableId: sourceTableId! })
          const destinationColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeyDestinationColumn], dataDictionaryId: dataDictionaryId!, tableId: destinationTableId! });

          if (sourceColumnRows.length > 0 && destinationColumnRows.length > 0) {
            const relationshipId = this.dataStorage.addRelationship({
              dataDictionaryId: dataDictionaryId,
              sourceTableId: sourceTableId,
              sourceColumnId: sourceColumnRows[0].columnId,
              destinationColumnId: destinationColumnRows[0].columnId,
              destinationTableId: destinationTableId,
              cascadeDeleteDestination: relationshipDetails[AcDDRelationship.KeyCascadeDeleteDestination],
              cascadeDeleteSource: relationshipDetails[AcDDRelationship.KeyCascadeDeleteSource]
            });
          }

        }
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyFunctions]) {
      for (const functionDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyFunctions]) as any[]) {
        const functionId = this.dataStorage.addFunction({
          dataDictionaryId: dataDictionaryId,
          functionName: functionDetails[AcDDFunction.KeyFunctionName],
          functionCode: functionDetails[AcDDFunction.KeyFunctionCode]
        });
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyStoredProcedures]) {
      for (const storedProcedureDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyStoredProcedures]) as any[]) {
        const storedProcedureId = this.dataStorage.addStoredProcedure({
          dataDictionaryId: dataDictionaryId,
          storedProcedureName: storedProcedureDetails[AcDDStoredProcedure.KeyStoredProcedureName],
          storedProcedureCode: storedProcedureDetails[AcDDStoredProcedure.KeyStoredProcedureCode]
        });
      }
    }

    this.hooks.execute({ hook: AcEnumDDEHook.DataDictionarySet });
  }

  setState(state: IAcDDEState): void {
    this.editorState.apply({state:state});
  }

}
