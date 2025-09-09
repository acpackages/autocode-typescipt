/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataDictionary, AcDDTable, AcDDTableColumn, AcEnumDDColumnType } from '@autocode-ts/ac-data-dictionary';
import { IAcDatagridColumnDefinition } from '@autocode-ts/ac-browser';
import { objectCopyTo } from '@autocode-ts/ac-extensions';
import { IAcDDColumnDefinition } from '../interfaces/ac-dd-column-definition.interface'

export class AcDDDatagridColumnManager {
  static columnResolver?: Function;
  private static typeColumnDefinition: Record<string, IAcDDColumnDefinition> = {
    [AcEnumDDColumnType.Blob]: { visible: false, allowSort: false },
    [AcEnumDDColumnType.Date]: { format: 'DISPLAY' },
    [AcEnumDDColumnType.Datetime]: { format: 'DISPLAY' },
    [AcEnumDDColumnType.Double]: { format: 'DISPLAY' },
    [AcEnumDDColumnType.Integer]: { format: 'INT' },
    [AcEnumDDColumnType.Json]: { visible: false, allowSort: false },
    [AcEnumDDColumnType.Password]: { visible: false, allowSort: false },
  };

  static getTableColumns({ tableName, excludeColumns, includeColumns, hiddenColumns, visibleColumns, columnDefinitions }: { tableName: string, excludeColumns?: string[], includeColumns?: string[], hiddenColumns?: string[], visibleColumns?: string[], columnDefinitions?: IAcDatagridColumnDefinition[] }):IAcDatagridColumnDefinition[] {
    if (columnDefinitions) {
      columnDefinitions = [];
    }
    const result: IAcDatagridColumnDefinition[] = [...columnDefinitions!];
    const ddTable: AcDDTable | null = AcDataDictionary.getTable({ tableName: tableName });
    if (ddTable) {
      for (const column of ddTable.tableColumns) {
        let continuOperation: boolean = true;
        if (excludeColumns && excludeColumns.length > 0 && excludeColumns.includes(column.columnName)) {
          continuOperation = false;
        }
        if (continuOperation && includeColumns && includeColumns.length > 0 && !includeColumns.includes(column.columnName)) {
          continuOperation = false;
        }
        if (continuOperation && result.findIndex((col) => { return col.field == column.columnName }) >= 0) {
          continuOperation = false;
        }
        if (continuOperation) {
          const columnDefinition: IAcDatagridColumnDefinition | undefined = this.getTableColumn({ tableName: ddTable.tableName, columnName: column.columnName });
          if (columnDefinition) {
            if (visibleColumns && visibleColumns.length > 0) {
              if (visibleColumns.includes(column.columnName)) {
                columnDefinition.visible = true;
              }
              else {
                columnDefinition.visible = false;
              }
            }
            if (hiddenColumns && hiddenColumns.length > 0) {
              if (hiddenColumns.includes(column.columnName)) {
                columnDefinition.visible = false;
              }
              else {
                columnDefinition.visible = true;
              }
            }
            result.push(columnDefinition);
          }
        }
      }
    }
    return result;
  }

  static getTableColumn({ tableName, columnName, skipResolver }: { tableName: string, columnName: string, skipResolver?: boolean }): IAcDatagridColumnDefinition | undefined {
    let result: IAcDatagridColumnDefinition | any = { field: columnName };
    const ddTableColumn: AcDDTableColumn | null = AcDataDictionary.getTableColumn({ tableName, columnName });
    if (ddTableColumn) {
      let resolvedDefinition: IAcDatagridColumnDefinition | undefined;
      if (this.columnResolver && skipResolver != true) {
        resolvedDefinition = this.columnResolver();
        objectCopyTo(resolvedDefinition, result);
      }
      if (resolvedDefinition == undefined) {
        result.title = ddTableColumn.getColumnTitle();
        if (this.typeColumnDefinition[ddTableColumn.columnType]) {
          const typeDefinition: any = AcDDDatagridColumnManager.typeColumnDefinition[ddTableColumn.columnType];
          const keys: string[] = Object.keys(typeDefinition);
          let excludeColumn: boolean = false;
          for (const key of keys) {
            if (key == "excludeColumn") {
              excludeColumn = typeDefinition.exclude == true;
            }
            else if (result[key] == undefined) {
              result[key] = typeDefinition[key];
            }
          }
          if (excludeColumn) {
            result = undefined;
          }
        }
      }
    }
    return result;
  }

  static registerColumnTypeInput({ columnType, columnDefinition }: { columnType: AcEnumDDColumnType, columnDefinition: IAcDatagridColumnDefinition }) {
    AcDDDatagridColumnManager.typeColumnDefinition[columnType] = columnDefinition;
  }
}
