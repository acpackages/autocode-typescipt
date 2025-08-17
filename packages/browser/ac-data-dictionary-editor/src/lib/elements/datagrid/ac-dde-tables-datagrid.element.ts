import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridActiveRowChangeEvent, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDETableRowKey, AcEnumDDEHook, IAcDDETableRow } from "../../_ac-data-dictionary-editor.export";
import { AcDDTable } from "@autocode-ts/ac-data-dictionary";
import { AcHooks } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../components/ac-dde-datagrid-row-action.element";

export class AcDDETablesDatagrid {
  ddeDatagrid!:AcDDEDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;
  hooks: AcHooks = new AcHooks();
  data:any[] = [];

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.ddeDatagrid = new AcDDEDatagrid({editorApi:editorApi});
    this.initElement();
    this.initDatagrid();
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.datagridApi.on({eventName: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
      const row = this.editorApi.dataStorage.addTable({data_dictionary_id:this.editorApi.activeDataDictionary?.data_dictionary_id,...args.datagridRow.data});
      args.datagridRow.data = row;
    }});
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': '', 'title': '',cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDETableRowKey.tableName, 'title': 'Table Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDETableRowKey.singularName, 'title': 'Singular Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDETableRowKey.pluralName, 'title': 'Plural Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDETableRowKey.selectQuery, 'title': 'Select Query',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDETableRowKey.selectQueryColumns, 'title': 'Query Columns',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDETableRowKey.selectRequestColumns, 'title': 'Request Columns',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDETableRowKey.orderBy, 'title': 'Order By',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      },
      {
        'field': AcDDETableRowKey.viewId, 'title': 'View',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        },useCellEditorForRenderer:true
      }
    ];

    this.datagridApi.on({eventName: AcEnumDatagridEvent.ActiveRowChange, callback: (args: IAcDatagridActiveRowChangeEvent) => {
        setTimeout(() => {
          this.hooks.execute({ hookName: AcEnumDDEHook.DatagridActiveTableChange });
        }, 100);
      }
    });


    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setTablesData();
      }
    });

    this.setTablesData();
  }

  applyFilter(){
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETableRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setTablesData() {
    this.data = Object.values(this.editorApi.dataStorage.tables);
    this.applyFilter();
  }

}
