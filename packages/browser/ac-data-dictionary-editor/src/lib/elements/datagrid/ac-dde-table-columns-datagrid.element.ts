/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDatagridOnAgGridExtension, AcDatagridOnAgGridExtensionName } from "@autocode-ts/ac-datagrid-on-ag-grid";
import { AcDDECssClassName, AcEnumDDEHook, IAcDDETableColumnRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagrid, AcDatagridApi, AcDatagridColumnDraggingExtension, AcDatagridColumnsCustomizerExtension, AcDatagridDataExportXlsxExtension, AcDatagridRowDraggingExtension, AcDatagridRowNumbersExtension, AcDatagridRowSelectionExtension, AcEnumDatagridExtension } from "@autocode-ts/ac-browser";
import { AcDDTableColumn, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectColumnTypeInput } from "../inputs/ac-dde-datagrid-select-column-type-input.element";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagridYesNoInput } from "../inputs/ac-dde-datagrid-yes-no-input.element";
import { AcDDEDatagridNumberInput } from "../inputs/ac-dde-datagrid-number-input.element";

export class AcDDETableColumnsDatagrid {
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
      { 'field': AcDDTableColumn.KeyColumnName, 'title': 'Column Name', cellRendererElement: AcDDEDatagridTextInput },
      { 'field': AcDDTableColumn.KeyColumnType, 'title': 'Column Type', cellRendererElement: AcDDEDatagridSelectColumnTypeInput },
      // { 'field': AcDDTableColumn.KeyColumnProperties, 'title': 'Properties?' },
      { 'field': AcEnumDDColumnProperty.AutoNumberLength, 'title': 'AutoNumber Length', cellRendererElement: AcDDEDatagridNumberInput },
      { 'field': AcEnumDDColumnProperty.AutoNumberPrefix, 'title': 'AutoNumber Prefix', cellRendererElement: AcDDEDatagridTextInput },
      { 'field': AcEnumDDColumnProperty.CheckInAutoNumber, 'title': 'Check in AutoNumber?', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.CheckInModify, 'title': 'Check in Modify?', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.CheckInSave, 'title': 'Check in Save?', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.ColumnTitle, 'title': 'Column Title', cellRendererElement: AcDDEDatagridTextInput },
      { 'field': AcEnumDDColumnProperty.DefaultValue, 'title': 'Default Value', cellRendererElement: AcDDEDatagridTextInput },
      // { 'field': AcEnumDDColumnProperty.ForeignKey, 'title': 'Foreign Key' },
      { 'field': AcEnumDDColumnProperty.Format, 'title': 'Format' },
      { 'field': AcEnumDDColumnProperty.InSearchQuery, 'title': 'In Search Query', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.IsSelectDistinct, 'title': 'Is Select Distinct?', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.NotNull, 'title': 'Not Null', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.PrimaryKey, 'title': 'Primary Key', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.Remarks, 'title': 'Remarks', cellRendererElement: AcDDEDatagridTextInput },
      { 'field': AcEnumDDColumnProperty.Required, 'title': 'Required', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.SelectOptions, 'title': 'Select Options' },
      { 'field': AcEnumDDColumnProperty.SetNullBeforeDelete, 'title': 'Set Null Before Delete?', cellRendererElement: AcDDEDatagridYesNoInput },
      { 'field': AcEnumDDColumnProperty.Size, 'title': 'Size', cellRendererElement: AcDDEDatagridNumberInput },
      { 'field': AcEnumDDColumnProperty.UniqueKey, 'title': 'Unique Key?', cellRendererElement: AcDDEDatagridYesNoInput }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataLoaded, callback: () => {
        this.setColumnsData();
      }
    });

    this.setColumnsData();

  }

  applyFilter(){
      let data = this.data;
      if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETableColumnRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
    }

  initElement() {
    this.element.append(this.datagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setColumnsData() {
    this.data = Object.values(this.editorApi.dataStorage.tableColumns);
    this.applyFilter();
  }


}
