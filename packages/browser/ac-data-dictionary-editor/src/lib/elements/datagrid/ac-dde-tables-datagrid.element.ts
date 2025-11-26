import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridActiveRowChangeEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellEvent, IAcDatagridCellRendererElementInitEvent, IAcDatagridColumnDefinition, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcHooks, IAcContextEvent } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";
import { AcEnumDDETable } from "../../enums/ac-enum-dde-storage-keys.enum";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";
import { IAcDDEDatagridCellInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-cell-init-hook-args.interface";
import { AcEnumDDEEntity } from "../../enums/ac-enum-dde-entity.enum";
import { IAcDDETable } from "../../interfaces/ac-dde-table.inteface";
import { AcDDECssClassName } from "../../consts/ac-dde-css-class-name.const";
import { IAcDDEActiveDataDictionaryChangeHookArgs } from "../../interfaces/hook-args/ac-dde-active-data-dictionary-change-hook-args.interface";
import { AcDDEDatagridTableConstraintsInput } from "../inputs/ac-dde-datagrid-table-constraints-input.element";
import { AcEnumDDTableProperty } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectViewInput } from "../../_ac-data-dictionary-editor.export";

export class AcDDETablesDatagrid {
  ddeDatagrid!: AcDDEDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;
  hooks: AcHooks = new AcHooks();
  data: any[] = [];

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.editorApi = editorApi;
    this.ddeDatagrid = new AcDDEDatagrid({ editorApi: editorApi });
    this.initElement();
    this.initDatagrid();
    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.ActiveDataDictionaryChange, callback: (args: IAcDDEActiveDataDictionaryChangeHookArgs) => {
        this.setTablesData();
      }
    });
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    const columnDefinitions: IAcDatagridColumnDefinition[] = [
      {
        'field': 'action', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }, width: 35, allowEdit: false, allowFocus: false, allowFilter: false, allowSort: false
      },
      {
        'field': AcEnumDDETable.TableName, 'title': 'Table Name', allowFilter: true,
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDTableProperty.SingularName, 'title': 'Singular Name', allowFilter: true,
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDTableProperty.PluralName, 'title': 'Plural Name', allowFilter: true,
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDTableProperty.Constraints, 'title': 'Constraints', allowFilter: true,
        cellEditorElement: AcDDEDatagridTableConstraintsInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.ViewId, 'title': 'View', allowFilter: true,
        cellEditorElement: AcDDEDatagridSelectViewInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      // {
      //   'field': AcEnumDDTableProperty.SelectSqlQuery, 'title': 'Select Query',allowFilter:true,
      //   cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
      //     editorApi: this.editorApi
      //   }, useCellEditorForRenderer: true
      // },
      // {
      //   'field': AcEnumDDTableProperty.SelectQueryColumns, 'title': 'Query Columns',allowFilter:true,
      //   cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
      //     editorApi: this.editorApi
      //   }, useCellEditorForRenderer: true
      // },
      // {
      //   'field': AcEnumDDTableProperty.SelectRequestColumns, 'title': 'Request Columns',allowFilter:true,
      //   cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
      //     editorApi: this.editorApi
      //   }, useCellEditorForRenderer: true
      // },
      {
        'field': AcEnumDDTableProperty.OrderBy, 'title': 'Order By', allowFilter: true,
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },

    ];
    const colSetHookArgs: IAcDDEDatagridBeforeColumnsSetInitHookArgs = {
      datagridApi: this.datagridApi,
      editorApi: this.editorApi,
      columnDefinitions: columnDefinitions,
      instance: this
    };
    this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TablesDatagridBeforeColumnsSet, args: colSetHookArgs });
    this.ddeDatagrid.columnDefinitions = columnDefinitions;

    this.datagridApi.on({
      event: AcEnumDatagridEvent.CellValueChange, callback: (args: IAcDatagridCellEvent) => {
        this.editorApi.dataStorage.setTableProperties(args.datagridCell.datagridRow.data);
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addTable({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteTable({ tableId: args.datagridRow.data[AcEnumDDETable.TableId] });
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
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TablesDatagridCellEditorInit, args: hookArgs });
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
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TablesDatagridCellRendererInit, args: hookArgs });
      }
    });

    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.DataDictionarySet, callback: () => {
        this.setTablesData();
      }
    });
    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.Table, (args: IAcContextEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcEnumDDETable.TableId, args.oldValue[AcEnumDDETable.TableId]);
      }
    });

    this.setTablesData();
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETable) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ class_: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setTablesData() {
    this.data = Object.values(this.editorApi.dataStorage.getTables({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId }));
    this.applyFilter();
  }

}
