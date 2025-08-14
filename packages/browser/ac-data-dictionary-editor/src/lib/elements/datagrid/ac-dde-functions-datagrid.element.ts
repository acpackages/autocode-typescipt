/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDEDatagridTextInput, AcEnumDDEHook, IAcDDEFunctionRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridApi } from "@autocode-ts/ac-browser";
import { AcDDFunction } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";

export class AcDDEFunctionsDatagrid {
  data:any[] = [];
  ddeDatagrid:AcDDEDatagrid = new AcDDEDatagrid();
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.initDatagrid();
    this.initElement();
  }

  applyFilter(){
      let data = this.data;
      if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDEFunctionRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
    }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': AcDDFunction.KeyFunctionName, 'title': 'Function Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDFunction.KeyFunctionCode, 'title': 'Function Code',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setFunctionsData();
      }
    });

    this.setFunctionsData();
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setFunctionsData() {
    this.data = Object.values(this.editorApi.dataStorage.functions);
    this.applyFilter();
  }
}
