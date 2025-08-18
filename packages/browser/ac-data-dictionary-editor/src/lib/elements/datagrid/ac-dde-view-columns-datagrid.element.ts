/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDEViewColumnRowKey, AcEnumDDEEntity, AcEnumDDEHook, IAcDDETableColumnRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDViewColumn } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectColumnTypeInput } from "../inputs/ac-dde-datagrid-select-column-type-input.element";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../components/ac-dde-datagrid-row-action.element";
import { IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemove, arrayRemoveByKey } from "@autocode-ts/ac-extensions";

export class AcDDEViewColumnsDatagrid {
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

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addViewColumn({ data_dictionary_id: this.editorApi.activeDataDictionary?.data_dictionary_id, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteViewColumn({ view_column_id: args.datagridRow.data[AcDDEViewColumnRowKey.columnId] });
      }
    });
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': '', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }, width: 50, maxWidth: 50, minWidth: 50
      },
      { 'field': AcDDViewColumn.KeyColumnName, 'title': 'Column Name', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true },
      { 'field': AcDDViewColumn.KeyColumnType, 'title': 'Column Type', cellEditorElement: AcDDEDatagridSelectColumnTypeInput, useCellEditorForRenderer: true },
      // { 'field': AcDDViewColumn.KeyColumnProperties, 'title': 'Properties?' },
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setColumnsData();
      }
    });

    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.ViewColumn, (args: IAcReactiveValueProxyEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcDDEViewColumnRowKey.columnId, args.oldValue[AcDDEViewColumnRowKey.columnId]);
      }
    });

    this.setColumnsData();

  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETableColumnRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setColumnsData() {
    this.data = Object.values(this.editorApi.dataStorage.getViewColumns({ dataDictionaryId: this.editorApi.activeDataDictionary?.data_dictionary_id }));
    this.applyFilter();
  }


}
