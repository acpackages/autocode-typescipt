/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDEDatagridTextInput, AcDDEStoredProcedureRowKey, AcEnumDDEEntity, AcEnumDDEHook, IAcDDEStoredProcedureRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDStoredProcedure } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../components/ac-dde-datagrid-row-action.element";
import { IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemove, arrayRemoveByKey } from "@autocode-ts/ac-extensions";

export class AcDDEStoredProceduresDatagrid {
  data: any[] = [];
  ddeDatagrid!: AcDDEDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.ddeDatagrid = new AcDDEDatagrid({ editorApi: editorApi });
    this.initDatagrid();
    this.initElement();
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDEStoredProcedureRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addStoredProcedure({ data_dictionary_id: this.editorApi.activeDataDictionary?.data_dictionary_id, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteStoredProcedure({ stored_procedure_id: args.datagridRow.data[AcDDEStoredProcedureRowKey.storedProcedureId] });
      }
    });
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': '', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }, width: 50, maxWidth: 50, minWidth: 50
      },
      {
        'field': AcDDStoredProcedure.KeyStoredProcedureName, 'title': 'Procedure Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDStoredProcedure.KeyStoredProcedureCode, 'title': 'Procedure Code',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setStoredProcedureData();
      }
    });

    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.StoredProcedure, (args: IAcReactiveValueProxyEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcDDEStoredProcedureRowKey.storedProcedureId, args.oldValue[AcDDEStoredProcedureRowKey.storedProcedureId]);
      }
    });

    this.setStoredProcedureData();
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setStoredProcedureData() {
    this.data = Object.values(this.editorApi.dataStorage.getStoredProcedures({ dataDictionaryId: this.editorApi.activeDataDictionary?.data_dictionary_id }));
    this.applyFilter();
  }
}
