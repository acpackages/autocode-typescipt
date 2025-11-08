/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcPagination } from "../../ac-pagination/elements/ac-pagination.element";
import { AcDatagrid } from "../elements/ac-datagrid.element";
import { IAcDatagridColumnDefinition } from "../interfaces/ac-datagrid-column-definition.interface";
import { AcDataManager, AcEnumDataManagerEvent, AcEnumSortOrder, AcEvents, AcFilter, AcFilterGroup, AcHooks, AcSortOrder } from "@autocode-ts/autocode";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { IAcDatagridColumnDragPlaceholderCreatorArgs } from "../interfaces/callback-args/ac-datagrid-column-drag-placeholder-creator-args.interface";
import { IAcDatagridRowDragPlaceholderCreatorArgs } from "../interfaces/callback-args/ac-datagrid-row-drag-placeholder-creator-args.interface";
import { IAcDatagridRowPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-row-position-change-event.interface";
import { IAcDatagridColumnPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-column-position-change-event.interface";
import { IAcDatagridColumnSortChangeEvent } from "../interfaces/event-args/ac-datagrid-column-sort-change-event.interface";
import { IAcDatagridColumnFilterChangeEvent } from "../interfaces/event-args/ac-datagrid-column-filter-change-event.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { AcDatagridExtension } from "./ac-datagrid-extension";
import { AcDatagridExtensionManager } from "./ac-datagrid-extension-manager";
import { IAcDatagridColDefsChangeHookArgs } from "../interfaces/hook-args/ac-datagrid-coldefs-change-hook-args.interface";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";
import { AcDatagridColumn } from "../models/ac-datagrid-column.model";
import { AcDatagridCell } from "../models/ac-datagrid-cell.model";
import { IAcDatagridRowAddHookArgs } from "../interfaces/hook-args/ac-datagrid-row-add-hook-args.interface";
import { IAcDatagridRowDeleteHookArgs } from "../interfaces/hook-args/ac-datagrid-row-delete-hook-args.interface";
import { IAcDatagridRowUpdateHookArgs } from "../interfaces/hook-args/ac-datagrid-row-update-hook-args.interface";
import { IAcDatagridRowEvent } from "../interfaces/event-args/ac-datagrid-row-event.interface";
import { AcDatagridEventHandler } from "./ac-datagrid-event-handler";
import { AcEnumDataSourceType } from "../../../enums/ac-enum-data-source-type.enum";
import { IAcDatagridColumnHookArgs } from "../interfaces/hook-args/ac-datagrid-column-hook-args.interface";
import { IAcDatagridUsePaginationChangeHookArgs } from "../interfaces/hook-args/ac-datagrid-use-pagination-change-hook-args.interface";
import { AcDatagridState } from "../models/ac-datagrid-state.model";
import { IAcDatagridRowHookArgs } from "../interfaces/hook-args/ac-datagrid-row-hook-args.interface";
import { IAcDatagridExtensionEnabledHookArgs } from "../interfaces/hook-args/ac-datagrid-extension-enabled-hook-args.interface";
import { IAcDatagridRowFocusHookArgs } from "../interfaces/hook-args/ac-datagrid-row-focus-hook-args.interface";
import { IAcDatagridState } from "../interfaces/ac-datagrid-state.interface";
import { IAcDatagridColumnDefinitionsSetEvent } from "../interfaces/event-args/ac-datagrid-column-definitions-set-event.interface";

export class AcDatagridApi {

  private _columnDefinitions: IAcDatagridColumnDefinition[] = [];
  get columnDefinitions(): IAcDatagridColumnDefinition[] {
    return this._columnDefinitions;
  }
  set columnDefinitions(value: IAcDatagridColumnDefinition[]) {
    const hookArgs: IAcDatagridColDefsChangeHookArgs = {
      columnDefinitions: value,
      datagridApi: this,
      oldColumnDefinitions: this._columnDefinitions
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.BeforeColumnDefinitionsChange, args: hookArgs });
    this._columnDefinitions = value;
    this.datagridColumns = [];


    const usedIndices = new Set<number>();
    const totalColumns = this._columnDefinitions.length;

    // First pass: mark valid indices already assigned
    for (const col of this._columnDefinitions) {
      if (
        typeof col.index === "number" &&
        col.index >= 0 &&
        col.index < totalColumns &&
        !usedIndices.has(col.index)
      ) {
        usedIndices.add(col.index);
      } else {
        // Invalid or duplicate index will be assigned later
        col.index = -1;
      }
    }

    // Second pass: assign missing or invalid indices
    let nextIndex = 0;
    for (const col of this._columnDefinitions) {
      while (usedIndices.has(nextIndex)) {
        nextIndex++;
      }
      if (col.index === -1 || col.index! >= totalColumns) {
        col.index = nextIndex++;
        usedIndices.add(col.index);
      }
    }

    this._columnDefinitions.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));

    // Create AcDatagridColumn instances
    for (const column of this._columnDefinitions) {
      const datagridColumn = new AcDatagridColumn({
        columnDefinition: column,
        datagridApi: this,
        index: column.index
      });
      this.datagridColumns.push(datagridColumn);

      const columnCreatedArgs: IAcDatagridColumnHookArgs = {
        datagridApi: this,
        datagridColumn
      };
      this.hooks.execute({
        hook: AcEnumDatagridHook.DatagridColumnCreate,
        args: columnCreatedArgs
      });
    }

    this.hooks.execute({ hook: AcEnumDatagridHook.ColumnDefinitionsChange, args: hookArgs });
    const event: IAcDatagridColumnDefinitionsSetEvent = {
      columnDefinitions: value,
      datagridColumns: this.datagridColumns,
      datagridApi: this
    };
    this.events.execute({ event: AcEnumDatagridEvent.ColumnDefinitionsSet, args: event });
  }

  get data(): any[] {
    return this.dataManager.data;
  }
  set data(value: any[]) {
    this.dataManager.data = value;
  }

  get datagridRows(): AcDatagridRow[] {
    let result: AcDatagridRow[] = [];
    if (this.dataManager) {
      result = this.dataManager.rows;
    }
    return result;
  }

  get displayedDatagridRows(): AcDatagridRow[] {
    let result: AcDatagridRow[] = [];
    if (this.dataManager) {
      result = this.dataManager.displayedRows;
    }
    return result;
  }

  private _usePagination: boolean = false;
  get usePagination(): boolean {
    return this._usePagination;
  }
  set usePagination(value: boolean) {
    const hookArgs: IAcDatagridUsePaginationChangeHookArgs = {
      usePagination: value,
      datagridApi: this,
      oldUsePagination: this._usePagination
    };
    this._usePagination = value;
    if (value) {
      this.pagination = new AcPagination();
      this.pagination.bindDataManager({ dataManager: this.dataManager });
    }
    this.hooks.execute({ hook: AcEnumDatagridHook.UsePaginationChange, args: hookArgs });
    this.datagrid.datagridFooter.setPagination();
  }

  activeDatagridRow: AcDatagridRow | undefined;
  columnDragPlaceholderElementCreator: Function = (args: IAcDatagridColumnDragPlaceholderCreatorArgs): HTMLElement => {
    const element = document.createElement('span');
    element.innerHTML = args.datagridColumn.title;
    return element;
  };
  rowDragPlaceholderElementCreator: Function = (args: IAcDatagridRowDragPlaceholderCreatorArgs): HTMLElement => {
    const element = document.createElement('span');
    element.innerHTML = args.datagridRow.acRowId;
    return element;
  };
  activeCell?: AcDatagridCell;
  datagrid!: AcDatagrid;
  datagridColumns: AcDatagridColumn[] = [];
  datagridState: AcDatagridState;
  dataManager: AcDataManager<AcDatagridRow> = new AcDataManager(AcDatagridRow);
  eventHandler!: AcDatagridEventHandler;
  events: AcEvents;
  extensions: Record<string, AcDatagridExtension> = {};
  hooks: AcHooks = new AcHooks();
  hoverCellId?: string;
  hoverColumnId?: string;
  hoverRowId?: string;
  lastColumnIndex: number = 0;
  pagination?: AcPagination;

  constructor({ datagrid }: { datagrid: AcDatagrid }) {
    this.datagrid = datagrid;
    this.events = datagrid.events;
    AcDatagridExtensionManager.registerBuiltInExtensions();
    this.dataManager.events = this.events;
    this.dataManager.hooks = this.hooks;
    this.dataManager.on({
      event: AcEnumDataManagerEvent.DataRowInstanceCreate, callback: ({ dataRow }: { dataRow: AcDatagridRow }) => {
        dataRow.datagridApi = this;
      }
    });
    this.dataManager.on({
      event: AcEnumDataManagerEvent.TotalRowsChange, callback: (args: any) => {
        if (!this.usePagination) {
          this.dataManager.setDisplayedRows();
        }
      }
    });
    this.datagridState = new AcDatagridState({ datagridApi: this });
    this.eventHandler = new AcDatagridEventHandler({ datagridApi: this });
  }

  addRow({ data, append = true, highlightCells = false }: { data?: any, append?: boolean, highlightCells?: boolean } = {}) {
    const datagridRow = this.dataManager.addData({ data });
    const hookArgs: IAcDatagridRowHookArgs = {
      datagridApi: this,
      datagridRow: datagridRow,
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.DatagridRowCreate, args: hookArgs });
    const addHookArgs: IAcDatagridRowAddHookArgs = {
      datagridApi: this,
      datagridRow: datagridRow,
      append: append,
      highlightCells: highlightCells
    }
    this.hooks.execute({ hook: AcEnumDatagridHook.RowAdd, args: addHookArgs });
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this,
      datagridRow: datagridRow
    };
    this.events.execute({ event: AcEnumDatagridEvent.RowAdd, args: eventArgs });
  }

  applyFilter({ search }: { search?: string }) {
    this.hooks.execute({ hook: AcEnumDatagridHook.ApplyFilter, args: { search } });
  }

  autoResizeColumn({ datagridColumn }: { datagridColumn: AcDatagridColumn }) {
    let maxWidth: number = 0;
    for (const datagridRow of this.datagridRows) {
      if (datagridRow.element) {
        for (const datagridCell of datagridRow.element.datagridCells) {
          if (datagridCell.datagridColumn.acColumnId == datagridColumn.acColumnId) {
            const cellWidth = datagridCell.container.getBoundingClientRect().width;
            if (cellWidth > maxWidth) {
              maxWidth = cellWidth;
            }
          }
        }
      }
    }
    if (maxWidth > 0) {
      datagridColumn.width = maxWidth + 10;
    }
  }

  deleteRow({ data, rowId, key, value, highlightCells = false }: { data?: any, rowId?: string, key?: string, value?: any, highlightCells?: boolean }) {
    const datagridRow: AcDatagridRow | undefined = this.dataManager.deleteRow({ data, rowId, key, value });
    if (datagridRow) {
      if(datagridRow.element){
        datagridRow.element.remove();
      }
      const deleteHookArgs: IAcDatagridRowDeleteHookArgs = {
        datagridApi: this,
        datagridRow: datagridRow,
        highlightCells: highlightCells
      }
      this.hooks.execute({ hook: AcEnumDatagridHook.RowDelete, args: deleteHookArgs });
      const eventArgs: IAcDatagridRowEvent = {
        datagridApi: this,
        datagridRow: datagridRow
      };
      this.events.execute({ event: AcEnumDatagridEvent.RowDelete, args: eventArgs });
    }
  }

  enableExtension({ extensionName }: { extensionName: string }): AcDatagridExtension | null {
    if (AcDatagridExtensionManager.hasExtension({ extensionName: extensionName })) {
      const extensionInstance = AcDatagridExtensionManager.createInstance({ extensionName: extensionName });
      if (extensionInstance) {
        extensionInstance.datagridApi = this;
        const hookId: string = this.hooks.subscribeAllHooks({
          callback: (hook: string, args: any) => {
            extensionInstance.handleHook({ hook: hook, args: args });
          }
        });
        extensionInstance.hookId = hookId;
        extensionInstance.init();
        this.extensions[extensionName] = extensionInstance;
        const hookArgs: IAcDatagridExtensionEnabledHookArgs = {
          extensionName: extensionName,
          datagridApi: this,
        };
        this.hooks.execute({ hook: AcEnumDatagridHook.ExtensionEnable, args: hookArgs });
        return extensionInstance;
      }
    }
    return null;
  }

  focusFirstRow({ highlightCells }: { highlightCells?: boolean } = {}) {
    this.focusRow({ index: 0, highlightCells: highlightCells });
  }

  focusLastRow({ highlightCells }: { highlightCells?: boolean } = {}) {
    this.focusRow({ index: this.dataManager.totalRows - 1, highlightCells: highlightCells });
  }

  focusRow({ index, highlightCells = false }: { index: number, highlightCells?: boolean }) {
    const hookArgs: IAcDatagridRowFocusHookArgs = {
      datagridApi: this,
      datagridRow: this.datagridRows[index],
      index: index,
      highlightCells: highlightCells
    }
    this.hooks.execute({ hook: AcEnumDatagridHook.RowFocus, args: hookArgs });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event: event, callback: callback });
  }

  getColumnByField({ field }: { field: string }): AcDatagridColumn | undefined {
    let result: AcDatagridColumn | undefined;
    for (const column of this.datagridColumns) {
      if (column.columnDefinition.field == field) {
        result = column;
        break;
      }
    }
    return result;
  }

  getRowById({ rowId }: { rowId: string }): AcDatagridRow | undefined {
    let result: AcDatagridRow | undefined;
    for (const row of this.datagridRows) {
      if (row.acRowId == rowId) {
        result = row;
        break;
      }
    }
    return result;
  }

  getRowByIndex({ index }: { index: number }): AcDatagridRow | undefined {
    let result: AcDatagridRow | undefined;
    for (const row of this.datagridRows) {
      if (row.index == index) {
        result = row;
        break;
      }
    }
    if (result == undefined) {
      console.error(`Cannot find row for index : ${index}`)
    }
    return result;
  }

  getRowByKeyValue({ key, value }: { key: string, value: any }): AcDatagridRow | undefined {
    let result: AcDatagridRow | undefined;
    for (const row of this.datagridRows) {
      if (row.data && row.data[key] == value) {
        result = row;
        break;
      }
    }
    return result;
  }

  getState(): IAcDatagridState {
    this.datagridState.refresh();
    return this.datagridState.toJson();
  }

  refreshRows(): void {
    this.hooks.execute({ hook: AcEnumDatagridHook.RefreshRows, args: {} });
  }

  setColumnFilter({ datagridColumn, filter }: { datagridColumn: AcDatagridColumn, filter: AcFilter }) {
    const oldFilterGroup: AcFilterGroup = datagridColumn.filterGroup.cloneInstance();;
    datagridColumn.filterGroup.addFilterModel({ filter: filter });
    const eventArgs: IAcDatagridColumnFilterChangeEvent = {
      datagridColumn: datagridColumn,
      oldFilterGroup: oldFilterGroup,
      filterGroup: datagridColumn.filterGroup,
      datagridApi: this
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.ColumnFilterChange, args: eventArgs });
    datagridColumn.hooks.execute({ hook: AcEnumDatagridHook.ColumnFilterChange, args: eventArgs });
    this.events.execute({ event: AcEnumDatagridEvent.ColumnFilterChange, args: eventArgs });
  }

  setColumnSortOrder({ datagridColumn, sortOrder }: { datagridColumn: AcDatagridColumn, sortOrder: AcEnumSortOrder }) {
    const oldSortOrder: AcEnumSortOrder = datagridColumn.sortOrder;
    datagridColumn.sortOrder = sortOrder;
    if (sortOrder != AcEnumSortOrder.None) {
      this.dataManager.sortOrder.addSort({ key: datagridColumn.columnDefinition.field, order: sortOrder });
    }
    else {
      this.dataManager.sortOrder.removeSort({ key: datagridColumn.columnDefinition.field });
    }
    const eventArgs: IAcDatagridColumnSortChangeEvent = {
      datagridColumn: datagridColumn,
      oldSortOrder: oldSortOrder,
      sortOrder: datagridColumn.sortOrder,
      datagridApi: this
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.ColumnSortChange, args: eventArgs });
    datagridColumn.hooks.execute({ hook: AcEnumDatagridHook.ColumnSortChange, args: eventArgs });
    this.events.execute({ event: AcEnumDatagridEvent.ColumnSortChange, args: eventArgs });
    this.dataManager.processRows();
  }

  setDataSourceType({ dataSourceType }: { dataSourceType: AcEnumDataSourceType }) {
    //
  }

  setActiveCell({ rowIndex, columnIndex, datagridCell }: { rowIndex?: number, columnIndex?: number, datagridCell?: AcDatagridCell }) {
    if (!datagridCell) {
      if (rowIndex != undefined && columnIndex != undefined && rowIndex > -1 && columnIndex > -1) {
        const datagridRow = this.getRowByIndex({ index: rowIndex });
        if (datagridRow) {
          datagridCell = datagridRow.getCellByColumnIndex({ index: columnIndex });
        }
      }
    }
    if (datagridCell) {
      if (this.activeCell && this.activeCell != datagridCell) {
        if (this.activeCell.element) {
          if (this.activeCell.element.isEditing) {
            this.activeCell.element.exitEditMode();
          }
        }
        this.activeCell.isActive = false;
      }
      datagridCell.isActive = true;
      if (datagridCell.element) {
        datagridCell.element.focus();
      }
      this.activeCell = datagridCell;
    }
  }

  setState({ state }: { state: IAcDatagridState }) {
    this.datagridState.apply(state);
  }

  updateColumnPosition({ datagidColumn, oldDatagridColumn }: { datagidColumn: AcDatagridColumn, oldDatagridColumn: AcDatagridColumn }) {
    const eventArgs: IAcDatagridColumnPositionChangeEvent = {
      oldDatagridColumn: oldDatagridColumn,
      datagridColumn: datagidColumn,
      datagridApi: this
    };
    this.events.execute({ event: AcEnumDatagridEvent.ColumnPositionChange, args: eventArgs });
  }

  updateRowPosition({ datagridRow, oldDatagridRow }: { datagridRow: AcDatagridRow, oldDatagridRow: AcDatagridRow }) {
    const eventArgs: IAcDatagridRowPositionChangeEvent = {
      oldDatagridRow: oldDatagridRow,
      datagridRow: datagridRow,
      datagridApi: this
    };
    this.events.execute({ event: AcEnumDatagridEvent.RowPositionChange, args: eventArgs });
  }

  // PENDING
  updateRow({ data, value, key, rowId, highlightCells = true, addIfMissing = false }: { data: any, value?: any, key?: string, rowId?: string, highlightCells?: boolean, addIfMissing?: boolean }):AcDatagridRow|undefined {
    const datagridRow: AcDatagridRow | undefined = this.dataManager.updateRow({ data, value, key, rowId, addIfMissing });
    if (datagridRow) {
      if (highlightCells) {
        for (const cell of datagridRow.datagridCells) {
          cell.element!.cellRenderer.refresh({ datagridApi: this, datagridCell: cell });
        }
      }
    }
    return datagridRow;
  }

}
