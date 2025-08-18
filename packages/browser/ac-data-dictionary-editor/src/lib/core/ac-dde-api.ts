/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcEvents, AcHooks } from "@autocode-ts/autocode";
import { AcDDTableColumn, AcDDTable, AcDataDictionary, AcDDView, AcDDViewColumn, AcDDTrigger, AcDDRelationship, AcDDFunction, AcDDStoredProcedure } from "@autocode-ts/ac-data-dictionary";
import { IAcDDEMenuGroup } from "../interfaces/ac-dde-menu-group.interface";
import { AcDDEDataStorage } from "../models/ac-dde-data-storage.model";
import { AcDDEExtension } from "./ac-dde-extension";
import { IAcDDEMenuGroupAddHookArgs } from "../interfaces/hook-args/ac-dde-menu-group-add-hook-args.interface";
import { AcEnumDDEHook } from "../enums/ac-enum-dde-hooks.enum";
import { AcDDEExtensionManager } from "./ac-dde-extension-manager";
import { IAcDDEExtensionEnabledHookArgs } from "../interfaces/hook-args/ac-dde-extension-enabled-hook-args.interface";
import { IAcDDEDataDictionaryRow } from "../interfaces/ac-dde-data-dictionary-row.inteface";
import { AcDataDictionaryEditor } from "../elements/core/ac-data-dictionary-editor.element";
import { IAcDDEActiveDataDictionaryChangeHookArgs } from "../interfaces/hook-args/ac-dde-active-data-dictionary-change-hook-args.interface";
import { AcEnumDDETab, IAcDDEHookArgs } from "../_ac-data-dictionary-editor.export";

export class AcDDEApi {
  private _activeDataDictionary?: IAcDDEDataDictionaryRow;
  get activeDataDictionary(): IAcDDEDataDictionaryRow | undefined {
    return this._activeDataDictionary;
  }
  set activeDataDictionary(value: IAcDDEDataDictionaryRow) {
    const oldActiveDataDictionary = this._activeDataDictionary;
    this._activeDataDictionary = value;
    const hookArgs: IAcDDEActiveDataDictionaryChangeHookArgs = {
      activeDataDictionary: value,
      editorApi: this,
      oldActiveDataDictionary: oldActiveDataDictionary,
    };
    this.hooks.execute({ hookName: AcEnumDDEHook.ActiveDataDictionaryChange, args: hookArgs });
  }

  private _activeEditorTab: AcEnumDDETab = AcEnumDDETab.DataDictionaryEditor;
  get activeEditorTab(): AcEnumDDETab {
    return this._activeEditorTab;
  }
  set activeEditorTab(value: AcEnumDDETab) {
    this._activeEditorTab = value;
    const hookArgs: IAcDDEHookArgs = {
      editorApi: this,
      value: value,
    };
    this.hooks.execute({ hookName: AcEnumDDEHook.EditorTabChange, args: hookArgs });
  }

  dataStorage: AcDDEDataStorage = new AcDDEDataStorage({ editorApi: this });
  editor!: AcDataDictionaryEditor;
  events: AcEvents = new AcEvents();
  extensions: Record<string, AcDDEExtension> = {};
  hooks: AcHooks = new AcHooks();
  menus: IAcDDEMenuGroup[] = [];

  constructor({ editor }: { editor: AcDataDictionaryEditor }) {
    editor = this.editor;
    AcDDEExtensionManager.registerBuiltInExtensions();
  }

