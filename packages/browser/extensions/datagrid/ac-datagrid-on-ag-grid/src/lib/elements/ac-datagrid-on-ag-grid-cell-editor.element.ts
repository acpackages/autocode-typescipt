/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, IAcDatagridCell, IAcDatagridColumn, IAcDatagridCellRenderer, IAcDatagridRow, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";
import { AgPromise, ICellEditorComp, ICellEditorParams, ICellRendererParams } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class AcDatagridOnAgGridCellEditor implements ICellEditorComp {
  datagridApi?: AcDatagridApi;
  datagridCell?: IAcDatagridCell;
  datagridColumn?: IAcDatagridColumn;
  datagridRow?: IAcDatagridRow;
  agGridExtension?: AcDatagridOnAgGridExtension;
  instance?: IAcDatagridCellRenderer;
  params: any;
  defaultElement = document.createElement('input');
  private isFocused: boolean = false;

  handleBlur: Function = () => {
    if (this.datagridCell && this.datagridCell.element) {
      this.datagridCell.element.blur();
    }
    setTimeout(() => {
      this.isFocused = false;
    }, 50);
  };

  handleFocus: Function = () => {

    if (!this.isFocused) {
      this.isFocused = true;
      if (this.datagridCell && this.datagridCell.element) {
        this.datagridCell.element.focus();
      }
    }
  };

  getValue() {
    return this.defaultElement.value;
  }

  focusIn?(): void {
    return this.defaultElement.focus();
  }

  destroy(): void {
    if (this.params) {
      this.params.eGridCell.removeEventListener('focusout', this.handleBlur);
      this.params.eGridCell.removeEventListener('focusin', this.handleFocus);
    }
    (this.datagridApi as any) = null;
    if (this.datagridCell && this.datagridCell.element) {
      if (this.datagridCell.element.destroy != undefined) {
        this.datagridCell.element.destroy();
      }
      this.datagridCell.element.remove();
    }
    this.defaultElement.remove();
  }

  getGui(): HTMLElement {
    return this.defaultElement;
  }

  init?(params: ICellRendererParams | any): AgPromise<void> | void {
    requestAnimationFrame(() => {
      this.params = params;
      this.params.eGridCell.addEventListener('focusin', this.handleFocus);
      this.params.eGridCell.addEventListener('focusout', this.handleBlur);
      this.agGridExtension = params.agGridExtension;
      this.datagridColumn = params.datagridColumn;
      this.datagridApi = params.datagridApi;
      this.datagridRow = this.datagridApi!.getRow({ rowId: params.data[this.agGridExtension!.rowKey] });
      if (this.datagridRow && this.datagridColumn) {
        this.datagridCell = this.datagridApi?.getCell({ row: this.datagridRow, column: this.datagridColumn });
        if (this.datagridCell) {
          const columnDefinition = this.datagridColumn.columnDefinition;
          if (columnDefinition.cellEditorElement) {
            const element = new columnDefinition.cellEditorElement();
            const initArgs: IAcDatagridCellElementArgs = {
              datagridApi: this.datagridApi!,
              datagridCell: this.datagridCell!
            };
            element.init(initArgs);
            this.defaultElement.replaceWith(element.getElement());
            element.value = this.datagridRow.data[this.datagridColumn.columnKey];
          }
          else{
            this.defaultElement.value = this.datagridRow.data[this.datagridColumn.columnKey];
          }
        }

      }
      else {
        console.warn(`Datagrid Row and Datagrid Column Not Found`);
      }
    });
  }

  refresh(params: ICellEditorParams<any, any, any>): boolean {
    return false;
  }
}
