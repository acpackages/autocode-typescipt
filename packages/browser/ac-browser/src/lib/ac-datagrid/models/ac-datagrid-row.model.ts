/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridRowElement } from "../elements/ac-datagrid-row.element";
import { AcDatagridCell } from "./ac-datagrid-cell.model";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridColumn } from "./ac-datagrid-column.model";

export class AcDatagridRow {
  acRowId: string = Autocode.uuid();
  data: any;
  datagridApi!: AcDatagridApi;
  extensionData: Record<string, any> = {};
  hooks: AcHooks = new AcHooks();
  index: number = -1;
  displayIndex:number = -1;
  instance?: AcDatagridRowElement;
  datagridCells: AcDatagridCell[] = [];

  get isFirst(): boolean {
    return this.displayIndex == 0;
  }

  get isLast(): boolean {
    return this.displayIndex == this.datagridApi.displayedDatagridRows.length - 1;
  }

  constructor({ data = {},datagridApi, index = -1 }: { data?: any,datagridApi:AcDatagridApi, index?: number }) {
    this.data = data;
    this.datagridApi = datagridApi;
    this.index = index;
  }

  getCellForColumn({datagridColumn}:{datagridColumn:AcDatagridColumn}):AcDatagridCell|undefined{
    let cell:AcDatagridCell|undefined;
    for(const existingCell of this.datagridCells){
      if(existingCell.datagridColumn.acColumnId == datagridColumn.acColumnId){
        cell = existingCell;
        break;
      }
    }
    if(cell == undefined){
      cell = new AcDatagridCell({datagridApi:this.datagridApi,datagridColumn:datagridColumn,datagridRow:this});
      this.datagridCells.push(cell);
    }
    return cell;
  }
}
