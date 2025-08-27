/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridRowElement } from "../elements/ac-datagrid-row.element";
import { AcDatagridCell } from "./ac-datagrid-cell.model";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridColumn } from "./ac-datagrid-column.model";

export class AcDatagridRow {
  acRowId: string = Autocode.uuid();
  data: any;
  datagridApi!: AcDatagridApi;
  events: AcEvents = new AcEvents();
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

  getCellForColumn({datagridColumn,createIfNotFound=false}:{datagridColumn:AcDatagridColumn,createIfNotFound?:boolean}):AcDatagridCell|undefined{
    let cell:AcDatagridCell|undefined = this.datagridCells.find((cell)=>{
      return cell.acColumnId == datagridColumn.acColumnId;
    });
    if(cell == undefined && createIfNotFound){
      cell = new AcDatagridCell({datagridApi:this.datagridApi,datagridColumn:datagridColumn,datagridRow:this});
      this.datagridCells.push(cell);
    }
    return cell;
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event,callback});
  }
}
