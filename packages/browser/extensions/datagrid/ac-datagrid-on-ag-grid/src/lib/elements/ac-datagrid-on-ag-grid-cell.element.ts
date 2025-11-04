/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, AcDatagridCell, AcDatagridCellElement, AcDatagridColumn, AcDatagridRow, IAcDatagridCellRenderer } from "@autocode-ts/ac-browser";
import { AgPromise, ICellRendererComp, ICellRendererParams } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class AcDatagridOnAgGridCell implements ICellRendererComp {
  datagridApi!: AcDatagridApi;
  datagridCell?: AcDatagridCell;
  datagridColumn?: AcDatagridColumn;
  datagridRow?: AcDatagridRow;
  agGridExtension!: AcDatagridOnAgGridExtension;
  instance!: IAcDatagridCellRenderer;
  params: any;
  defaultElement = document.createElement('div');

  constructor() {
    this.defaultElement.style.display = "contents";
  }

  getGui(): HTMLElement {
    return this.defaultElement;
  }

  init?(params: ICellRendererParams | any): AgPromise<void> | void {
    this.params = params;
    this.defaultElement.innerHTML = "";
    if (this.datagridCell == undefined) {
      this.agGridExtension = params.agGridExtension;
      this.datagridColumn = params.datagridColumn;
      this.datagridApi = params.datagridApi;
      this.datagridRow = this.datagridApi.getRowById({ rowId: params.data[this.agGridExtension.rowKey] });
      if (this.datagridRow && this.datagridColumn) {
        let datagridCell: any = this.datagridRow.getCellForColumn({ datagridColumn: this.datagridColumn });
        if (datagridCell == undefined) {
          const cellElement = new AcDatagridCellElement({ datagridApi: this.datagridApi, datagridRow: this.datagridRow, datagridColumn: this.datagridColumn });
          datagridCell = cellElement.datagridCell;
        }
        if (datagridCell) {
          this.datagridCell = datagridCell;
          this.defaultElement.append(this.datagridCell!.instance!.element);
          this.params.eGridCell.addEventListener('focusin', () => { this.datagridCell!.instance!.focus(); });
          this.params.eGridCell.addEventListener('focusout', () => { this.datagridCell!.instance!.blur(); });
        }
        else {
          console.warn(`Datagrid Cell Not Found`);
        }
      }
      else {
        console.warn(`Datagrid Row and Datagrid Column Not Found`);
      }
    }
    else {
      this.defaultElement.append(this.datagridCell!.instance!.element);
    }
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    return false;
  }
}
