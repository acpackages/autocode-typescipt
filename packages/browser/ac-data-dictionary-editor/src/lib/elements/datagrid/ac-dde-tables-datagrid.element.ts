import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridActiveRowChangeEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellRendererElementInitEvent, IAcDatagridColumnDefinition, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcHooks } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";
import { AcEnumDDETable } from "../../enums/ac-enum-dde-storage-keys.enum";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";
import { IAcDDEDatagridCellInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-cell-init-hook-args.interface";
import { AcEnumDDEEntity } from "../../enums/ac-enum-dde-entity.enum";
import { IAcDDETable } from "../../interfaces/ac-dde-table.inteface";
import { AcDDECssClassName } from "../../consts/ac-dde-css-class-name.const";

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
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    const columnDefinitions: IAcDatagridColumnDefinition[] = [
      {
        'field': 'action', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }, width: 50, maxWidth: 50, minWidth: 50
      },
      {
        'field': AcEnumDDETable.TableName, 'title': 'Table Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.SingularName, 'title': 'Singular Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.PluralName, 'title': 'Plural Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.SelectQuery, 'title': 'Select Query',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.SelectQueryColumns, 'title': 'Query Columns',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.SelectRequestColumns, 'title': 'Request Columns',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.OrderBy, 'title': 'Order By',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcEnumDDETable.ViewId, 'title': 'View',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      }
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
    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.Table, (args: IAcReactiveValueProxyEvent) => {
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
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setTablesData() {
    this.data = Object.values(this.editorApi.dataStorage.getTables({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId }));
    this.applyFilter();
  }

}
