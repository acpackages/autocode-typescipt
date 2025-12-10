/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, IAcDatagridCell, IAcDatagridColumn, IAcDatagridCellRenderer, IAcDatagridRow, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";
import { AgPromise, ICellRendererComp, ICellRendererParams } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class AcDatagridOnAgGridCellRenderer implements ICellRendererComp {
  datagridApi?: AcDatagridApi;
  datagridCell?: IAcDatagridCell;
  datagridColumn?: IAcDatagridColumn;
  datagridRow?: IAcDatagridRow;
  agGridExtension?: AcDatagridOnAgGridExtension;
  instance?: IAcDatagridCellRenderer;
  params: any;
  defaultElement = document.createElement('div');
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

  constructor() {
    this.defaultElement.style.display = "contents";
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
      // this.params.eGridCell.addEventListener('focusin', this.handleFocus);
      // this.params.eGridCell.addEventListener('focusout', this.handleBlur);
      this.defaultElement.innerHTML = "";
      this.agGridExtension = params.agGridExtension;
      this.datagridColumn = params.datagridColumn;
      this.datagridApi = params.datagridApi;
      this.datagridRow = this.datagridApi!.getRow({ rowId: params.data[this.agGridExtension!.rowKey] });
      if (this.datagridRow && this.datagridColumn) {
        this.datagridCell = this.datagridApi?.getCell({ row: this.datagridRow, column: this.datagridColumn });
        if (this.datagridCell) {
          const columnDefinition = this.datagridColumn.columnDefinition;
          if (columnDefinition.cellRendererElement) {
            const element = new columnDefinition.cellRendererElement();
            const initArgs: IAcDatagridCellElementArgs = {
              datagridApi: this.datagridApi!,
              datagridCell: this.datagridCell!
            };
            element.init(initArgs);
            this.defaultElement.replaceWith(element.getElement());
          }
        }
      }
      else {
        console.warn(`Datagrid Row and Datagrid Column Not Found`);
      }
    });
  }

  refresh(params: ICellRendererParams<any, any, any>): boolean {
    this.init!(params);
    return true;
  }
}
