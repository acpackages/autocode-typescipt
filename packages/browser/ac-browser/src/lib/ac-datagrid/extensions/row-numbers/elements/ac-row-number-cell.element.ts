/* eslint-disable @typescript-eslint/no-inferrable-types */

import { acAddClassToElement } from "../../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../../../consts/ac-datagrid-css-class-name.const";
import { AcDatagridDefaultRowConfig } from "../../../consts/ac-datagrid-default-row-config.const";
import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";
import { AcDatagridRowNumberCssClassName } from "../consts/ac-datagrid-row-number-css-class-name.const";

export class AcDatagridRowNumberCell {
  datagridApi: AcDatagridApi;
  datagridInternalColumn:AcDatagridInternalColumn;
  datagridRow!: AcDatagridRow;
  element: HTMLElement = document.createElement('div');

  constructor({ datagridApi, datagridRow,datagridInternalColumn }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow,datagridInternalColumn:AcDatagridInternalColumn }) {
    this.datagridRow = datagridRow;
    this.datagridApi = datagridApi;
    this.datagridInternalColumn = datagridInternalColumn;
    this.initElement();
  }

  initElement() {
    acAddClassToElement({ cssClass: AcDatagridRowNumberCssClassName.acDatagridRowNumberCell, element: this.element });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCell, element: this.element });
    this.render();
    this.setCellWidth();
    // this.element.setAttribute(AcDraggableAttributeName.acDraggableHandle,"");
  }

  render(){
    this.element.innerHTML = `${this.datagridRow.index + 1}`;
  }

  setCellWidth() {
      const width = this.datagridInternalColumn.width;
      if (this.datagridApi.isTreeData && this.datagridInternalColumn.index == 0) {
        // width = width - (AcDatagridDefaultRowConfig.treeChildPadding * this.datagridRow.treeDepth);
      }
      this.element.style.width = `${width}px`;
    }
}
