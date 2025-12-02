/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDatagridCellElement } from "../elements/ac-datagrid-cell.element";
import { AcDatagridRow } from "./ac-datagrid-row.model";
import { AcDatagridColumn } from "./ac-datagrid-column.model";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AC_DATAGRID_ATTRIBUTE } from "../consts/ac-datagrid-attribute.const";

export class AcDatagridCell {
  private _isActive: boolean = false;
  get isActive(): boolean {
    return this._isActive;
  }
  set isActive(value: boolean) {
    if (value != this._isActive) {
      this._isActive = value;
      if (this.element) {
        if (value) {
          this.element.setAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridCellActive, 'true');
        }
        else {
          this.element.removeAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridCellActive);
        }
        void this.element.offsetHeight;
      }
    }
  }

  cellId: string = Autocode.uuid();
  datagridApi!: AcDatagridApi;
  datagridRow!: AcDatagridRow;
  datagridColumn!: AcDatagridColumn;
  events: AcEvents = new AcEvents();
  extensionData: Record<string, any> = {};
  isPinnedLeft: boolean = false;
  isPinnedRight: boolean = false;
  element?: AcDatagridCellElement;
  rowIndex: number = -1;
  columnIndex: number = -1;

  get columnId(): string {
    return this.datagridColumn.columnId;
  }
  get columnKey(): string {
    return this.datagridColumn.columnKey;
  }
  get rowId(): string {
    return this.datagridRow.rowId;
  }

  get cellValue(): any {
    return this.datagridRow.data[this.columnKey];
  }
  set cellValue(value: any) {
    const oldValue = this.cellValue;
    if (oldValue != value) {
      this.datagridRow.data[this.columnKey] = value;
      this.datagridApi.eventHandler.handleCellValueChange({ datagridCell: this });
      if(this.element){
        this.element.refresh();
      }
    }
  }

  constructor({ datagridApi, datagridColumn, datagridRow, element }:
    { datagridApi: AcDatagridApi, datagridColumn: AcDatagridColumn, datagridRow: AcDatagridRow, element?: AcDatagridCellElement }) {
    this.datagridApi = datagridApi;
    this.datagridColumn = datagridColumn;
    this.datagridRow = datagridRow;
    this.columnIndex = datagridColumn.index;
    this.rowIndex = datagridRow.index;
    this.datagridRow.datagridCells.push(this);
    this.element = element;
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }
}
