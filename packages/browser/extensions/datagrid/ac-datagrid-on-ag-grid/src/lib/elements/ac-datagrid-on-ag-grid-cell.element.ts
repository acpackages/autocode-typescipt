/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, AcDatagridCell, AcDatagridCellElement, AcDatagridColumn, AcDatagridRow, IAcDatagridCellRendererElement } from "@autocode-ts/ac-browser";
import { AgPromise, ICellRendererComp, ICellRendererParams } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class AcDatagridOnAgGridCell implements ICellRendererComp {
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
    return this.datagridCell.instance!.element;
  }

  destroy?(): void {
    if (this.datagridCell) {
      // this.datagridCell.destroy();
    }
  }
  init?(params: ICellRendererParams|any): AgPromise<void> | void {
    this.params = params;
    this.agGridExtension = params.agGridExtension;
    this.datagridColumn = params.datagridColumn;
    this.datagridApi = params.datagridApi;
    this.datagridRow = this.datagridApi.getRowById({ rowId: params.data[this.agGridExtension.rowKey] })!;
    let datagridCell:any = this.datagridRow.getCellForColumn({datagridColumn:this.datagridColumn});
    if(datagridCell == undefined){
      const cellElement = new AcDatagridCellElement({ datagridApi: this.datagridApi, datagridRow: this.datagridRow, datagridColumn: this.datagridColumn });
      datagridCell = cellElement.datagridCell;
    }
    this.datagridCell = datagridCell;
    this.params.eGridCell.addEventListener('focusin',()=>{this.datagridCell.instance!.focus();});
    this.params.eGridCell.addEventListener('focusout',()=>{this.datagridCell.instance!.blur();});
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {

    return false;
  }
}
