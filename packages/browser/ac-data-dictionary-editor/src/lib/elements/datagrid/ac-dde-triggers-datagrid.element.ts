import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridEvent, AcEnumDatagridExtension, IAcDatagridActiveRowChangeEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDDECssClassName, AcEnumDDEHook, IAcDDETriggerRow } from "../../_ac-data-dictionary-editor.export";
import { AcDDTrigger } from "@autocode-ts/ac-data-dictionary";
import { AcHooks } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";

export class AcDDETriggersDatagrid {
  datagrid!: AcDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;
  hooks: AcHooks = new AcHooks();
  data:any[] = [];

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.initDatagrid();
    this.initElement();
  }

  initDatagrid() {
    this.datagrid = new AcDatagrid();
    this.datagridApi = this.datagrid.datagridApi;
    this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnDragging }) as AcDatagridColumnDraggingExtension;
    this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.ColumnsCustomizer }) as AcDatagridColumnsCustomizerExtension;
    this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.DataExportXlsx }) as AcDatagridDataExportXlsxExtension;
    this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowNumbers }) as AcDatagridRowNumbersExtension;
    this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowSelection }) as AcDatagridRowSelectionExtension;
    this.datagridApi.enableExtension({ extensionName: AcEnumDatagridExtension.RowDragging }) as AcDatagridRowDraggingExtension;
    this.datagridApi.enableExtension({ extensionName: AcDatagridOnAgGridExtensionName }) as AcDatagridOnAgGridExtension;
    this.datagridApi.columnDefinitions = [

      {
        'field': AcDDTrigger.KeyTriggerExecution, 'title': 'Execution',
        cellRendererElement: AcDDEDatagridTextInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDTrigger.KeyRowOperation, 'title': 'Operation',
        cellRendererElement: AcDDEDatagridTextInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDTrigger.KeyTableName, 'title': 'Table Name',
        cellRendererElement: AcDDEDatagridTextInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDTrigger.KeyTriggerName, 'title': 'Trigger Name',
        cellRendererElement: AcDDEDatagridTextInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDTrigger.KeyTriggerCode, 'title': 'Trigger Code',
        cellRendererElement: AcDDEDatagridTextInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setTriggersData();
      }
    });

    this.setTriggersData();
  }

  applyFilter(){
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETriggerRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.element.append(this.datagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setTriggersData() {
    this.data = Object.values(this.editorApi.dataStorage.triggers);
    this.applyFilter();
  }

}
