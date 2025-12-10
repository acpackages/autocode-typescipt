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
  element: HTMLInputElement = document.createElement('input');
  private isFocused: boolean = false;

  handleBlur: Function = () => {
    this.isFocused = false;
    const cellValue = this.getValue();
    setTimeout(() => {
      if (!this.isFocused) {
        if (this.datagridRow && this.datagridColumn && this.datagridApi) {
          if (this.datagridColumn.columnDefinition.useCellEditorForRenderer) {
            if (this.datagridRow.data[this.datagridColumn.columnKey] != cellValue) {
              this.datagridRow.data[this.datagridColumn.columnKey] = cellValue;
              this.datagridApi.eventHandler.handleCellValueChange({ datagridCell:this.datagridCell!});
              this.refresh(this.params);
            }
          }
        }
      }
    }, 10);
  };

  handleFocus: Function = () => {
    this.isFocused = true;
    if (this.datagridRow && this.datagridColumn && this.datagridApi) {
      this.element.value = this.datagridRow.data[this.datagridColumn.columnKey];
    }
    this.element.focus();
  };

  getValue() {
    return this.element.value;
  }

  focusIn?(): void {
    return this.element.focus();
  }

  destroy(): void {
    (this.datagridApi as any) = null;
    if (this.params) {
      this.params.eGridCell.removeEventListener('focusout', this.handleBlur);
      this.params.eGridCell.removeEventListener('focusin', this.handleFocus);
    }
    if (this.datagridCell && this.datagridCell.element) {
      if (this.datagridCell.element.destroy != undefined) {
        this.datagridCell.element.destroy();
      }
      this.datagridCell.element.remove();
    }
  }

  getGui(): HTMLElement {
    return this.element;
  }

  init?(params: ICellRendererParams | any): AgPromise<void> | void {
    requestAnimationFrame(() => {
      this.params = params;
      this.agGridExtension = params.agGridExtension;
      this.datagridColumn = params.datagridColumn;
      this.datagridApi = params.datagridApi;
      this.datagridRow = this.datagridApi!.getRow({ rowId: params.data[this.agGridExtension!.rowKey] });
      if (this.datagridRow && this.datagridColumn) {
        this.datagridCell = this.datagridApi?.getCell({ row: this.datagridRow, column: this.datagridColumn });
        if (this.datagridCell) {
          const columnDefinition = this.datagridColumn.columnDefinition;
          if (columnDefinition.cellEditorElement) {
            const editor = new columnDefinition.cellEditorElement();
            const initArgs: IAcDatagridCellElementArgs = {
              datagridApi: this.datagridApi!,
              datagridCell: this.datagridCell!
            };
            editor.init(initArgs);
            const element = editor.getElement();
            if (this.element) {
              this.element.replaceWith(element);
            }
            this.element = element;
            if (!this.datagridColumn.columnDefinition.useCellEditorForRenderer) {
              this.element.focus();
            }
          }
          else {
            const element = this.datagridApi?.datagrid.ownerDocument.createElement('input') as HTMLElement;
            if (this.element) {
              this.element.replaceWith(element);
            }
            this.element.value = this.datagridRow.data[this.datagridColumn.columnKey];
            if (!this.datagridColumn.columnDefinition.useCellEditorForRenderer) {
              this.element.focus();
            }
          }
        }
        this.params.eGridCell.addEventListener('focusin', this.handleFocus);
        this.params.eGridCell.addEventListener('focusout', this.handleBlur);
      }
      else {
        console.warn(`Datagrid Row and Datagrid Column Not Found`);
      }
    });
  }

  refresh(params: ICellEditorParams<any, any, any>): boolean {
    this.init!(params);
    return true;
  }
}
