/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDERelationshipRowKey, AcEnumDDEHook, IAcDDERelationshipRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridApi } from "@autocode-ts/ac-browser";
import { AcDDRelationship } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectTableInput } from "../inputs/ac-dde-datagrid-select-table-input.element";
import { AcDDEDatagridSelectTableColumnInput } from "../inputs/ac-dde-datagrid-select-table-column-input.element";
import { AcDDEDatagridYesNoInput } from "../inputs/ac-dde-datagrid-yes-no-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";

export class AcDDERelationshipsDatagrid {
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
      data = data.filter((item: IAcDDERelationshipRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
    }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': AcDDERelationshipRowKey.destinationColumnId, 'title': 'Foreign Key Table',
        cellEditorElement: AcDDEDatagridSelectTableColumnInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDERelationshipRowKey.destinationColumnId, 'title': 'Foreign Key Column',
        cellEditorElement: AcDDEDatagridSelectTableColumnInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDERelationshipRowKey.sourceTableId, 'title': 'Primary Key Table',
        cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDERelationshipRowKey.sourceColumnId, 'title': 'Primary Key Column',
        cellEditorElement: AcDDEDatagridSelectTableColumnInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDERelationshipRowKey.cascadeDeleteSource, 'title': 'Cascade Delete Source',
        cellEditorElement: AcDDEDatagridYesNoInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDERelationshipRowKey.cascadeDeleteDestination, 'title': 'Cascade Delete Destination',
        cellEditorElement: AcDDEDatagridYesNoInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
       }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setRelationshipsData();
      }
    });

    this.setRelationshipsData();
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setRelationshipsData() {
    this.data = Object.values(this.editorApi.dataStorage.relationships);
    this.applyFilter();
  }
}
