/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDDEApi, AcDDEDataStorage, IAcDDERelationship, IAcDDETableColumn } from "../../../_ac-data-dictionary-editor.export";
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
          dataDictionaryId:result.dataDictionaryId,
          sourceColumnId:relationship.sourceColumnId,
          sourceTableId:relationship.sourceTableId,
          destinationColumnId:relationship.destinationColumnId,
          destinationTableId:relationship.destinationTableId,
        }));
      }
    }
  }

  identifyRelationships():IAcIdentifiedResult{
    const activeDataDictionaryId = this.editorApi.activeDataDictionary?.dataDictionaryId;
    const identifiedRelationships: IAcIdentifiedRelationship[] = [];
    const primaryKeyColumns: Record<string, IAcRepeatingColumn> = {};
    const conflictingColumns: Record<string, IAcConflictingRelationshipColumn> = {};
    for (const column of this.dataStorage.getTableColumns({
      filter: (row: IAcDDETableColumn) => {
        return row.primaryKey == true && row.dataDictionaryId == activeDataDictionaryId;
      }
    })) {
      const columnName = column.columnName;
      if (columnName) {
        const identifiedPrimaryKey: IAcTableColumn = {
          columnId: column.columnId,
          columnName: columnName,
          tableId: column.tableId
        };
        const tableRows = this.dataStorage.getTables({ tableId: column.tableId });
        if (tableRows.length > 0) {
          identifiedPrimaryKey.tableName = tableRows[0].tableName;
        }
        if (primaryKeyColumns[columnName] == undefined) {
          primaryKeyColumns[columnName] = {
            columnName: columnName,
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
        filter: (row: IAcDDETableColumn) => {
          return row.primaryKey != true && row.dataDictionaryId == activeDataDictionaryId && row.columnName == columnName;
        }
      });
      const destinationColumns: IAcTableColumn[] = [];
      for (const column of destinationColumnRows) {
        const destinationColumn: IAcTableColumn = {
          columnId: column.columnId,
          columnName: column.columnName,
          tableId: column.tableId
        };
        const tableRows = this.dataStorage.getTables({ tableId: column.tableId });
        if (tableRows.length > 0) {
          destinationColumn.tableName = tableRows[0].tableName;
        }
        destinationColumns.push(destinationColumn);
      }
      if (sourceColumns.tables.length > 1) {
        const conflictingColumn: IAcConflictingRelationshipColumn = {
          columnName: columnName,
          destinationColumns: sourceColumns.tables,
          sourceColumns: destinationColumns
        }
        conflictingColumns[columnName] = conflictingColumn;
      }
      else {
        const sourceColumn: IAcTableColumn = sourceColumns.tables[0];
        for (const destinationColumn of destinationColumns) {
          const existingRelationships = this.dataStorage.getRelationships({
            filter: (row: IAcDDERelationship) => {
              return row.destinationColumnId != destinationColumn.columnId && row.destinationTableId == destinationColumn.tableId && row.sourceColumnId != sourceColumn.columnId && row.sourceTableId == sourceColumn.tableId;
            }
          });
          if(existingRelationships.length == 0){
            identifiedRelationships.push({
              destinationColumnId: destinationColumn.columnId,
              destinationColumnName: destinationColumn.columnName,
              destinationTableId: destinationColumn.tableId,
              destinationTableName: destinationColumn.tableName,
              sourceColumnId: sourceColumn.columnId,
              sourceColumnName: sourceColumn.columnName,
              sourceTableId: sourceColumn.tableId,
              sourceTableName: sourceColumn.tableName
            });
          }

        }
      }
    }
    return {conflictingColumns:Object.values(conflictingColumns),relationships:identifiedRelationships,dataDictionaryId:activeDataDictionaryId!};
  }
}
