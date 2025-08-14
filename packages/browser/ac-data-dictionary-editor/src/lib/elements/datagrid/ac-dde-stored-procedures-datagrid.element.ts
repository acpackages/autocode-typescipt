/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDEDatagridTextInput, AcEnumDDEHook, IAcDDEStoredProcedureRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridApi } from "@autocode-ts/ac-browser";
import { AcDDStoredProcedure } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";

export class AcDDEStoredProceduresDatagrid {
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
      data = data.filter((item: IAcDDEStoredProcedureRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
    }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': AcDDStoredProcedure.KeyStoredProcedureName, 'title': 'Procedure Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDStoredProcedure.KeyStoredProcedureCode, 'title': 'Procedure Code',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setStoredProcedureData();
      }
    });

    this.setStoredProcedureData();
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setStoredProcedureData() {
    this.data = Object.values(this.editorApi.dataStorage.storedProcedures);
    this.applyFilter();
  }
}
