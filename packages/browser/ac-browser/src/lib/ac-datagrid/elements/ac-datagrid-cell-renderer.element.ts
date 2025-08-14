/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "../../utils/ac-element-functions";
import { IAcDatagridCellRendererElement, IAcDatagridCellElementArgs } from "../_ac-datagrid.export";
import { AcDatagridAttributeName } from "../consts/ac-datagrid-attribute-name.const";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../core/ac-datagrid-api";
import { AcDatagridCell } from "../models/ac-datagrid-cell.model";

export class AcDatagridCellRendererElement implements IAcDatagridCellRendererElement{
  private datagridApi!: AcDatagridApi;
  private datagridCell!:AcDatagridCell;
  public element: HTMLElement = document.createElement('div');

  destroy?(): void {
    this.element.remove();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridApi = args.datagridApi;
    this.datagridCell = args.datagridCell;
    this.initElement();
  }

  initElement(){
    this.element.setAttribute(AcDatagridAttributeName.acDatagridCellId,this.datagridCell.acCellId);
    this.element.setAttribute(AcDatagridAttributeName.acDatagridColumnId,this.datagridCell.datagridColumn.acColumnId);
    this.element.setAttribute(AcDatagridAttributeName.acDatagridRowId,this.datagridCell.datagridRow.acRowId);
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCellRenderer, element: this.element });
    this.element.style.height = "100%";
    this.element.style.width = "max-content";
    this.render();
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.render();
  }

  render() {
    this.element.innerHTML = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnDefinition.field];
  }

}
