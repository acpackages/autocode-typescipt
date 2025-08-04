/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcDraggableAttributeName } from "../../../../ac-draggable/consts/ac-draggable-attribute-name.const";
import { AcDraggableSortElement } from "../../../../ac-draggable/elements/ac-draggable-sort-element.element";
import { acAddClassToElement } from "../../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../../../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";
import { AcDatagridRowDraggingCssClassName } from "../consts/ac-datagrid-row-dragging-css-class-name.const";
import { AcDatagridRowDraggingHtmlPlaceholder } from "../consts/ac-datagrid-row-dragging-html-placeholder.const";
import { AcDatagridRowDraggingExtension } from "../core/ac-datagrid-row-dragging-extension";

export class AcDatagridRowDraggingCell {
  datagridApi: AcDatagridApi;
  datagridInternalColumn: AcDatagridInternalColumn;
  datagridRow!: AcDatagridRow;
  element: HTMLElement = document.createElement('div');
  extension!:AcDatagridRowDraggingExtension;
  draggableSortInstance?:AcDraggableSortElement;
  dragHandle: HTMLElement = document.createElement('div');
  selected:boolean = false;

  constructor({ datagridApi, datagridRow, datagridInternalColumn,extension }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow, datagridInternalColumn: AcDatagridInternalColumn,extension:AcDatagridRowDraggingExtension }) {
    this.datagridRow = datagridRow;
    this.datagridApi = datagridApi;
    this.datagridInternalColumn = datagridInternalColumn;
    this.extension = extension;
    this.initElement();
  }

  initElement() {
    acAddClassToElement({ cssClass: AcDatagridRowDraggingCssClassName.AcDatagridRowDrag, element: this.dragHandle });
    acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCell, element: this.element });
    this.element.append(this.dragHandle);
    this.dragHandle.innerHTML = AcDatagridRowDraggingHtmlPlaceholder.drag;
    this.element.setAttribute(AcDraggableAttributeName.acDraggableHandle,"");
    this.setCellWidth();
    this.setRowDraggable();

  }

  setRowDraggable(){
    if(this.datagridRow && this.datagridRow.instance && this.datagridRow.instance.element){
      this.draggableSortInstance =  this.extension.draggableApi.registerDraggableSortElement({element:this.datagridRow.instance!.element});
      this.draggableSortInstance.elementInstance.registerHandle(this.dragHandle);
    }
    else{
      setTimeout(() => {
        this.setRowDraggable();
      }, 100);
    }
  }

  setCellWidth() {
    const width = this.datagridInternalColumn.width;
    if (this.datagridApi.isTreeData && this.datagridInternalColumn.index == 0) {
      // width = width - (AcDatagridDefaultRowConfig.treeChildPadding * this.datagridRow.treeDepth);
    }
    this.element.style.width = `${width}px`;
  }
}
