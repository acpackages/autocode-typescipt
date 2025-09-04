/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcDDEApi } from "../../core/ac-dde-api";
import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridCellRendererElementInitEvent, IAcDatagridColumnDefinition, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEDatagridSelectTableInput } from "../inputs/ac-dde-datagrid-select-table-input.element";
import { AcDDEDatagridSelectTableColumnInput } from "../inputs/ac-dde-datagrid-select-table-column-input.element";
import { AcDDEDatagridYesNoInput } from "../inputs/ac-dde-datagrid-yes-no-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { IAcDDEDatagridBeforeColumnsSetInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-before-columns-set-hook-args.interface";
import { IAcDDERelationship } from "../../interfaces/ac-dde-relationship.inteface";
import { AcEnumDDERelationship } from "../../enums/ac-enum-dde-storage-keys.enum";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";
import { IAcDDETableColumn } from "../../interfaces/ac-dde-table-column.inteface";
import { IAcDDEDatagridCellInitHookArgs } from "../../interfaces/hook-args/ac-dde-datagrid-cell-init-hook-args.interface";
import { AcEnumDDEEntity } from "../../enums/ac-enum-dde-entity.enum";
import { AcDDECssClassName } from "../../consts/ac-dde-css-class-name.const";
import { IAcDDEActiveDataDictionaryChangeHookArgs } from "../../interfaces/hook-args/ac-dde-active-data-dictionary-change-hook-args.interface";

export class AcDDERelationshipsDatagrid {
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
        this.setRelationshipsData();
      }
    });
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDERelationship) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
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
        'field': AcEnumDDERelationship.DestinationTableId, 'title': 'Foreign Key Table',
        cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcEnumDDERelationship.DestinationColumnId, 'title': 'Foreign Key Column',
        cellEditorElement: AcDDEDatagridSelectTableColumnInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcEnumDDERelationship.SourceTableId, 'title': 'Primary Key Table',
        cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcEnumDDERelationship.SourceColumnId, 'title': 'Primary Key Column',
        cellEditorElement: AcDDEDatagridSelectTableColumnInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcEnumDDERelationship.CascadeDeleteSource, 'title': 'Cascade Delete Source',
        cellEditorElement: AcDDEDatagridYesNoInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true,allowFilter:true
      },
      {
        'field': AcEnumDDERelationship.CascadeDeleteDestination, 'title': 'Cascade Delete Destination',
        cellEditorElement: AcDDEDatagridYesNoInput, cellEditorElementParams: {
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
    this.editorApi.hooks.execute({ hook: AcEnumDDEHook.RelationshipDatagridBeforeColumnsSet, args: colSetHookArgs });
    this.ddeDatagrid.columnDefinitions = columnDefinitions;

    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addRelationship({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteRelationship({ relationshipId: args.datagridRow.data[AcEnumDDERelationship.RelationshipId] });
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.CellEditorElementInit, callback: (args: IAcDatagridCellEditorElementInitEvent) => {
        const datagridRow = args.datagridCell.datagridRow;
        if (args.datagridCell.columnKey == AcEnumDDERelationship.DestinationColumnId) {
          const selectColumnInput: AcDDEDatagridSelectTableColumnInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableColumnInput;
          selectColumnInput.filter = (row: IAcDDETableColumn) => {
            return row.tableId == datagridRow.data[AcEnumDDERelationship.DestinationTableId];
          };
          selectColumnInput.setOptions();
        }
        else if (args.datagridCell.columnKey == AcEnumDDERelationship.SourceColumnId) {
          const selectColumnInput: AcDDEDatagridSelectTableColumnInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableColumnInput;
          selectColumnInput.selectInput.name = AcEnumDDERelationship.SourceColumnId;
          selectColumnInput.filter = (row: IAcDDETableColumn) => {
            return row.tableId == datagridRow.data[AcEnumDDERelationship.SourceTableId];
          };
          selectColumnInput.setOptions();
        }
        else if (args.datagridCell.columnKey == AcEnumDDERelationship.SourceTableId) {
          const selectTableInput: AcDDEDatagridSelectTableInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableInput;
          args.datagridCell.on({
            event: AcEnumDatagridEvent.CellValueChange, callback: (args: any) => {
              const sourceColumnCell = datagridRow.datagridCells.find((cell) => {
                return cell.columnKey == AcEnumDDERelationship.SourceColumnId;
              });
              if (sourceColumnCell && sourceColumnCell.instance && sourceColumnCell.instance.cellEditor) {
                const selectColumnInput: AcDDEDatagridSelectTableColumnInput = sourceColumnCell.instance.cellEditor as any;
                selectColumnInput.setOptions();
              }
            }
          });
        }
        else if (args.datagridCell.columnKey == AcEnumDDERelationship.DestinationTableId) {
          const selectTableInput: AcDDEDatagridSelectTableInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableInput;
          args.datagridCell.on({
            event: AcEnumDatagridEvent.CellValueChange, callback: (args: any) => {
              const destinationColumnCell = datagridRow.datagridCells.find((cell) => {
                return cell.columnKey == AcEnumDDERelationship.DestinationColumnId;
              });
              if (destinationColumnCell && destinationColumnCell.instance && destinationColumnCell.instance.cellEditor) {
                const selectColumnInput: AcDDEDatagridSelectTableColumnInput = destinationColumnCell.instance.cellEditor as any;
                selectColumnInput.setOptions();
              }
            }
          });
        }
        const hookArgs: IAcDDEDatagridCellInitHookArgs = {
          datagridApi: this.datagridApi,
          editorApi: this.editorApi,
          datagridCell: args.datagridCell,
          eventArgs: args,
          instance: this
        };
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.RelationshipDatagridCellEditorInit, args: hookArgs });
      }
    });
    this.datagridApi.on({
      event: AcEnumDatagridEvent.CellEditorElementInit, callback: (args: IAcDatagridCellRendererElementInitEvent) => {
        const hookArgs: IAcDDEDatagridCellInitHookArgs = {
          datagridApi: this.datagridApi,
          editorApi: this.editorApi,
          datagridCell: args.datagridCell,
          eventArgs: args,
          instance: this
        };
        this.editorApi.hooks.execute({ hook: AcEnumDDEHook.RelationshipDatagridCellRendererInit, args: hookArgs });
      }
    });

    this.editorApi.hooks.subscribe({
      hook: AcEnumDDEHook.DataDictionarySet, callback: () => {
        this.setRelationshipsData();
      }
    });
    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.Relationship, (args: IAcReactiveValueProxyEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcEnumDDERelationship.RelationshipId, args.oldValue[AcEnumDDERelationship.RelationshipId]);
      }
    });

    this.setRelationshipsData();
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ class_: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setRelationshipsData() {
    this.data = Object.values(this.editorApi.dataStorage.getRelationships({ dataDictionaryId: this.editorApi.activeDataDictionary?.dataDictionaryId }));
    this.applyFilter();
  }
}
