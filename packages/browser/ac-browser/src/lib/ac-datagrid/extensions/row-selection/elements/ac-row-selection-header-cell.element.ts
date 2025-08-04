import { acAddClassToElement } from "../../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../../../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridRowSelectionCssClassName } from "../consts/ac-datagrid-row-selection-css-class-name.const";

export class AcDatagridRowSelectionHeaderCell {
  datagridApi: AcDatagridApi;
  datagridInternalColumn:AcDatagridInternalColumn;
  element: HTMLElement = document.createElement('div');

  constructor({ datagridApi,datagridInternalColumn }: { datagridApi: AcDatagridApi,datagridInternalColumn:AcDatagridInternalColumn }) {
    this.datagridApi = datagridApi;
    this.datagridInternalColumn = datagridInternalColumn;
    this.initElement();
  }

  initElement() {
    acAddClassToElement({ cssClass: AcDatagridRowSelectionCssClassName.acDatagridRowSelectionHeaderCell, element: this.element });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridHeaderCell, element: this.element });
    this.setCellWidth();
    // this.element.setAttribute(AcDraggableAttributeName.acDraggableHandle,"");
  }

  render(){
    this.element.innerHTML = ``;
  }

  setCellWidth() {
        const width = this.datagridInternalColumn.width;
        this.element.style.width = `${width}px`;
      }
}
