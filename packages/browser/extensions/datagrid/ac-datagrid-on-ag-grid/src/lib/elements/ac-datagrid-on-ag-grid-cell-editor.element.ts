/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, IAcDatagridCell, IAcDatagridColumn, IAcDatagridCellRenderer, IAcDatagridRow, IAcDatagridCellElementArgs, AC_DATAGRID_EVENT, AC_DATAGRID_HOOK } from "@autocode-ts/ac-browser";
import { AgPromise, ICellEditorComp, ICellEditorParams, ICellRendererParams } from "ag-grid-community";
import { AcDatagridOnAgGridExtension } from "../core/ac-datagrid-on-ag-grid-extension";

export class AcDatagridOnAgGridCellEditor implements ICellEditorComp {
  datagridApi?: AcDatagridApi;
  datagridCell?: IAcDatagridCell;
  datagridColumn?: IAcDatagridColumn;
  datagridRow?: IAcDatagridRow;
  agGridExtension?: AcDatagridOnAgGridExtension;
  instance?: IAcDatagridCellRenderer;

  blurTimeout:any;
  params: any;
  element: HTMLInputElement = document.createElement('input');
  private isFocused: boolean = false;
  editor:any;


  handleBlur: Function = () => {
    this.isFocused = false;
    const cellValue = this.getValue();
    this.blurTimeout = setTimeout(() => {
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
    if(this.datagridCell){
      (this.datagridCell.element as any) = null;
      (this.datagridCell as any) = null;
    }
    (this.datagridColumn as any) = null;
    (this.datagridRow as any) = null;
    if (this.params) {
      this.params.eGridCell.removeEventListener('focusout', this.handleBlur);
      this.params.eGridCell.removeEventListener('focusin', this.handleFocus);
      this.params = null;
    }
    if (this.editor) {
      if (this.editor.destroy != undefined) {
        this.editor.destroy();
      }
      this.editor = null;
    }
    (this.agGridExtension as any) = null;
    (this.instance as any) = null;
    this.element.remove();
    (this.element as any) = null;
    clearTimeout(this.blurTimeout);
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
          if(this.datagridCell.extensionData == undefined){
            this.datagridCell.extensionData = {}
          }
          const columnDefinition = this.datagridColumn.columnDefinition;
          if (columnDefinition.cellEditorElement) {
            const editor = new columnDefinition.cellEditorElement();
            const initArgs: IAcDatagridCellElementArgs = {
              datagridApi: this.datagridApi!,
              datagridCell: this.datagridCell!
            };
            editor.init(initArgs);
            this.editor = editor;
            const element = editor.getElement();
            if (this.element) {
              this.element.replaceWith(element);
            }
            this.element = element;
            if (!this.datagridColumn.columnDefinition.useCellEditorForRenderer) {
              this.element.focus();
            }
            this.datagridCell.extensionData['cellEditingEditor'] = editor;
          }
          else if(columnDefinition.cellInputElement){
            const element = new columnDefinition.cellInputElement();
            if (this.element) {
              this.element.replaceWith(element);
            }
            this.element = element;
            this.element.value = this.datagridRow.data[this.datagridColumn.columnKey];
            if(columnDefinition.cellInputElementAttrs){
              Object.assign(element,columnDefinition.cellInputElementAttrs);
            }
            if (!this.datagridColumn.columnDefinition.useCellEditorForRenderer) {
              this.element.focus();
            }
            this.datagridCell.extensionData['cellEditingElement'] = element;
          }
          else {
            const element = this.datagridApi?.datagrid.ownerDocument.createElement('input') as HTMLInputElement;
            if (this.element) {
              this.element.replaceWith(element);
            }
            this.element = element;
            this.element.value = this.datagridRow.data[this.datagridColumn.columnKey];
            if (!this.datagridColumn.columnDefinition.useCellEditorForRenderer) {
              this.element.focus();
            }
            this.datagridCell.extensionData['cellEditingElement'] = element;
          }
          this.datagridApi?.hooks.execute({hook:AC_DATAGRID_HOOK.CellEditorElementInit,args:{editor:this}});
          this.datagridApi?.events.execute({event:AC_DATAGRID_EVENT.CellEditorElementInit,args:{editor:this}});
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
