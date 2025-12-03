/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, IAcDatagridCell, AcDatagridCellElement, IAcDatagridColumn, AcDatagridRow, IAcDatagridCellRenderer } from "@autocode-ts/ac-browser";
import { AgPromise, ICellRendererComp, ICellRendererParams } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class PlaceholderRenderer implements ICellRendererComp {
  private eGui!: HTMLDivElement;

  init(params: ICellRendererParams|any): void {
    this.eGui = document.createElement('div');
    const agGridExtension = params.agGridExtension;
    const rowId = params.data[agGridExtension.rowKey];
    // this.eGui.innerHTML = ;
    this.eGui.dataset["rowId"] = rowId;
  }

  getGui(): HTMLElement {
    return this.eGui;
  }

  refresh(): boolean {
    return true; // no re-creation needed
  }
}
