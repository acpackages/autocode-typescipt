/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDataRow } from "@autocode-ts/autocode";
import { AcDatagridRowElement } from "../elements/ac-datagrid-row.element";
import { AcDatagridCell } from "./ac-datagrid-cell.model";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridColumn } from "./ac-datagrid-column.model";
import { AC_DATAGRID_ATTRIBUTE } from "../consts/ac-datagrid-attribute.const";

export class AcDatagridRow extends AcDataRow {
  private _isActive:boolean = false;
    get isActive():boolean{
      return this._isActive;
    }
    set isActive(value:boolean){
      if(value!=this._isActive){
        this._isActive = value;
        if(this.element){
          if(value){
            this.element.setAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridRowActive, 'true');
          }
          else{
            this.element.removeAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridRowActive);
          }
        }
      }
    }

  datagridApi!: AcDatagridApi;
  element?: AcDatagridRowElement;
  datagridCells: AcDatagridCell[] = [];

  getColumnCell({ index,key }: { index?: number,key?:string }): AcDatagridCell | undefined {
    const cell: AcDatagridCell | undefined = this.datagridCells.find((cell) => {
      let result:boolean  = false;
      if(index!=undefined){
        result = cell.columnIndex == index;
      }
      else if(key !=undefined){
        result = cell.columnKey == key;
      }
      return result;
    });
    return cell;
  }

  getCellForColumn({ datagridColumn, createIfNotFound = false }: { datagridColumn: AcDatagridColumn, createIfNotFound?: boolean }): AcDatagridCell | undefined {
    let cell: AcDatagridCell | undefined = this.datagridCells.find((cell) => {
      return cell.columnId == datagridColumn.columnId;
    });
    if (cell == undefined && createIfNotFound) {
      // cell = new AcDatagridCell({ datagridApi: this.datagridApi, datagridColumn: datagridColumn, datagridRow: this });
      // this.datagridCells.push(cell);
    }
    return cell;
  }

  getFirstColumn():AcDatagridColumn | undefined {
    let result:AcDatagridColumn | undefined;
    for (const cell of this.datagridCells) {
      const column = cell.datagridColumn;
      if (column.isFirst) {
        result = column;
      }
    }
    return result;
  }

  getLastColumn():AcDatagridColumn | undefined {
    let result: AcDatagridColumn | undefined;
    for (const cell of this.datagridCells) {
      const column = cell.datagridColumn;
      if (column.isLast) {
        result = column;
      }
    }
    return result;
  }

}
