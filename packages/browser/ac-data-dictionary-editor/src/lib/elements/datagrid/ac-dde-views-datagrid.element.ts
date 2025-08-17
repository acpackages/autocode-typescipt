import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridActiveRowChangeEvent, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcEnumDDEHook, IAcDDEViewRow } from "../../_ac-data-dictionary-editor.export";
import { AcDDView } from "@autocode-ts/ac-data-dictionary";
import { AcHooks } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../components/ac-dde-datagrid-row-action.element";

export class AcDDEViewsDatagrid {
  ddeDatagrid: AcDDEDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;
  hooks: AcHooks = new AcHooks();
  data: any[] = [];

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.ddeDatagrid = new AcDDEDatagrid({editorApi:editorApi});
    this.initDatagrid();
    this.initElement();
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.datagridApi.on({eventName: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
      const row = this.editorApi.dataStorage.addView({data_dictionary_id:this.editorApi.activeDataDictionary?.data_dictionary_id,...args.datagridRow.data});
      args.datagridRow.data = row;
      this.data.push(row);
    }});
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': '', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        },width:50,maxWidth:50,minWidth:50
      },
      {
        'field': AcDDView.KeyViewName, 'title': 'View Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      }
    ];

    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.ActiveRowChange, callback: (args: IAcDatagridActiveRowChangeEvent) => {
        setTimeout(() => {
          this.hooks.execute({ hookName: AcEnumDDEHook.DatagridActiveTableChange });
        }, 100);

      }
    });

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setViewsData();
      }
    });

    this.setViewsData();
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDEViewRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setViewsData() {
    this.data = Object.values(this.editorApi.dataStorage.views);
    this.applyFilter();
  }

}
