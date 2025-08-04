import { AcDatagridApi, AcDatagridCell, AcDatagridColumn, AcDatagridRow, AcEnumDatagridEvent, IAcDatagridCellRendererElement, IAcDatagridCellRendererElementInitEvent } from "@autocode-ts/ac-browser";
import { AgPromise, ColDef, Column, GridApi, ICellRenderer, ICellRendererComp, ICellRendererParams, IRowNode } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class AcDatagridOnAgGridCellRendererElement implements ICellRendererComp {
  datagridApi!: AcDatagridApi;
  datagridCell!: AcDatagridCell;
  datagridColumn!: AcDatagridColumn;
  datagridRow!: AcDatagridRow;
  agGridExtension!: AcDatagridOnAgGridExtension;
  instance!: IAcDatagridCellRendererElement;
  params:any;

  constructor() {
    // console.log(this);
  }

  getGui(): HTMLElement {
    return this.instance.getElement();
  }
  destroy?(): void {
    if (this.instance.destroy) {
      this.instance.destroy();
    }
  }
  init?(params: any): AgPromise<void> | void {
    this.params = params;
    this.agGridExtension = params.agGridExtension;
    this.datagridColumn = params.datagridColumn;
    this.datagridApi = params.datagridApi;
    this.datagridRow = this.datagridApi.getRowById({ rowId: params.data[this.agGridExtension.rowKey] })!;
    this.instance = new this.datagridColumn.colDef.cellRendererElement();
    this.instance.init({
      datagridApi: this.datagridApi,
      datagridCell: new AcDatagridCell({
        datagridColumn: this.datagridColumn,
        datagridRow: this.datagridRow
      })
    });
    const elementInitEventArgs: IAcDatagridCellRendererElementInitEvent = {
      datagridApi: this.datagridApi,
      datagridCell: this.datagridCell,
      cellRendererElementInstance: this.instance,
    }
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellRendererElementInit, args: elementInitEventArgs });
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {

    return false;
  }
}
