/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDDECssClassName, AcEnumDDEHook, IAcDDERelationshipRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridExtension } from "@autocode-ts/ac-browser";
import { AcDDRelationship } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectTableInput } from "../inputs/ac-dde-datagrid-select-table-input.element";
import { AcDDEDatagridSelectTableColumnInput } from "../inputs/ac-dde-datagrid-select-table-column-input.element";
import { AcDDEDatagridYesNoInput } from "../inputs/ac-dde-datagrid-yes-no-input.element";

export class AcDDETableRelationshipsDatagrid {
  data:any[] = [];
  datagrid!: AcDatagrid;
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
        'field': AcDDRelationship.KeyDestinationColumn, 'title': 'Foreign Key Column',
        cellRendererElement: AcDDEDatagridSelectTableColumnInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDRelationship.KeySourceTable, 'title': 'Primary Key Table',
        cellRendererElement: AcDDEDatagridSelectTableInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDRelationship.KeySourceColumn, 'title': 'Primary Key Column',
        cellRendererElement: AcDDEDatagridSelectTableColumnInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDRelationship.KeyCascadeDeleteSource, 'title': 'Cascade Delete Source',
        cellRendererElement: AcDDEDatagridYesNoInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
      },
      {
        'field': AcDDRelationship.KeyCascadeDeleteDestination, 'title': 'Cascade Delete Dest',
        cellRendererElement: AcDDEDatagridYesNoInput, cellRendererElementParams: {
          editorApi: this.editorApi
        }
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
    this.element.append(this.datagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setRelationshipsData() {
    this.data = Object.values(this.editorApi.dataStorage.relationships);
    this.applyFilter();
  }
}
