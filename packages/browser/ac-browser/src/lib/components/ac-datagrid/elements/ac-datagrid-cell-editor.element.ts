/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { IAcDatagridCellEditor, IAcDatagridCellElementArgs } from "../_ac-datagrid.export";
import { AcDatagridAttributeName } from "../consts/ac-datagrid-attribute-name.const";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridCell } from "../models/ac-datagrid-cell.model";

export class AcDatagridCellEditor implements IAcDatagridCellEditor{
  private datagridApi!: AcDatagridApi;
  private datagridCell!: AcDatagridCell;
  public element: HTMLInputElement = document.createElement('input');

  blur() {
    this.element.blur();
    this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnDefinition.field] = this.element.value;
  }

  destroy(): void {
    this.element.remove();
  }

  focus() {
    this.element.focus();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getValue() {
    return this.element.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    this.datagridApi = args.datagridApi;
    this.element.classList.add(AcDatagridCssClassName.acDatagridCellEditorInput);
    this.initElement();
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.element.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field];
  }

  initElement() {
    this.element.setAttribute(AcDatagridAttributeName.acDatagridCellId, this.datagridCell.acCellId);
    this.element.setAttribute(AcDatagridAttributeName.acDatagridColumnId, this.datagridCell.datagridColumn.acColumnId);
    this.element.setAttribute(AcDatagridAttributeName.acDatagridRowId, this.datagridCell.datagridRow.acRowId);
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridCellEditorInput, element: this.element });
    this.element.style.height = "100%";
    this.element.style.width = "max-content";
    this.render();
  }

  render() {
    this.element.value = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnDefinition.field];
    this.element.addEventListener('input', (e: any) => {
      this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnDefinition.field] = this.element.value;
    });
    this.element.addEventListener('change', (e: any) => {
      this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnDefinition.field] = this.element.value;
    });
  }

}
