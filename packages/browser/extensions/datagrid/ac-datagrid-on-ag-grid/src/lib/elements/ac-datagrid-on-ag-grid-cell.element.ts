/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, IAcDatagridCell, AcDatagridCellElement, IAcDatagridColumn, AcDatagridRow, IAcDatagridCellRenderer, IAcDatagridRow } from "@autocode-ts/ac-browser";
import { AgPromise, ICellRendererComp, ICellRendererParams } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class AcDatagridOnAgGridCell implements ICellRendererComp {
  datagridApi?: AcDatagridApi;
  datagridCell?: IAcDatagridCell;
  datagridColumn?: IAcDatagridColumn;
  datagridRow?: IAcDatagridRow;
  agGridExtension?: AcDatagridOnAgGridExtension;
  instance?: IAcDatagridCellRenderer;
  params: any;
  defaultElement = document.createElement('div');

  constructor() {
    this.defaultElement.style.display = "contents";
  }

  destroy(): void {
    (this.datagridApi as any) = null;
    if(this.datagridCell && this.datagridCell.element){
      this.datagridCell.element?.destroy();
    }
    (this.datagridCell as any) = null;
    (this.datagridColumn as any) = null;
    (this.datagridRow as any) = null;
    (this.agGridExtension as any) = null;
    (this.instance as any) = null;
    (this.agGridExtension as any) = null;
  }

  getGui(): HTMLElement {
    return this.defaultElement;
  }

  init?(params: ICellRendererParams | any): AgPromise<void> | void {
    this.params = params;
    this.defaultElement.innerHTML = "";
      this.agGridExtension = params.agGridExtension;
      this.datagridColumn = params.datagridColumn;
      this.datagridApi = params.datagridApi;
      this.datagridRow = this.datagridApi!.getRowById({ rowId: params.data[this.agGridExtension!.rowKey] });
      if (this.datagridRow && this.datagridColumn) {
        const datagridCell: any = {
          datagridColumn:this.datagridColumn,
          datagridRow:this.datagridRow
        };
        const cellElement = new AcDatagridCellElement();
          datagridCell.datagridApi = params.datagridApi;
          cellElement.datagridColumn = this.datagridColumn;
          cellElement.datagridRow = this.datagridRow;
          cellElement.datagridApi = this.datagridApi!;
          datagridCell.element = cellElement;
          this.datagridCell = datagridCell;
          this.defaultElement.append(this.datagridCell!.element!);
          this.params.eGridCell.addEventListener('focusin', () => { this.datagridCell!.element!.focus(); });
          this.params.eGridCell.addEventListener('focusout', () => { this.datagridCell!.element!.blur(); });
      }
      else {
        console.warn(`Datagrid Row and Datagrid Column Not Found`);
      }
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }
}
