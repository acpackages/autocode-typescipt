/* eslint-disable @typescript-eslint/no-non-null-assertion */

import { AcDDEApi } from "../../core/ac-dde-api";
import { AcDDECssClassName, AcDDERelationshipRowKey, AcDDETableColumnRowKey, AcEnumDDEEntity, AcEnumDDEHook, IAcDDERelationshipRow, IAcDDETableColumnRow } from "../../_ac-data-dictionary-editor.export";
import { acAddClassToElement, AcDatagridApi, AcEnumDatagridEvent, AcEnumInputEvent, IAcDatagridCellEditorElementInitEvent, IAcDatagridRowEvent } from "@autocode-ts/ac-browser";
import { AcDDEDatagridSelectTableInput } from "../inputs/ac-dde-datagrid-select-table-input.element";
import { AcDDEDatagridSelectTableColumnInput } from "../inputs/ac-dde-datagrid-select-table-column-input.element";
import { AcDDEDatagridYesNoInput } from "../inputs/ac-dde-datagrid-yes-no-input.element";
import { AcDDEDatagrid } from "./ac-dde-datagrid.element";
import { AcDDEDatagridRowAction } from "../shared/ac-dde-datagrid-row-action.element";
import { IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { arrayRemove, arrayRemoveByKey } from "@autocode-ts/ac-extensions";

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
  }

  applyFilter() {
    let data = this.data;
    if (this.filterFunction != undefined) {
      data = data.filter((item: IAcDDERelationshipRow) => this.filterFunction!(item));
    }
    this.datagridApi.data = data;
  }

  initDatagrid() {
    this.datagridApi = this.ddeDatagrid.datagridApi;
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowAdd, callback: (args: IAcDatagridRowEvent) => {
        const row = this.editorApi.dataStorage.addRelationship({ data_dictionary_id: this.editorApi.activeDataDictionary?.data_dictionary_id, ...args.datagridRow.data });
        args.datagridRow.data = row;
        this.data.push(row);
      }
    });
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.RowDelete, callback: (args: IAcDatagridRowEvent) => {
        this.editorApi.dataStorage.deleteRelationship({ relationship_id: args.datagridRow.data[AcDDERelationshipRowKey.relationshipId] });
      }
    });
    this.datagridApi.on({
      eventName: AcEnumDatagridEvent.CellEditorElementInit, callback: (args: IAcDatagridCellEditorElementInitEvent) => {
        const datagridRow = args.datagridCell.datagridRow;
        if (args.datagridCell.columnKey == AcDDERelationshipRowKey.destinationColumnId) {
          const selectColumnInput: AcDDEDatagridSelectTableColumnInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableColumnInput;
          selectColumnInput.filter = (row: IAcDDETableColumnRow) => {
            return row.table_id == datagridRow.data[AcDDERelationshipRowKey.destinationTableId];
          };
          selectColumnInput.setOptions();
        }
        else if (args.datagridCell.columnKey == AcDDERelationshipRowKey.sourceColumnId) {
          const selectColumnInput: AcDDEDatagridSelectTableColumnInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableColumnInput;
          selectColumnInput.selectInput.name = AcDDERelationshipRowKey.sourceColumnId;
          selectColumnInput.filter = (row: IAcDDETableColumnRow) => {
            return row.table_id == datagridRow.data[AcDDERelationshipRowKey.sourceTableId];
          };
          selectColumnInput.setOptions();
        }
        else if (args.datagridCell.columnKey == AcDDERelationshipRowKey.sourceTableId) {
          const selectTableInput: AcDDEDatagridSelectTableInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableInput;
          args.datagridCell.on({
            eventName: AcEnumDatagridEvent.CellValueChange, callback: (args: any) => {
              const sourceColumnCell = datagridRow.datagridCells.find((cell) => {
                return cell.columnKey == AcDDERelationshipRowKey.sourceColumnId;
              });
              if (sourceColumnCell && sourceColumnCell.instance && sourceColumnCell.instance.cellEditor) {
                const selectColumnInput: AcDDEDatagridSelectTableColumnInput = sourceColumnCell.instance.cellEditor as any;
                selectColumnInput.setOptions();
              }
            }
          });
        }
        else if (args.datagridCell.columnKey == AcDDERelationshipRowKey.destinationTableId) {
          const selectTableInput: AcDDEDatagridSelectTableInput = args.cellEditorElementInstance as AcDDEDatagridSelectTableInput;
          args.datagridCell.on({
            eventName: AcEnumDatagridEvent.CellValueChange, callback: (args: any) => {
              const destinationColumnCell = datagridRow.datagridCells.find((cell) => {
                return cell.columnKey == AcDDERelationshipRowKey.destinationColumnId;
              });
              if (destinationColumnCell && destinationColumnCell.instance && destinationColumnCell.instance.cellEditor) {
                const selectColumnInput: AcDDEDatagridSelectTableColumnInput = destinationColumnCell.instance.cellEditor as any;
                selectColumnInput.setOptions();
              }
            }
          });
        }
      }
    })
    this.ddeDatagrid.columnDefinitions = [
      {
        'field': '', 'title': '', cellRendererElement: AcDDEDatagridRowAction, cellRendererElementParams: {
          editorApi: this.editorApi
        }, width: 50, maxWidth: 50, minWidth: 50
      },
      {
        'field': AcDDERelationshipRowKey.destinationTableId, 'title': 'Foreign Key Table',
        cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDERelationshipRowKey.destinationColumnId, 'title': 'Foreign Key Column',
        cellEditorElement: AcDDEDatagridSelectTableColumnInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDERelationshipRowKey.sourceTableId, 'title': 'Primary Key Table',
        cellEditorElement: AcDDEDatagridSelectTableInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDERelationshipRowKey.sourceColumnId, 'title': 'Primary Key Column',
        cellEditorElement: AcDDEDatagridSelectTableColumnInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDERelationshipRowKey.cascadeDeleteSource, 'title': 'Cascade Delete Source',
        cellEditorElement: AcDDEDatagridYesNoInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      },
      {
        'field': AcDDERelationshipRowKey.cascadeDeleteDestination, 'title': 'Cascade Delete Destination',
        cellEditorElement: AcDDEDatagridYesNoInput, cellEditorElementParams: {
          editorApi: this.editorApi
        }, useCellEditorForRenderer: true
      }
    ];

    this.editorApi.hooks.subscribe({
      hookName: AcEnumDDEHook.DataDictionarySet, callback: () => {
        this.setRelationshipsData();
      }
    });

    this.editorApi.dataStorage.on('change', AcEnumDDEEntity.Relationship, (args: IAcReactiveValueProxyEvent) => {
      if (args.event == 'delete') {
        arrayRemoveByKey(this.data, AcDDERelationshipRowKey.relationshipId, args.oldValue[AcDDERelationshipRowKey.relationshipId]);
      }
    });

    this.setRelationshipsData();
  }

  initElement() {
    this.element.append(this.ddeDatagrid.element);
    acAddClassToElement({ cssClass: AcDDECssClassName.acDDEContainer, element: this.element });
  }

  setRelationshipsData() {
    this.data = Object.values(this.editorApi.dataStorage.getRelationships({ dataDictionaryId: this.editorApi.activeDataDictionary?.data_dictionary_id }));
    this.applyFilter();
  }
}
