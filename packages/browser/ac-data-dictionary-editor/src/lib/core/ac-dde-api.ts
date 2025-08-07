/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcEvents, AcHooks } from "@autocode-ts/autocode";
import { AcDDTableColumn, AcDDTable, AcDataDictionary, AcDDView, AcDDViewColumn, AcDDTrigger, AcDDRelationship, AcDDFunction, AcDDStoredProcedure } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDataStorage } from "../_ac-data-dictionary-editor.export";

export class AcDDEApi {
  dataStorage: AcDDEDataStorage = new AcDDEDataStorage();
  events: AcEvents = new AcEvents();
  hooks: AcHooks = new AcHooks();

  loadDataDictionaryJson({ dataDictionaryJson, dataDictionaryName }: { dataDictionaryName: string, dataDictionaryJson: any }) {
    const dataDictionaryId = this.dataStorage.addDataDictionary({ data_dictionary_name: dataDictionaryName });

    console.log(this);

    if (dataDictionaryJson[AcDataDictionary.KeyTables]) {
      for (const tableDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyTables]) as any[]) {
        const tableName = tableDetails[AcDDTable.KeyTableName];
        const tableColumns = tableDetails[AcDDTable.KeyTableColumns];
        const tableId = this.dataStorage.addTable({ data_dictionary_id: dataDictionaryId, table_name: tableName, table_properties: {} });

        for (const columnDetails of Object.values(tableColumns) as any[]) {
          const columnName = columnDetails[AcDDTableColumn.KeyColumnName];
          const columnProperties = columnDetails[AcDDTableColumn.KeyColumnProperties];
          const columnType = columnDetails[AcDDTableColumn.KeyColumnType];
          this.dataStorage.addTableColumn({ data_dictionary_id: dataDictionaryId, table_id: tableId, column_name: columnName, column_type: columnType, column_properties: columnProperties });
        }
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyViews]) {
      for (const viewDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyViews]) as any[]) {
        const viewName = viewDetails[AcDDView.KeyViewName];
        const viewQuery = viewDetails[AcDDView.KeyViewQuery];
        const viewColumns = viewDetails[AcDDView.KeyViewColumns];
        const viewId = this.dataStorage.addView({ data_dictionary_id: dataDictionaryId, view_name: viewName, view_query: viewQuery });
        if (viewColumns) {
          for (const columnDetails of Object.values(viewColumns) as any[]) {
            const columnName = columnDetails[AcDDViewColumn.KeyColumnName];
            const columnProperties = columnDetails[AcDDViewColumn.KeyColumnProperties];
            const columnType = columnDetails[AcDDViewColumn.KeyColumnType];
            this.dataStorage.addViewColumn({ data_dictionary_id: dataDictionaryId, view_id: viewId, column_name: columnName, column_type: columnType, column_properties: columnProperties, column_source: '', column_source_name: '' });
          }
        }

      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyTriggers]) {
      for (const triggerDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyTriggers]) as any[]) {
        const triggerId = this.dataStorage.addTrigger({
          data_dictionary_id: dataDictionaryId,
          trigger_name: triggerDetails[AcDDTrigger.KeyTriggerName],
          row_operation: triggerDetails[AcDDTrigger.KeyRowOperation],
          table_id: this.dataStorage.getTable({ tableName: triggerDetails[AcDDTrigger.KeyTableName], dataDictionaryId: dataDictionaryId })!.table_id,
          trigger_code: triggerDetails[AcDDTrigger.KeyTriggerCode],
          trigger_execution: triggerDetails[AcDDTrigger.KeyTriggerExecution]
        });
      }
    }

    if (dataDictionaryJson[AcDataDictionary.KeyRelationships]) {
      for (const relationshipDetails of Object.values(dataDictionaryJson[AcDataDictionary.KeyRelationships]) as any[]) {
        console.log(relationshipDetails);
        const destinationTable = this.dataStorage.getTable({ tableName: relationshipDetails[AcDDRelationship.KeyDestinationTable], dataDictionaryId: dataDictionaryId });
        const sourceTable = this.dataStorage.getTable({ tableName: relationshipDetails[AcDDRelationship.KeySourceTable], dataDictionaryId: dataDictionaryId });
        if (sourceTable && destinationTable) {
          const sourceTableId = sourceTable.table_id;
          const destinationTableId = destinationTable.data_dictionary_id;
          const relationshipId = this.dataStorage.addRelationship({
            data_dictionary_id: dataDictionaryId,
            source_table_id: sourceTableId,
            source_column_id: this.dataStorage.getTableColumn({ columnName: relationshipDetails[AcDDRelationship.KeySourceColumn], dataDictionaryId: dataDictionaryId, tableId: sourceTableId })!.column_id,
            destination_column_id: this.dataStorage.getTableColumn({ columnName: relationshipDetails[AcDDRelationship.KeyDestinationColumn], dataDictionaryId: dataDictionaryId, tableId: destinationTableId })!.column_id,
            destination_table_id: destinationTableId,
            cascade_delete_destination: relationshipDetails[AcDDRelationship.KeyCascadeDeleteDestination],
            cascade_delete_source: relationshipDetails[AcDDRelationship.KeyCascadeDeleteSource]
          });
        }

      }
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
  }
}