  addDataDictionaryJson({ dataDictionaryJson, dataDictionaryName }: { dataDictionaryName: string, dataDictionaryJson: any }) {
    let version: number = 0;
    if (dataDictionaryJson[AcDataDictionary.KeyVersion]) {
      version = dataDictionaryJson[AcDataDictionary.KeyVersion];
    }
    const dataDictionaryRow = this.dataStorage.addDataDictionary({ data_dictionary_name: dataDictionaryName, data_dictionary_version: version });
    const dataDictionaryId = dataDictionaryRow.data_dictionary_id;

    if (dataDictionaryJson[AcDataDictionary.KeyTables]) {
      for (const tableDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyTables]) as any[]) {
        const tableName = tableDetails[AcDDTable.KeyTableName];
        const tableColumns = tableDetails[AcDDTable.KeyTableColumns];
        const tableProperties = tableDetails[AcDDTable.KeyTableProperties];
        const tableRow = this.dataStorage.addTable({
          data_dictionary_id: dataDictionaryId,
          table_name: tableName,
          table_properties: tableProperties
        });

        for (const columnDetails of Object.values(tableColumns) as any[]) {
          const columnName = columnDetails[AcDDTableColumn.KeyColumnName];
          const columnProperties = columnDetails[AcDDTableColumn.KeyColumnProperties];
          const columnType = columnDetails[AcDDTableColumn.KeyColumnType];
          this.dataStorage.addTableColumn({ data_dictionary_id: dataDictionaryId, table_id: tableRow.table_id, column_name: columnName, column_type: columnType, column_properties: columnProperties });
        }
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyViews]) {
      for (const viewDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyViews]) as any[]) {
        const viewName = viewDetails[AcDDView.KeyViewName];
        const viewQuery = viewDetails[AcDDView.KeyViewQuery];
        const viewColumns = viewDetails[AcDDView.KeyViewColumns];
        const viewRow = this.dataStorage.addView({ data_dictionary_id: dataDictionaryId, view_name: viewName, view_query: viewQuery });
        if (viewColumns) {
          for (const columnDetails of Object.values(viewColumns) as any[]) {
            const columnName = columnDetails[AcDDViewColumn.KeyColumnName];
            const columnProperties = columnDetails[AcDDViewColumn.KeyColumnProperties];
            const columnType = columnDetails[AcDDViewColumn.KeyColumnType];
            this.dataStorage.addViewColumn({ data_dictionary_id: dataDictionaryId, view_id: viewRow.view_id, column_name: columnName, column_type: columnType, column_properties: columnProperties, column_source: '', column_source_name: '' });
          }
        }

      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyTriggers]) {
      for (const triggerDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyTriggers]) as any[]) {
        const tableRows = this.dataStorage.getTables({ tableName: triggerDetails[AcDDTrigger.KeyTableName], dataDictionaryId: dataDictionaryId! });
        if (tableRows.length > 0) {
          const triggerId = this.dataStorage.addTrigger({
            data_dictionary_id: dataDictionaryId,
            trigger_name: triggerDetails[AcDDTrigger.KeyTriggerName],
            row_operation: triggerDetails[AcDDTrigger.KeyRowOperation],
            table_id: tableRows[0].table_id,
            trigger_code: triggerDetails[AcDDTrigger.KeyTriggerCode],
            trigger_execution: triggerDetails[AcDDTrigger.KeyTriggerExecution]
          });
        }
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyRelationships]) {
      const relationshipRows: any = [];
      for (const l1Details of Object.values(dataDictionaryJson[AcDataDictionary.KeyRelationships]) as any[]) {
        for (const l2Details of Object.values(l1Details) as any[]) {
          for (const l3Details of Object.values(l2Details) as any[]) {
            for (const relationshipDetails of Object.values(l3Details) as any[]) {
              // console.log(relationshipDetails);
              const destinationTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeyDestinationTable], dataDictionaryId: dataDictionaryId! });
              const sourceTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeySourceTable], dataDictionaryId: dataDictionaryId! });
              if (sourceTableRows.length > 0 && destinationTableRows.length > 0) {
                const sourceTableId = sourceTableRows[0].table_id;
                const destinationTableId = destinationTableRows[0].table_id;

                const sourceColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeySourceColumn], dataDictionaryId: dataDictionaryId!, tableId: sourceTableId! })
                const destinationColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeyDestinationColumn], dataDictionaryId: dataDictionaryId!, tableId: destinationTableId! });

                if (sourceColumnRows.length > 0 && destinationColumnRows.length > 0) {
                  const relationshipId = this.dataStorage.addRelationship({
                    data_dictionary_id: dataDictionaryId,
                    source_table_id: sourceTableId,
                    source_column_id: sourceColumnRows[0].column_id,
                    destination_column_id: destinationColumnRows[0].column_id,
                    destination_table_id: destinationTableId,
                    cascade_delete_destination: relationshipDetails[AcDDRelationship.KeyCascadeDeleteDestination],
                    cascade_delete_source: relationshipDetails[AcDDRelationship.KeyCascadeDeleteSource]
                  });
                }
              }
            }
          }
        }
      }
      // for (const relationshipDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyRelationships]) as any[]) {
      //   const destinationTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeyDestinationTable], dataDictionaryId: dataDictionaryId! });
      //   const sourceTableRows = this.dataStorage.getTables({ tableName: relationshipDetails[AcDDRelationship.KeySourceTable], dataDictionaryId: dataDictionaryId! });
      //   if (sourceTableRows.length > 0 && destinationTableRows.length > 0) {
      //     const sourceTableId = sourceTableRows[0].table_id;
      //     const destinationTableId = destinationTableRows[0].table_id;

      //     const sourceColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeySourceColumn], dataDictionaryId: dataDictionaryId!, tableId: sourceTableId! })
      //     const destinationColumnRows = this.dataStorage.getTableColumns({ columnName: relationshipDetails[AcDDRelationship.KeyDestinationColumn], dataDictionaryId: dataDictionaryId!, tableId: destinationTableId! });

      //     if (sourceColumnRows.length > 0 && destinationColumnRows.length > 0) {
      //       const relationshipId = this.dataStorage.addRelationship({
      //         data_dictionary_id: dataDictionaryId,
      //         source_table_id: sourceTableId,
      //         source_column_id: sourceColumnRows[0].column_id,
      //         destination_column_id: destinationColumnRows[0].column_id,
      //         destination_table_id: destinationTableId,
      //         cascade_delete_destination: relationshipDetails[AcDDRelationship.KeyCascadeDeleteDestination],
      //         cascade_delete_source: relationshipDetails[AcDDRelationship.KeyCascadeDeleteSource]
      //       });
      //     }

      //   }
      // }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyFunctions]) {
      for (const functionDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyFunctions]) as any[]) {
        const functionId = this.dataStorage.addFunction({
          data_dictionary_id: dataDictionaryId,
          function_name: functionDetails[AcDDFunction.KeyFunctionName],
          function_code: functionDetails[AcDDFunction.KeyFunctionCode]
        });
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyStoredProcedures]) {
      for (const storedProcedureDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyStoredProcedures]) as any[]) {
        const storedProcedureId = this.dataStorage.addStoredProcedure({
          data_dictionary_id: dataDictionaryId,
          stored_procedure_name: storedProcedureDetails[AcDDStoredProcedure.KeyStoredProcedureName],
          stored_procedure_code: storedProcedureDetails[AcDDStoredProcedure.KeyStoredProcedureCode]
        });
      }
    }

    this.hooks.execute({ hookName: AcEnumDDEHook.DataLoaded });
  }

  addMenuGroup({ menuGroup }: { menuGroup: IAcDDEMenuGroup }) {
    this.menus.push(menuGroup);
    const hookArgs: IAcDDEMenuGroupAddHookArgs = {
      editorApi: this,
      menuGroup: menuGroup
    };
    this.hooks.execute({ hookName: AcEnumDDEHook.MenuGroupAdd, args: hookArgs });
  }

  enableExtension({ extensionName }: { extensionName: string }): AcDDEExtension | null {
    if (AcDDEExtensionManager.hasExtension({ extensionName: extensionName })) {
      const extensionInstance = AcDDEExtensionManager.createInstance({ extensionName: extensionName });
      if (extensionInstance) {
        extensionInstance.editorApi = this;
        const hookId: string = this.hooks.subscribeAllHooks({
          callback: (hookName: string, args: any) => {
            extensionInstance.handleHook({ hookName: hookName, hookArgs: args });
          }
        });
        extensionInstance.hookId = hookId;
        extensionInstance.init();
        this.extensions[extensionName] = extensionInstance;
        const hookArgs: IAcDDEExtensionEnabledHookArgs = {
          extensionName: extensionName,
          editorApi: this,
        };
        this.hooks.execute({ hookName: AcEnumDDEHook.ExtensionEnabled, args: hookArgs });
        return extensionInstance;
      }
    }
    return null;
  }

  getDataDictionaryJson({ dataDictionaryId }: { dataDictionaryId: string }) {
    const dataDictionary: any = {
      [AcDataDictionary.KeyVersion]: 0,
      [AcDataDictionary.KeyTables]: {},
      [AcDataDictionary.KeyViews]: {},
      [AcDataDictionary.KeyRelationships]: [],
      [AcDataDictionary.KeyStoredProcedures]: {},
      [AcDataDictionary.KeyFunctions]: {},
    };
    const dataDictionaryRows = this.dataStorage.getDataDictionaries({ dataDictionaryId: dataDictionaryId });
    if (dataDictionaryRows.length > 0) {
      const dataDictionartRow: IAcDDEDataDictionaryRow = dataDictionaryRows[0];
      dataDictionary[AcDataDictionary.KeyVersion] = dataDictionartRow.data_dictionary_version;

      const tables: any = {};
      for (const tableRow of this.dataStorage.getTables({ dataDictionaryId: dataDictionartRow.data_dictionary_id })) {
        const columns: any = {};
        for (const columnRow of this.dataStorage.getTableColumns({ tableId: tableRow.table_id! })) {
          columns[columnRow.column_name!] = {
            [AcDDTableColumn.KeyColumnName]: columnRow.column_name,
            [AcDDTableColumn.KeyColumnType]: columnRow.column_type,
            [AcDDTableColumn.KeyColumnProperties]: columnRow.column_properties
          };
        }
        tables[tableRow.table_name!] = {
          [AcDDTable.KeyTableName]: tableRow.table_name,
          [AcDDTable.KeyTableColumns]: columns,
          [AcDDTable.KeyTableProperties]: tableRow.table_properties
        };
      }
      dataDictionary[AcDataDictionary.KeyTables] = tables;

      const views: any = {};
      for (const viewRow of this.dataStorage.getViews({ dataDictionaryId: dataDictionartRow.data_dictionary_id })) {
        const columns: any = {};
        for (const columnRow of this.dataStorage.getViewColumns({ viewId: viewRow.view_id })) {
          columns[columnRow.column_name!] = {
            [AcDDViewColumn.KeyColumnName]: columnRow.column_name,
            [AcDDViewColumn.KeyColumnType]: columnRow.column_type,
            [AcDDViewColumn.KeyColumnProperties]: columnRow.column_properties,
            [AcDDViewColumn.KeyColumnSource]: columnRow.column_source,
            [AcDDViewColumn.KeyColumnSourceName]: columnRow.column_source_name,
          };
        }
        views[viewRow.view_name!] = {
          [AcDDView.KeyViewName]: viewRow.view_name,
          [AcDDView.KeyViewColumns]: columns,
          [AcDDView.KeyViewQuery]: viewRow.view_query,
        };
      }
      dataDictionary[AcDataDictionary.KeyViews] = views;

      const relationships: any[] = [];
      for (const relationshipRow of this.dataStorage.getRelationships({ dataDictionaryId: dataDictionartRow.data_dictionary_id })) {
        if (
          this.dataStorage.hasTableColumnWithId(relationshipRow.destination_column_id!) &&
          this.dataStorage.hasTableColumnWithId(relationshipRow.source_column_id!) &&
          this.dataStorage.hasTableWithId(relationshipRow.destination_table_id!) &&
          this.dataStorage.hasTableWithId(relationshipRow.source_table_id!)
        ) {
          relationships.push({
            [AcDDRelationship.KeyCascadeDeleteDestination]: relationshipRow.cascade_delete_destination,
            [AcDDRelationship.KeyCascadeDeleteSource]: relationshipRow.cascade_delete_source,
            [AcDDRelationship.KeyDestinationColumn]: this.dataStorage.getTableColumns({ columnId: relationshipRow.destination_column_id })[0].column_name,
            [AcDDRelationship.KeyDestinationTable]: this.dataStorage.getTables({ tableId: relationshipRow.destination_table_id })[0].table_name,
            [AcDDRelationship.KeySourceColumn]: this.dataStorage.getTableColumns({ columnId: relationshipRow.source_column_id })[0].column_name,
            [AcDDRelationship.KeySourceTable]: this.dataStorage.getTables({ tableId: relationshipRow.source_table_id })[0].table_name
          });
        }
      }
      dataDictionary[AcDataDictionary.KeyRelationships] = relationships;

      const triggers: any = {};
      for (const triggerRow of this.dataStorage.getTriggers({ dataDictionaryId: dataDictionartRow.data_dictionary_id })) {
        if (this.dataStorage.hasTableWithId(triggerRow.table_id!)) {
          triggers[triggerRow.trigger_name!] = ({
            [AcDDTrigger.KeyTriggerExecution]: triggerRow.trigger_execution,
            [AcDDTrigger.KeyRowOperation]: triggerRow.row_operation,
            [AcDDTrigger.KeyTableName]: this.dataStorage.getTables({ tableId: triggerRow.table_id })[0].table_name,
            [AcDDTrigger.KeyTriggerName]: triggerRow.trigger_name,
            [AcDDTrigger.KeyTriggerCode]: triggerRow.trigger_code,
          });
        }
      }
      dataDictionary[AcDataDictionary.KeyTriggers] = triggers;

      const functions: any = {};
      for (const functionRow of this.dataStorage.getFunctions({ dataDictionaryId: dataDictionartRow.data_dictionary_id })) {
        functions[functionRow.function_name!] = ({
          [AcDDFunction.KeyFunctionName]: functionRow.function_name,
          [AcDDFunction.KeyFunctionCode]: functionRow.function_code
        });
      }
      dataDictionary[AcDataDictionary.KeyFunctions] = functions;

      const storedProcedures: any = {};
      for (const storedProcedureRow of this.dataStorage.getStoredProcedures({ dataDictionaryId: dataDictionartRow.data_dictionary_id })) {
        functions[storedProcedureRow.stored_procedure_name!] = ({
          [AcDDStoredProcedure.KeyStoredProcedureName]: storedProcedureRow.stored_procedure_name,
          [AcDDStoredProcedure.KeyStoredProcedureCode]: storedProcedureRow.stored_procedure_code
        });
      }
      dataDictionary[AcDataDictionary.KeyFunctions] = storedProcedures;
    }
    return dataDictionary;
  }

}
