/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDDEApi, AcDDEDataStorage, IAcDDERelationshipRow, IAcDDETableColumnRow } from "../../../_ac-data-dictionary-editor.export";
import { IAcConflictingRelationshipColumn } from "../interfaces/ac-conflicting-relationship-column.interface";
import { IAcIdentifiedResult } from "../interfaces/ac-identification-result.interface";
import { IAcIdentifiedRelationship } from "../interfaces/ac-identified-relationship.interface";
import { IAcRepeatingColumn } from "../interfaces/ac-repeating-column.interface";
import { IAcTableColumn } from "../interfaces/ac-table-column.interface";
import { AcDDERelationshipsDetectorExtension } from "./ac-dde-relationships-detector-extension";

export class AcDDERelationshipsDetector {
  extension: AcDDERelationshipsDetectorExtension;
  editorApi: AcDDEApi;
  dataStorage: AcDDEDataStorage;

  constructor({ extension }: { extension: AcDDERelationshipsDetectorExtension }) {
    this.extension = extension;
    this.editorApi = extension.editorApi;
    this.dataStorage = this.editorApi.dataStorage;
  }

  createRelationshipFromResult({result}:{result:IAcIdentifiedResult}){
    if(result.relationships){
      for(const relationship of result.relationships){
        console.log(this.dataStorage.addRelationship({
          data_dictionary_id:result.data_dictionary_id,
          source_column_id:relationship.source_column_id,
          source_table_id:relationship.source_table_id,
          destination_column_id:relationship.destination_column_id,
          destination_table_id:relationship.destination_table_id,
        }));
      }
    }
  }

  identifyRelationships():IAcIdentifiedResult{
    const activeDataDictionaryId = this.editorApi.activeDataDictionary?.data_dictionary_id;
    const identifiedRelationships: IAcIdentifiedRelationship[] = [];
    const primaryKeyColumns: Record<string, IAcRepeatingColumn> = {};
    const conflictingColumns: Record<string, IAcConflictingRelationshipColumn> = {};
    for (const column of this.dataStorage.getTableColumns({
      filter: (row: IAcDDETableColumnRow) => {
        return row.primary_key == true && row.data_dictionary_id == activeDataDictionaryId;
      }
    })) {
      const columnName = column.column_name;
      if (columnName) {
        const identifiedPrimaryKey: IAcTableColumn = {
          column_id: column.column_id,
          column_name: columnName,
          table_id: column.table_id
        };
        const tableRows = this.dataStorage.getTables({ tableId: column.table_id });
        if (tableRows.length > 0) {
          identifiedPrimaryKey.table_name = tableRows[0].table_name;
        }
        if (primaryKeyColumns[columnName] == undefined) {
          primaryKeyColumns[columnName] = {
            column_name: columnName,
            tables: [
              identifiedPrimaryKey
            ]
          };
        }
        else {
          primaryKeyColumns[columnName].tables.push(identifiedPrimaryKey);
        }
      }
    }
    for (const columnName of Object.keys(primaryKeyColumns)) {
      const sourceColumns = primaryKeyColumns[columnName];
      const destinationColumnRows = this.dataStorage.getTableColumns({
        filter: (row: IAcDDETableColumnRow) => {
          return row.primary_key != true && row.data_dictionary_id == activeDataDictionaryId && row.column_name == columnName;
        }
      });
      const destinationColumns: IAcTableColumn[] = [];
      for (const column of destinationColumnRows) {
        const destinationColumn: IAcTableColumn = {
          column_id: column.column_id,
          column_name: column.column_name,
          table_id: column.table_id
        };
        const tableRows = this.dataStorage.getTables({ tableId: column.table_id });
        if (tableRows.length > 0) {
          destinationColumn.table_name = tableRows[0].table_name;
        }
        destinationColumns.push(destinationColumn);
      }
      if (sourceColumns.tables.length > 1) {
        const conflictingColumn: IAcConflictingRelationshipColumn = {
          column_name: columnName,
          destination_columns: sourceColumns.tables,
          source_columns: destinationColumns
        }
        conflictingColumns[columnName] = conflictingColumn;
      }
      else {
        const sourceColumn: IAcTableColumn = sourceColumns.tables[0];
        for (const destinationColumn of destinationColumns) {
          const existingRelationships = this.dataStorage.getRelationships({
            filter: (row: IAcDDERelationshipRow) => {
              return row.destination_column_id != destinationColumn.column_id && row.destination_table_id == destinationColumn.table_id && row.source_column_id != sourceColumn.column_id && row.source_table_id == sourceColumn.table_id;
            }
          });
          if(existingRelationships.length == 0){
            identifiedRelationships.push({
              destination_column_id: destinationColumn.column_id,
              destination_column_name: destinationColumn.column_name,
              destination_table_id: destinationColumn.table_id,
              destination_table_name: destinationColumn.table_name,
              source_column_id: sourceColumn.column_id,
              source_column_name: sourceColumn.column_name,
              source_table_id: sourceColumn.table_id,
              source_table_name: sourceColumn.table_name
            });
          }

        }
      }
    }
    return {conflicting_columns:Object.values(conflictingColumns),relationships:identifiedRelationships,data_dictionary_id:activeDataDictionaryId!};
  }
}
