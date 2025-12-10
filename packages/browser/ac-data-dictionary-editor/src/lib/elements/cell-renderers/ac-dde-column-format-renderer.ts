/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDatagridApi, IAcDatagridCell, IAcDatagridCellElementArgs, IAcDatagridCellRenderer, IAcDatagridColumn, IAcDatagridRow } from "@autocode-ts/ac-browser";

export class AcDDEColumnFormatRenderer implements IAcDatagridCellRenderer {
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
    const element = datagridApi.datagrid.ownerDocument.createElement('div');
    element.style.display = 'contents';
    const value = datagridRow.data[datagridColumn.columnKey];
    if (value) {
      element.innerHTML = value;
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
