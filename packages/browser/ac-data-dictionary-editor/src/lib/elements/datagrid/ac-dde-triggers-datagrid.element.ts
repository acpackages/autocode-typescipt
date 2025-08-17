import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridEvent, AcEnumDatagridExtension, IAcDatagridActiveRowChangeEvent, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDDECssClassName, AcEnumDDEHook, IAcDDETriggerRow } from "../../_ac-data-dictionary-editor.export";
import { AcDDTrigger } from "@autocode-ts/ac-data-dictionary";
import { AcHooks } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../components/ac-dde-datagrid-row-action.element";

export class AcDDETriggersDatagrid {
  ddeDatagrid!: AcDDEDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;
  hooks: AcHooks = new AcHooks();
  data: any[] = [];

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.ddeDatagrid = new AcDDEDatagrid({editorApi:editorApi});
    this.editorApi = editorApi;
    this.initDatagrid();
    this.initElement();
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.datagridApi.on({eventName: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
      const row = this.editorApi.dataStorage.addTrigger({data_dictionary_id:this.editorApi.activeDataDictionary?.data_dictionary_id,...args.datagridRow.data});
      args.datagridRow.data = row;
      this.data.push(row);
    }});
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': '', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDTrigger.KeyTriggerExecution, 'title': 'Execution',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDTrigger.KeyRowOperation, 'title': 'Operation',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDTrigger.KeyTableName, 'title': 'Table Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDTrigger.KeyTriggerName, 'title': 'Trigger Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDTrigger.KeyTriggerCode, 'title': 'Trigger Code',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setTriggersData();
      }
    });

    this.setTriggersData();
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETriggerRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setTriggersData() {
    this.data = Object.values(this.editorApi.dataStorage.triggers);
    this.applyFilter();
  }

}
