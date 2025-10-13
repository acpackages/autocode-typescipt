/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellRendererElementInitEvent, IAcDatagridColumnDefinition, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDTrigger, AcEnumDDRowOperation } from "@autocode-ts/ac-data-dictionary";
import { AcHooks } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { IAcContextEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";
import { AcDDEDatagridSelectInput } from "../inputs/ac-dde-datagrid-select-input.element";
import { AcDDEDatagridSelectTableInput } from "../inputs/ac-dde-datagrid-select-table-input.element";
import { AcDDEDatagridPopoutTextareaInput } from "../inputs/ac-dde-datagrid-popout-textarea-input.element";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";
import { AcEnumDDETrigger } from "../../enums/ac-enum-dde-storage-keys.enum";
import { IAcDDEDatagridCellInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-cell-init-hook-args.interface";
import { AcEnumDDEEntity } from "../../enums/ac-enum-dde-entity.enum";
import { IAcDDETrigger } from "../../interfaces/ac-dde-trigger.inteface";
import { AcDDECssClassName } from "../../consts/ac-dde-css-class-name.const";
import { IAcDDEActiveDataDictionaryChangeHookArgs } from "../../interfaces/hook-args/ac-dde-active-data-dictionary-change-hook-args.interface";
import { AcDDETriggerMaster } from "../masters/ac-dde-trigger-master.element";

export class AcDDETriggersDatagrid {
  ddeDatagrid!: AcDDEDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;
  triggerMaster:AcDDETriggerMaster;
  hooks: AcHooks = new AcHooks();
  data: any[] = [];

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.ddeDatagrid = new AcDDEDatagrid({ editorApi: editorApi });
    this.triggerMaster = new AcDDETriggerMaster({editorApi});
    this.editorApi = editorApi;
    this.initDatagrid();
    this.initElement();
    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.ActiveDataDictionaryChange, callback: (args: IAcDDEActiveDataDictionaryChangeHookArgs) => {
        this.setTriggersData();
      }
    });
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
        'field': AcDDTrigger.KeyTriggerExecution, 'title': 'Execution',
        cellEditorElement: AcDDEDatagridSelectInput, cellEditorElementParams: {
          editorApi: this.editorApi, selectOptions: [
            { label: 'After', value: 'AFTER' },
            { label: 'Before', value: 'BEFORE' }
          ]
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcDDTrigger.KeyRowOperation, 'title': 'Operation',
        cellEditorElement: AcDDEDatagridSelectInput, cellEditorElementParams: {
          editorApi: this.editorApi,
          selectOptions: [
            { label: 'Insert', value: AcEnumDDRowOperation.Insert },
            { label: 'Update', value: AcEnumDDRowOperation.Update },
            { label: 'Delete', value: AcEnumDDRowOperation.Delete }
          ]
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': 'tableId', 'title': 'Table',
        cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcDDTrigger.KeyTriggerName, 'title': 'Trigger Name',
        cellEditorElement: AcDDEDatagridTextInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcDDTrigger.KeyTriggerCode, 'title': 'Trigger Code',
        cellEditorElement: AcDDEDatagridPopoutTextareaInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      }
    ];
    const colSetHookArgs: IAcDDEDatagridBeforeColumnsSetInitHookArgs = {
      datagridApi: this.datagridApi,
      editorApi: this.editorApi,
      columnDefinitions: columnDefinitions,
      instance: this
    };
    this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TriggersDatagridBeforeColumnsSet, args: colSetHookArgs });
    this.ddeDatagrid.columnDefinitions = columnDefinitions;

    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addTrigger({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteTrigger({ triggerId: args.datagridRow.data[AcEnumDDETrigger.TriggerId] });
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
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TriggersDatagridCellEditorInit, args: hookArgs });
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
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.TriggersDatagridCellRendererInit, args: hookArgs });
      }
    });

    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.DataDictionarySet, callback: () => {
        this.setTriggersData();
      }
    });
    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.Trigger, (args: IAcContextEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcEnumDDETrigger.TriggerId, args.oldValue[AcEnumDDETrigger.TriggerId]);
      }
    });

    this.setTriggersData();
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDETrigger) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initElement() {
    this.ddeDatagrid.element.style.width = "50%";
    this.element.append(this.ddeDatagrid.element);
     this.triggerMaster.element.style.width = "50%";
    this.element.append(this.triggerMaster.element);
    acAddClassToElement({ class_: AcDDECssClassName.acDDEListMasterContainer, element: this.element });
  }

  setTriggersData() {
    this.data = Object.values(this.editorApi.dataStorage.getTriggers({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId }));
    this.applyFilter();
  }

}
