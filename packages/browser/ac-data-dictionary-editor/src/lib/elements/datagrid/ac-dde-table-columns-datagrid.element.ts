/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDDEApi } from "../../core/ac-dde-api";
import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellEvent, IAcDatagridCellRendererElementInitEvent, IAcDatagridColumnDefinition, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDTableColumn, AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectColumnTypeInput } from "../inputs/ac-dde-datagrid-select-column-type-input.element";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagridYesNoInput } from "../inputs/ac-dde-datagrid-yes-no-input.element";
import { AcDDEDatagridNumberInput } from "../inputs/ac-dde-datagrid-number-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridSelectFormatInput } from "../inputs/ac-dde-datagrid-select-format-input.elemen";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";
import { AcEnumDDETableColumn } from "../../enums/ac-enum-dde-storage-keys.enum";
import { IAcDDEDatagridCellInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-cell-init-hook-args.interface";
import { AcEnumDDEEntity } from "../../enums/ac-enum-dde-entity.enum";
import { IAcDDETableColumn } from "../../interfaces/ac-dde-table-column.inteface";
import { AcDDECssClassName } from "../../consts/ac-dde-css-class-name.const";
import { IAcDDEActiveDataDictionaryChangeHookArgs } from "../../interfaces/hook-args/ac-dde-active-data-dictionary-change-hook-args.interface";
import { AcDDEDatagridValueOptionsInput } from "../inputs/ac-dde-datagrid-values-options-input.element";
import { AcDDEDatagridSelectTableInput } from "../inputs/ac-dde-datagrid-select-table-input.element";
import { IAcContextEvent } from "@autocode-ts/autocode";

export class AcDDETableColumnsDatagrid {
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
    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.ActiveDataDictionaryChange, callback: (args: IAcDDEActiveDataDictionaryChangeHookArgs) => {
        this.setColumnsData();
      }
    });
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    const columnDefinitions: IAcDatagridColumnDefinition[] = [
      {
        'field': 'action', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }, width: 35, allowEdit:false,allowFocus:false,allowFilter:false,allowSort:false
      },

      { 'field': AcDDTableColumn.KeyColumnName, 'title': 'Column Name', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcDDTableColumn.KeyColumnType, 'title': 'Column Type', cellEditorElement: AcDDEDatagridSelectColumnTypeInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.PrimaryKey, 'title': 'Primary Key', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true,allowFocus:false },
      { 'field': AcEnumDDColumnProperty.ColumnTitle, 'title': 'Column Title', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.Required, 'title': 'Required', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.ValueOptions, 'title': 'Values', useCellEditorForRenderer: true, cellEditorElement: AcDDEDatagridValueOptionsInput,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.UniqueKey, 'title': 'Unique Key', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },      { 'field': AcEnumDDColumnProperty.NotNull, 'title': 'Not Null', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.Format, 'title': 'Format', useCellEditorForRenderer: true, cellEditorElement: AcDDEDatagridSelectFormatInput,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.DefaultValue, 'title': 'Default Value', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.SetNullBeforeDelete, 'title': 'Set Null Before Delete?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.IsSelectDistinct, 'title': 'Is Select Distinct?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },

      { 'field': AcEnumDDColumnProperty.Tags, 'title': 'Tags', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.AutoNumberLength, 'title': 'AutoNumber Length', cellEditorElement: AcDDEDatagridNumberInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.AutoNumberPrefix, 'title': 'AutoNumber Prefix', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.CheckInAutoNumber, 'title': 'Check in AutoNumber?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.CheckInModify, 'title': 'Check in Modify?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.CheckInSave, 'title': 'Check in Save?', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },
      // { 'field': AcEnumDDColumnProperty.ForeignKey, 'title': 'Foreign Key' },
      { 'field': AcEnumDDColumnProperty.UseForRowLikeFilter, 'title': 'In Search Query', cellEditorElement: AcDDEDatagridYesNoInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.Remarks, 'title': 'Remarks', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDColumnProperty.Size, 'title': 'Size', cellEditorElement: AcDDEDatagridNumberInput, useCellEditorForRenderer: true,allowFilter:true },
      { 'field': AcEnumDDETableColumn.TableId, 'title': 'Table', cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
                editorApi: this.editorApi
              }, useCellEditorForRenderer: true,allowFilter:true
            },
    ];
    const colSetHookArgs: IAcDDEDatagridBeforeColumnsSetInitHookArgs = {
      datagridApi: this.datagridApi,
      editorApi: this.editorApi,
      columnDefinitions: columnDefinitions,
      instance: this
    };
    this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TableColumnsDatagridBeforeColumnsSet, args: colSetHookArgs });
    this.ddeDatagrid.columnDefinitions = columnDefinitions;

    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        args.datagridRow.data[AcEnumDDETableColumn.DataDictionaryId] = this.editorApi.activeDataDictionary?.dataDictionaryId;
        const row = this.editorApi.dataStorage.addTableColumn(args.datagridRow.data);
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteTableColumn({ columnId: args.datagridRow.data[AcEnumDDETableColumn.ColumnId] });
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.CellValueChange, callback: (args: IAcDatagridCellEvent) => {
        this.editorApi.dataStorage.setTableColumnProperties(args.datagridCell.datagridRow.data);
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.CellEditorElementInit, callback: (args: IAcDatagridCellEditorElementInitEvent) => {
        const hookArgs: IAcDDEDatagridCellInitHookArgs = {
          datagridApi: this.datagridApi,
          editorApi: this.editorApi,
          datagridCell: args.datagridCell,
          eventArgs: args,
          instance: this
        };
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TableColumnsDatagridCellEditorInit, args: hookArgs });
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.CellRendererElementInit, callback: (args: IAcDatagridCellRendererElementInitEvent) => {
        const hookArgs: IAcDDEDatagridCellInitHookArgs = {
          datagridApi: this.datagridApi,
          editorApi: this.editorApi,
          datagridCell: args.datagridCell,
          eventArgs: args,
          instance: this
        };
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TableColumnsDatagridCellRendererInit, args: hookArgs });
      }
    });

    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.ActiveDataDictionaryChange, callback: () => {
        this.setColumnsData();
      }
    });
    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.TableColumn, (args: IAcContextEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcEnumDDETableColumn.ColumnId, args.oldValue[AcEnumDDETableColumn.ColumnId]);
      }
    });

    this.setColumnsData();
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETableColumn) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ class_: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setColumnsData() {
    if (this.editorApi.activeDataDictionary) {
      this.data = Object.values(this.editorApi.dataStorage.getTableColumns({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId }));
      this.applyFilter();
    }
  }


}
