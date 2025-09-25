/* eslint-disable @typescript-eslint/no-inferrable-types */

import { acAddClassToElement } from "../../../../../utils/ac-element-functions";
import { AcDatagridCssClassName } from "../../../consts/ac-datagrid-css-class-name.const";
import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";
import { AcDatagridRowSelectionCssClassName } from "../consts/ac-datagrid-row-selection-css-class-name.const";
import { AcEnumDatagridRowSelectionHook } from "../enums/ac-enum-datagrid-row-selection-hook.enum";
import { IAcDatagridRowSelectionChangeEvent } from "../interfaces/ac-datagrid-row-selection-change-event.interface";

export class AcDatagridRowSelectionCell {
  datagridApi: AcDatagridApi;
  datagridInternalColumn: AcDatagridInternalColumn;
  datagridRow!: AcDatagridRow;
  element: HTMLElement = document.createElement('div');
  input: HTMLInputElement = document.createElement('input');
  selected:boolean = false;

  constructor({ datagridApi, datagridRow, datagridInternalColumn }: { datagridApi: AcDatagridApi, datagridRow: AcDatagridRow, datagridInternalColumn: AcDatagridInternalColumn }) {
    this.datagridRow = datagridRow;
    this.datagridApi = datagridApi;
    this.datagridRow.hooks.subscribe({
      hook: AcEnumDatagridRowSelectionHook.RowSelectionChange, callback: (event: IAcDatagridRowSelectionChangeEvent) => {
        this.setSelectionFromInstance();
      }
    })
    this.datagridInternalColumn = datagridInternalColumn;
    this.initElement();
  }

  initElement() {
    acAddClassToElement({ class_: AcDatagridRowSelectionCssClassName.acDatagridRowSelect, element: this.input });
    acAddClassToElement({ class_: AcDatagridCssClassName.acDatagridCell, element: this.element });
    this.input.setAttribute('type','checkbox');
    this.element.append(this.input);
    this.registerListeners();
    this.setCellWidth();
  }

  registerListeners(){
    this.input.addEventListener('change',(e:Event)=>{
      this.selected = true;
    });
  }

  setSelectionFromInstance(){
    if(this.input && this.input.checked != this.datagridRow.extensionData[AcEnumDatagridExtension.RowSelection]){
      this.input.checked = this.datagridRow.extensionData[AcEnumDatagridExtension.RowSelection];
    }
  }

  setCellWidth() {
    const width = this.datagridInternalColumn.width;
    // if (this.datagridApi.isTreeData && this.datagridInternalColumn.index == 0) {
    //   // width = width - (AcDatagridDefaultRowConfig.treeChildPadding * this.datagridRow.treeDepth);
    // }
    this.element.style.width = `${width}px`;
  }
}
