import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellRendererElementInitEvent, IAcDatagridColumnDefinition, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDEDatagridPopoutTextareaInput, AcDDEDatagridSelectInput, AcDDEDatagridSelectTableInput, AcDDETriggerRowKey, AcEnumDDEEntity, AcEnumDDEHook, IAcDDEDatagridCellInitHookArgs, IAcDDETriggerRow } from "../../_ac-data-dictionary-editor.export";
import { AcDDTrigger, AcEnumDDRowOperation } from "@autocode-ts/ac-data-dictionary";
import { AcHooks } from "@autocode-ts/autocode";
import { AcDDEDatagridTextInput } from "../inputs/ac-dde-datagrid-text-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";

export class AcDDETriggersDatagrid {
  ddeDatagrid!: AcDDEDatagrid;
  datagridApi!: AcDatagridApi;
  editorApi!: AcDDEApi;
  element: HTMLElement = document.createElement('div');
  filterFunction: Function | undefined;
  hooks: AcHooks = new AcHooks();
  data: any[] = [];

  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.ddeDatagrid = new AcDDEDatagrid({ editorApi: editorApi });
    this.editorApi = editorApi;
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
      {
        'field': AcDDTrigger.KeyTriggerExecution, 'title': 'Execution',
        cellEditorElement: AcDDEDatagridSelectInput, cellEditorElementParams: {
          editorApi: this.editorApi, selectOptions: [
            { label: 'After', value: 'after' },
            { label: 'Before', value: 'before' }
          ]
        }, useCellEditorForRenderer: true
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
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDTrigger.KeyTableName, 'title': 'Table',
        cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
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
        cellEditorElement: AcDDEDatagridPopoutTextareaInput, cellEditorElementParams: {
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
    this.editorApi.hooks.execute({ hookName: AcEnumDDEHook.TriggersDatagridBeforeColumnsSet, args: colSetHookArgs });
    this.ddeDatagrid.columnDefinitions = columnDefinitions;

    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addTrigger({ data_dictionary_id: this.editorApi.activeDataDictionary?.data_dictionary_id, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteTrigger({ trigger_id: args.datagridRow.data[AcDDETriggerRowKey.triggerId] });
      }
    });
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.CellEditorElementInit, callback: (args: IAcDatagridCellEditorElementInitEvent) => {
        const hookArgs: IAcDDEDatagridCellInitHookArgs = {
          datagridApi: this.datagridApi,
          editorApi: this.editorApi,
          datagridCell: args.datagridCell,
          eventArgs: args,
          instance: this
        };
        this.editorApi.hooks.execute({ hookName: AcEnumDDEHook.TriggersDatagridCellEditorInit, args: hookArgs });
      }
    });
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.CellRendererElementInit, callback: (args: IAcDatagridCellRendererElementInitEvent) => {
        const hookArgs: IAcDDEDatagridCellInitHookArgs = {
          datagridApi: this.datagridApi,
          editorApi: this.editorApi,
          datagridCell: args.datagridCell,
          eventArgs: args,
          instance: this
        };
        this.editorApi.hooks.execute({ hookName: AcEnumDDEHook.TriggersDatagridCellRendererInit, args: hookArgs });
      }
    });

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataDictionarySet, callback: () => {
        this.setTriggersData();
      }
    });
    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.Trigger, (args: IAcReactiveValueProxyEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcDDETriggerRowKey.triggerId, args.oldValue[AcDDETriggerRowKey.triggerId]);
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
    this.data = Object.values(this.editorApi.dataStorage.getTriggers({ dataDictionaryId: this.editorApi.activeDataDictionary?.data_dictionary_id }));
    this.applyFilter();
  }

}
