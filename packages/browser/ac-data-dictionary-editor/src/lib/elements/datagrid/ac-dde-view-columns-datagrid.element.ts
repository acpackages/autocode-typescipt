/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcDDEApi } from "../../core/ac-dde-api";
import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellRendererElementInitEvent, IAcDatagridColumnDefinition, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDViewColumn } from "@autocode-ts/ac-data-dictionary";
import { AcDDEDatagridSelectColumnTypeInput } from "../inputs/ac-dde-datagrid-select-column-type-input.element";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";
import { AcEnumDDEViewColumn } from "../../enums/ac-enum-dde-storage-keys.enum";
import { IAcDDEDatagridCellInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-cell-init-hook-args.interface";
import { AcEnumDDEEntity } from "../../enums/ac-enum-dde-entity.enum";
import { IAcDDETableColumn } from "../../interfaces/ac-dde-table-column.inteface";
import { AcDDECssClassName } from "../../consts/ac-dde-css-class-name.const";

export class AcDDEViewColumnsDatagrid {
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
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;

    const columnDefinitions: IAcDatagridColumnDefinition[] = [
      {
        'field': 'action', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }, width: 50, maxWidth: 50, minWidth: 50
      },
      { 'field': AcDDViewColumn.KeyColumnName, 'title': 'Column Name', cellEditorElement: AcDDEDatagridTextInput, useCellEditorForRenderer: true },
      { 'field': AcDDViewColumn.KeyColumnType, 'title': 'Column Type', cellEditorElement: AcDDEDatagridSelectColumnTypeInput, useCellEditorForRenderer: true },
    ];
    const colSetHookArgs: IAcDDEDatagridBeforeColumnsSetInitHookArgs = {
      datagridApi: this.datagridApi,
      editorApi: this.editorApi,
      columnDefinitions: columnDefinitions,
      instance: this
    };
    this.editorApi.hooks.execute({ hook: AcEnumDDEHook.ViewColumnsDatagridBeforeColumnsSet, args: colSetHookArgs });
    this.ddeDatagrid.columnDefinitions = columnDefinitions;

    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addViewColumn({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteViewColumn({ columnId: args.datagridRow.data[AcEnumDDEViewColumn.ColumnId] });
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
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.ViewColumnsDatagridCellEditorInit, args: hookArgs });
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
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.ViewColumnsDatagridCellRendererInit, args: hookArgs });
      }
    });
    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.DataDictionarySet, callback: () => {
        this.setColumnsData();
      }
    });
    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.ViewColumn, (args: IAcReactiveValueProxyEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcEnumDDEViewColumn.ColumnId, args.oldValue[AcEnumDDEViewColumn.ColumnId]);
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
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setColumnsData() {
    this.data = Object.values(this.editorApi.dataStorage.getViewColumns({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId }));
    this.applyFilter();
  }


}
