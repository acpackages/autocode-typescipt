/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, IAcDatagridCell, IAcDatagridCellElementArgs, IAcDatagridCellRenderer, IAcDatagridColumn, IAcDatagridRow } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { IAcDDETable } from "../../_ac-data-dictionary-editor.export";


export class AcDDETableRenderer implements IAcDatagridCellRenderer {
  element?: HTMLElement;
  destroy?(): void {
    if (this.element) {
      this.element.remove();
    }
  }

  getElement(): HTMLElement {
    return this.element!;
  }

  init(args: IAcDatagridCellElementArgs): void {
    const datagridApi: AcDatagridApi = args.datagridApi;
    const datagridCell: IAcDatagridCell = args.datagridCell;
    const datagridRow: IAcDatagridRow = datagridCell.datagridRow;
    const datagridColumn: IAcDatagridColumn = datagridCell.datagridColumn;
    const editorApi: AcDDEApi = datagridColumn.columnDefinition.cellEditorElementParams['editorApi'];
    const element = datagridApi.datagrid.ownerDocument.createElement('div');
    element.style.display = 'contents';
    const value = datagridRow.data[datagridColumn.columnKey];
    if (value) {
      const tables: IAcDDETable[] = editorApi.dataStorage.getTables({ tableId: value });
      if (tables.length > 0) {
        element.innerHTML = tables[0].tableName!;
      }
    }
    if (this.element) {
      this.element.replaceWith(element);
    }
    this.element = element;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.init(args);
  }

}
