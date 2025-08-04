/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridTree } from "./ac-datagrid-tree.element";
import { AcDatagridTreeTableExtension } from "../core/ac-datagrid-tree-table-extension";
import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridRowDraggingExtension } from "../../row-dragging/core/ac-datagrid-row-dragging-extension";
import { acAddClassToElement, acRemoveClassFromElement } from "../../../../utils/ac-element-functions";
import { AcDatagridTreeTableCssClassName } from "../consts/ac-datagrid-tree-table-css-class-name.const";
import { AcDatagridTreeTableHtmlPlaceholder } from "../consts/ac-datagrid-tree-table-html-placeholder.const";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";

export class AcDatagridTreeTableChildrenToggleCell {
  datagridApi: AcDatagridApi;
  datagridInternalColumn: AcDatagridInternalColumn;
  datagridRow!: AcDatagridRow;
  datagridTree!: AcDatagridTree;
  element: HTMLElement = document.createElement('button');
  extension!:AcDatagridRowDraggingExtension;
  isOpen: boolean = false;

  constructor({ datagridApi,datagridInternalColumn , datagridRow, extension }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow,datagridInternalColumn: AcDatagridInternalColumn,extension:AcDatagridTreeTableExtension }) {
    this.datagridRow = datagridRow;
    this.datagridApi = datagridApi;
    this.datagridInternalColumn = datagridInternalColumn;
    this.extension = extension;
    if (this.datagridRow.instance) {
      // if (this.datagridRow.instance.datagridTree) {
      //   this.datagridTree = datagridRow.instance!.datagridTree!;
      // }
    }
    this.initElement();
  }

  close() {
    this.isOpen = false;
  }

  initElement() {
    acAddClassToElement({ cssClass: AcDatagridTreeTableCssClassName.acDatagridTreeToggle, element: this.element });
    this.setCellWidth();
    this.render();
    this.setToggleVisibility();
  }

  open() {
    this.isOpen = false;
  }

  render() {
    if (this.datagridTree.isOpen) {
      this.element.innerHTML = AcDatagridTreeTableHtmlPlaceholder.treeOpen;
      acAddClassToElement({ cssClass: AcDatagridTreeTableCssClassName.acDatagridTreeToggleOpen, element: this.element });
      acRemoveClassFromElement({ cssClass: AcDatagridTreeTableCssClassName.acDatagridTreeToggleClose, element: this.element });
    }
    else {
      this.element.innerHTML = AcDatagridTreeTableHtmlPlaceholder.treeClosed;
      acAddClassToElement({ cssClass: AcDatagridTreeTableCssClassName.acDatagridTreeToggleClose, element: this.element });
      acRemoveClassFromElement({ cssClass: AcDatagridTreeTableCssClassName.acDatagridTreeToggleOpen, element: this.element });
    }
  }

  setCellWidth() {
    // this.element.style.width = this.datagridColumn.width + "px";
  }

  setToggleVisibility(){
    if(this.datagridTree && this.datagridTree.hasChildren){
      this.element.style.visibility = '';
    }
    else{
      this.element.style.visibility = 'hidden';
    }
  }

}
