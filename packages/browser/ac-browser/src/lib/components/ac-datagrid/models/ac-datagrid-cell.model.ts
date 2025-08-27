/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridCellElement } from "../elements/ac-datagrid-cell.element";
import { AcDatagridRow } from "./ac-datagrid-row.model";
import { AcDatagridColumn } from "./ac-datagrid-column.model";
import { AcDatagridApi } from "../core/ac-datagrid-api";

export class AcDatagridCell {
  acCellId: string = Autocode.uuid();
  datagridApi!: AcDatagridApi;
  datagridRow!: AcDatagridRow;
  datagridColumn!: AcDatagridColumn;
  events: AcEvents = new AcEvents();
  extensionData: Record<string, any> = {};
  isFocused:boolean = false;
  hooks: AcHooks = new AcHooks();
  instance?: AcDatagridCellElement;

  get acColumnId(): string {
    return this.datagridColumn.acColumnId;
  }
  get columnKey(): string {
    return this.datagridColumn.columnKey;
  }
  get acRowId(): string {
    return this.datagridRow.acRowId;
  }

  get cellValue(): any {
    return this.datagridRow.data[this.columnKey];
  }
  set cellValue(value:any) {
    const oldValue = this.cellValue;
    if(oldValue != value){
      this.datagridRow.data[this.columnKey] = value;
      this.datagridApi.eventHandler.handleCellValueChange({datagridCell:this});
    }
  }

  constructor({ datagridApi,datagridColumn, datagridRow, instance }:
    { datagridApi:AcDatagridApi,datagridColumn: AcDatagridColumn, datagridRow: AcDatagridRow, instance?: AcDatagridCellElement }) {
    this.datagridApi = datagridApi;
    this.datagridColumn = datagridColumn;
    this.datagridRow = datagridRow;
    this.datagridRow.datagridCells.push(this);
    this.instance = instance;
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event,callback});
  }
}
