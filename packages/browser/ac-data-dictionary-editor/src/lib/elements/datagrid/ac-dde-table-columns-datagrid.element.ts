/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcEnumDDEHook, IAcDDETableColumnRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridApi } from "@autocode-ts/ac-browser";
import { AcDDTableColumn, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectColumnTypeInput } from "../inputs/ac-dde-datagrid-select-column-type-input.element";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagridYesNoInput } from "../inputs/ac-dde-datagrid-yes-no-input.element";
import { AcDDEDatagridNumberInput } from "../inputs/ac-dde-datagrid-number-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { DateTime } from "luxon";

export class AcDDETableColumnsDatagrid {
  data: any[] = [];
  ddeDatagrid: AcDDEDatagrid = new AcDDEDatagrid();
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
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.ddeDatagrid.columnDefinitions = [
      { 'field': AcDDTableColumn.KeyColumnName, 'title': 'Column Name', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true },
      { 'field': AcDDTableColumn.KeyColumnType, 'title': 'Column Type', cellEditorElement: AcDDEDatagridSelectColumnTypeInput, useCellEditorForRenderer: true },
      // { 'field': AcDDTableColumn.KeyColumnProperties, 'title': 'Properties?' },
      { 'field': AcEnumDDColumnProperty.AutoNumberLength, 'title': 'AutoNumber Length', cellEditorElement: AcDDEDatagridNumberInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.AutoNumberPrefix, 'title': 'AutoNumber Prefix', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.CheckInAutoNumber, 'title': 'Check in AutoNumber?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.CheckInModify, 'title': 'Check in Modify?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.CheckInSave, 'title': 'Check in Save?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.ColumnTitle, 'title': 'Column Title', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.DefaultValue, 'title': 'Default Value', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true },
      // { 'field': AcEnumDDColumnProperty.ForeignKey, 'title': 'Foreign Key' },
      { 'field': AcEnumDDColumnProperty.Format, 'title': 'Format', useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.InSearchQuery, 'title': 'In Search Query', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.IsSelectDistinct, 'title': 'Is Select Distinct?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.NotNull, 'title': 'Not Null', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.PrimaryKey, 'title': 'Primary Key', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.Remarks, 'title': 'Remarks', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.Required, 'title': 'Required', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.SelectOptions, 'title': 'Select Options', useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.SetNullBeforeDelete, 'title': 'Set Null Before Delete?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.Size, 'title': 'Size', cellEditorElement: AcDDEDatagridNumberInput, useCellEditorForRenderer: true },
      { 'field': AcEnumDDColumnProperty.UniqueKey, 'title': 'Unique Key?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.ActiveDataDictionaryChange, callback: () => {
        this.setColumnsData();
      }
    });

    this.setColumnsData();
  }

  applyFilter() {
    let data = this.data;
    console.log(DateTime.now().toISOTime(),"Filtering data");
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETableColumnRow) => this.filterFunction!(item));
    }
    console.log(DateTime.now().toISOTime(),"Filtered data");
    this.datagridApi.data = data;
    console.log(DateTime.now().toISOTime(),"Set datagrid data");
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setColumnsData() {
    if(this.editorApi.activeDataDictionary){
      console.log(DateTime.now().toISOTime(),"Setting data");
      this.data = Object.values(this.editorApi.dataStorage.tableColumns);
      console.log(DateTime.now().toISOTime(),"Data set",);
      this.applyFilter();
    }

  }


}
