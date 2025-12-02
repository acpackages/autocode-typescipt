/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcPagination } from "../../ac-pagination/elements/ac-pagination.element";
import { AcDatagrid } from "../elements/ac-datagrid.element";
import { IAcDatagridColumnDefinition } from "../interfaces/ac-datagrid-column-definition.interface";
import { AcDataManager, AcEnumDataManagerEvent, AcEnumSortOrder, AcEvents, AcFilter, AcFilterGroup, AcHooks, AcLogger, AcSortOrder, IAcDataManagerDataEvent } from "@autocode-ts/autocode";
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
import { AC_DATAGRID_DEFAULT_COLUMN_DEFINITION } from "../_ac-datagrid.export";
import { isValidDateString, isValidDateTimeString } from "@autocode-ts/ac-extensions";

export class AcDatagridApi {
  private _bodyWidth:number = 0;
  get bodyWidth(): number {
    return this._bodyWidth;
  }
  set bodyWidth(value: number) {
    this._bodyWidth = value;
  }

  private _columnDefinitions: IAcDatagridColumnDefinition[] = [];
  get columnDefinitions(): IAcDatagridColumnDefinition[] {
    this.logger.log('Getting column definitions', { count: this._columnDefinitions.length });
    return this._columnDefinitions;
  }
  set columnDefinitions(value: IAcDatagridColumnDefinition[]) {
    this.logger.log('Setting column definitions', { oldCount: this._columnDefinitions.length, newCount: value.length });
    const hookArgs: IAcDatagridColDefsChangeHookArgs = {
      columnDefinitions: value,
      datagridApi: this,
      oldColumnDefinitions: this._columnDefinitions
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.BeforeColumnDefinitionsChange, args: hookArgs });
    this.logger.log('Executed BeforeColumnDefinitionsChange hook');
    this._columnDefinitions = value;
    this.datagridColumns = [];
    this.logger.log('Cleared existing datagridColumns');

    const usedIndices = new Set<number>();
    const totalColumns = this._columnDefinitions.length;

    for (const col of this._columnDefinitions) {
      if (
        typeof col.index === "number" &&
        col.index >= 0 &&
        col.index < totalColumns &&
        !usedIndices.has(col.index)
      ) {
        usedIndices.add(col.index);
        this.logger.log('Valid index found for column', { field: col.field, index: col.index });
      } else {
        col.index = -1;
        this.logger.log('Invalid index reset for column', { field: col.field });
      }
    }

    let nextIndex = 0;
    for (const col of this._columnDefinitions) {
      while (usedIndices.has(nextIndex)) {
        nextIndex++;
      }
      if (col.index === -1 || col.index! >= totalColumns) {
        col.index = nextIndex++;
        usedIndices.add(col.index);
        this.logger.log('Assigned new index to column', { field: col.field, index: col.index });
      }
    }

    this._columnDefinitions.sort((a, b) => (a.index ?? 0) - (b.index ?? 0));
    this.logger.log('Sorted column definitions by index');

    for (const colDef of this._columnDefinitions) {
      const column = { ...AC_DATAGRID_DEFAULT_COLUMN_DEFINITION, ...colDef };
      const datagridColumn = new AcDatagridColumn({
        columnDefinition: column,
        datagridApi: this,
        index: column.index
      });
      this.datagridColumns.push(datagridColumn);
      this.logger.log('Created and added datagridColumn', { field: colDef.field, index: column.index });

      const columnCreatedArgs: IAcDatagridColumnHookArgs = {
        datagridApi: this,
        datagridColumn
      };
      this.hooks.execute({
        hook: AcEnumDatagridHook.DatagridColumnCreate,
        args: columnCreatedArgs
      });
      this.logger.log('Executed DatagridColumnCreate hook for column', { field: colDef.field });
    }

    this.hooks.execute({ hook: AcEnumDatagridHook.ColumnDefinitionsChange, args: hookArgs });
    this.logger.log('Executed ColumnDefinitionsChange hook');
    const event: IAcDatagridColumnDefinitionsSetEvent = {
      columnDefinitions: value,
      datagridColumns: this.datagridColumns,
      datagridApi: this
    };
    this.events.execute({ event: AcEnumDatagridEvent.ColumnDefinitionsSet, args: event });
    this.logger.log('Executed ColumnDefinitionsSet event');
  }

  get data(): any[] {
    this.logger.log('Getting data', { count: this.dataManager.data.length });
    return this.dataManager.data;
  }
  set data(value: any[]) {
    this.logger.log('Setting data', { oldCount: this.dataManager.data.length, newCount: value.length });
    this.dataManager.data = value;
    this.logger.log('Data set successfully');
  }

  get datagridRows(): AcDatagridRow[] {
    let result: AcDatagridRow[] = [];
    if (this.dataManager) {
      result = this.dataManager.rows;
    }
    this.logger.log('Getting datagridRows', { count: result.length });
    return result;
  }

  get displayedDatagridRows(): AcDatagridRow[] {
    let result: AcDatagridRow[] = [];
    if (this.dataManager) {
      result = this.dataManager.displayedRows;
    }
    this.logger.log('Getting displayedDatagridRows', { count: result.length });
    return result;
  }

  private _usePagination: boolean = true;
  get usePagination(): boolean {
    this.logger.log('Getting usePagination', { value: this._usePagination });
    return this._usePagination;
  }
  set usePagination(value: boolean) {
    this.logger.log('Setting usePagination', { oldValue: this._usePagination, newValue: value });
    const hookArgs: IAcDatagridUsePaginationChangeHookArgs = {
      usePagination: value,
      datagridApi: this,
      oldUsePagination: this._usePagination
    };
    this._usePagination = value;
    if (value) {
      this.pagination = new AcPagination();
      this.pagination.bindDataManager({ dataManager: this.dataManager });
      this.logger.log('Created and bound pagination');
    } else {
      this.logger.log('Pagination disabled, no action taken');
    }
    this.hooks.execute({ hook: AcEnumDatagridHook.UsePaginationChange, args: hookArgs });
    this.logger.log('Executed UsePaginationChange hook');
    this.datagrid.datagridFooter.setPagination();
    this.logger.log('Updated datagrid footer pagination');
  }

  private _useVirtualScrolling: boolean = false;
  get useVirtualScrolling(): boolean {
    return this._useVirtualScrolling;
  }
  set useVirtualScrolling(value: boolean) {
    this._useVirtualScrolling = value;
  }

  activeDatagridRow: AcDatagridRow | undefined;
  columnDragPlaceholderElementCreator: Function = (args: IAcDatagridColumnDragPlaceholderCreatorArgs): HTMLElement => {
    const element = document.createElement('span');
    element.innerHTML = args.datagridColumn.title;
    this.logger.log('Created column drag placeholder', { title: args.datagridColumn.title });
    return element;
  };
  rowDragPlaceholderElementCreator: Function = (args: IAcDatagridRowDragPlaceholderCreatorArgs): HTMLElement => {
    const element = document.createElement('span');
    element.innerHTML = args.datagridRow.rowId;
    this.logger.log('Created row drag placeholder', { rowId: args.datagridRow.rowId });
    return element;
  };
  activeCell?: AcDatagridCell;
  dataTypeIdentified: boolean = false;
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
  logger: AcLogger = new AcLogger({ logMessages: false });
  pagination?: AcPagination;
  rowValueChangeTimeoutDuration = 250;

  constructor({ datagrid }: { datagrid: AcDatagrid }) {
    this.logger.log('Initializing AcDatagridApi', { datagridId: datagrid.id || 'unknown' });
    this.datagrid = datagrid;
    this.dataManager.logger = this.logger;
    this.events = datagrid.events;
    this.logger.log('Assigned datagrid and events');
    AcDatagridExtensionManager.registerBuiltInExtensions();
    this.logger.log('Registered built-in extensions');
    this.dataManager.events = this.events;
    this.dataManager.hooks = this.hooks;
    this.logger.log('Assigned events and hooks to dataManager');
    this.dataManager.on({
      event: AcEnumDataManagerEvent.DataFoundForFirstTime, callback: (args: IAcDataManagerDataEvent) => {
        const data: any = args.data;
        const pendingColumnTypes:any[] = [];
        for (const datagridColumn of this.datagridColumns) {
          const column = datagridColumn.columnDefinition;
          if (!column.dataType) {
            pendingColumnTypes.push(column.field);
            let typeSet = false;
            let inferredType: "BOOLEAN" | "CUSTOM" | "DATE" | "DATETIME" | "NUMBER" | "OBJECT" | "STRING" | "UNKNOWN" = "UNKNOWN";
            for (const row of data) {
              const value = row[column.field];
              if (value !== undefined && value !== null) {
                switch (typeof value) {
                  case 'boolean':
                    inferredType = 'BOOLEAN';
                    break;
                  case 'number':
                  case 'bigint':
                    inferredType = 'NUMBER';
                    break;
                  case 'string':
                    inferredType = 'STRING';
                    const trimmedValue = value.trim();
                    if (trimmedValue === '') {
                      inferredType = 'STRING';
                    } else {
                      if(isValidDateString(trimmedValue)){
                        inferredType = 'DATE';
                      }
                      else  if(isValidDateTimeString(trimmedValue)){
                        inferredType = 'DATETIME';
                      }
                    }
                    break;
                  case 'object':
                    if (Array.isArray(value)) {
                      inferredType = 'OBJECT';
                    } else {
                      inferredType = 'OBJECT';
                    }
                    break;
                  default:
                    inferredType = 'UNKNOWN';
                    break;
                }
                if (inferredType !== 'UNKNOWN') {
                  column.dataType = inferredType;
                  typeSet = true;
                  break;
                }
              }
            }
            if (!typeSet) {
              column.dataType = 'UNKNOWN';
            }
          }

        }
      }
    });
    this.dataManager.on({
      event: AcEnumDataManagerEvent.DataRowInstanceCreate, callback: ({ dataRow }: { dataRow: AcDatagridRow }) => {
        dataRow.datagridApi = this;
        // this.logger.log('Assigned datagridApi to dataRow', { rowId: dataRow.rowId });
      }
    });
    this.dataManager.on({
      event: AcEnumDataManagerEvent.TotalRowsChange, callback: (args: any) => {
        this.logger.log('TotalRowsChange event in dataManager', args);
        if (!this.usePagination) {
          this.dataManager.setDisplayedRows();
          this.logger.log('Set displayed rows due to total rows change (no pagination)');
        }
      }
    });
    this.datagridState = new AcDatagridState({ datagridApi: this });
    this.logger.log('Initialized datagridState');
    this.eventHandler = new AcDatagridEventHandler({ datagridApi: this });
    this.logger.log('Initialized eventHandler');
    this.logger.log('AcDatagridApi initialization complete');
  }

  addRow({ data, append = true, highlightCells = false }: { data?: any, append?: boolean, highlightCells?: boolean } = {}) {
    this.logger.log('Adding row', { data: data ? '[provided]' : 'undefined', append, highlightCells });
    const datagridRow = this.dataManager.addData({ data });
    this.logger.log('Added data to dataManager, created datagridRow', { rowId: datagridRow.rowId });
    const hookArgs: IAcDatagridRowHookArgs = {
      datagridApi: this,
      datagridRow: datagridRow,
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.DatagridRowCreate, args: hookArgs });
    this.logger.log('Executed DatagridRowCreate hook');
    const addHookArgs: IAcDatagridRowAddHookArgs = {
      datagridApi: this,
      datagridRow: datagridRow,
      append: append,
      highlightCells: highlightCells
    }
    this.hooks.execute({ hook: AcEnumDatagridHook.RowAdd, args: addHookArgs });
    this.logger.log('Executed RowAdd hook');
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this,
      datagridRow: datagridRow
    };
    this.events.execute({ event: AcEnumDatagridEvent.RowAdd, args: eventArgs });
    this.logger.log('Executed RowAdd event');
  }

  applyFilter({ search }: { search?: string }) {
    this.logger.log('Applying filter', { search });
    this.hooks.execute({ hook: AcEnumDatagridHook.ApplyFilter, args: { search } });
    this.logger.log('Executed ApplyFilter hook');
  }

  autoResizeColumn({ datagridColumn }: { datagridColumn: AcDatagridColumn }) {
    this.logger.log('Auto-resizing column', { field: datagridColumn.columnDefinition.field });
    let maxWidth: number = 0;
    for (const datagridRow of this.datagridRows) {
      if (datagridRow.element) {
        for (const datagridCell of datagridRow.element.datagridCells) {
          if (datagridCell.datagridColumn.columnId == datagridColumn.columnId) {
            const cellWidth = datagridCell.containerWidth;
            if (cellWidth > maxWidth) {
              maxWidth = cellWidth;
              this.logger.log('Updated maxWidth for cell', { rowId: datagridRow.rowId, width: maxWidth });
            }
          }
        }
      }
    }
    if (maxWidth > 0) {
      datagridColumn.width = maxWidth + 10;
      this.logger.log('Set column width', { field: datagridColumn.columnDefinition.field, width: datagridColumn.width });
    } else {
      this.logger.log('No valid width found, skipping resize');
    }
  }

  deleteRow({ data, rowId, key, value, highlightCells = false }: { data?: any, rowId?: string, key?: string, value?: any, highlightCells?: boolean }) {
    this.logger.log('Deleting row', { rowId, key, value: value ? '[provided]' : 'undefined', highlightCells });
    const datagridRow: AcDatagridRow | undefined = this.dataManager.deleteRow({ data, rowId, key, value });
    if (datagridRow) {
      this.logger.log('Row deleted from dataManager', { rowId: datagridRow.rowId });
      if (datagridRow.element) {
        datagridRow.element.remove();
        this.logger.log('Removed row element from DOM');
      }
      const deleteHookArgs: IAcDatagridRowDeleteHookArgs = {
        datagridApi: this,
        datagridRow: datagridRow,
        highlightCells: highlightCells
      }
      this.hooks.execute({ hook: AcEnumDatagridHook.RowDelete, args: deleteHookArgs });
      this.logger.log('Executed RowDelete hook');
      const eventArgs: IAcDatagridRowEvent = {
        datagridApi: this,
        datagridRow: datagridRow
      };
      this.events.execute({ event: AcEnumDatagridEvent.RowDelete, args: eventArgs });
      this.logger.log('Executed RowDelete event');
    } else {
      this.logger.log('No row found to delete');
    }
  }

  enableExtension({ extensionName }: { extensionName: string }): AcDatagridExtension | null {
    this.logger.log('Enabling extension', { extensionName });
    if (AcDatagridExtensionManager.hasExtension({ extensionName: extensionName })) {
      this.logger.log('Extension found, creating instance');
      const extensionInstance = AcDatagridExtensionManager.createInstance({ extensionName: extensionName });
      if (extensionInstance) {
        extensionInstance.datagridApi = this;
        const hookId: string = this.hooks.subscribeAllHooks({
          callback: (hook: string, args: any) => {
            extensionInstance.handleHook({ hook: hook, args: args });
          }
        });
        extensionInstance.hookId = hookId;
        this.logger.log('Subscribed hooks to extension', { hookId, extensionName });
        extensionInstance.init();
        this.logger.log('Initialized extension');
        this.extensions[extensionName] = extensionInstance;
        const hookArgs: IAcDatagridExtensionEnabledHookArgs = {
          extensionName: extensionName,
          datagridApi: this,
        };
        this.hooks.execute({ hook: AcEnumDatagridHook.ExtensionEnable, args: hookArgs });
        this.logger.log('Executed ExtensionEnable hook');
        return extensionInstance;
      } else {
        this.logger.log('Failed to create extension instance');
      }
    } else {
      this.logger.log('Extension not found');
    }
    return null;
  }

  focusFirstRow({ highlightCells }: { highlightCells?: boolean } = {}) {
    this.logger.log('Focusing first row', { highlightCells });
    this.focusRow({ index: 0, highlightCells: highlightCells });
  }

  focusLastRow({ highlightCells }: { highlightCells?: boolean } = {}) {
    this.logger.log('Focusing last row', { highlightCells, totalRows: this.dataManager.totalRows });
    this.focusRow({ index: this.dataManager.totalRows - 1, highlightCells: highlightCells });
  }

  focusRow({ index, highlightCells = false }: { index: number, highlightCells?: boolean }) {
    this.logger.log('Focusing row', { index, highlightCells });
    const datagridRow = this.datagridRows[index];
    if (datagridRow) {
      const hookArgs: IAcDatagridRowFocusHookArgs = {
        datagridApi: this,
        datagridRow: datagridRow,
        index: index,
        highlightCells: highlightCells
      }
      this.hooks.execute({ hook: AcEnumDatagridHook.RowFocus, args: hookArgs });
      this.logger.log('Executed RowFocus hook', { rowId: datagridRow.rowId });
    } else {
      this.logger.log('Row not found for focus', { index });
    }
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    this.logger.log('Subscribing to event', { event });
    const subscriptionId = this.events.subscribe({ event: event, callback: callback });
    this.logger.log('Subscribed to event', { event, subscriptionId });
    return subscriptionId;
  }

  getColumnByField({ field }: { field: string }): AcDatagridColumn | undefined {
    this.logger.log('Getting column by field', { field });
    let result: AcDatagridColumn | undefined;
    for (const column of this.datagridColumns) {
      if (column.columnDefinition.field == field) {
        result = column;
        this.logger.log('Found column by field', { field, columnId: result.columnId });
        break;
      }
    }
    if (!result) {
      this.logger.log('No column found for field', { field });
    }
    return result;
  }

  getRowById({ rowId }: { rowId: string }): AcDatagridRow | undefined {
    this.logger.log('Getting row by ID', { rowId });
    let result: AcDatagridRow | undefined;
    for (const row of this.datagridRows) {
      if (row.rowId == rowId) {
        result = row;
        this.logger.log('Found row by ID', { rowId });
        break;
      }
    }
    if (!result) {
      this.logger.log('No row found for ID', { rowId });
    }
    return result;
  }

  getRowByIndex({ index }: { index: number }): AcDatagridRow | undefined {
    this.logger.log('Getting row by index', { index });
    let result: AcDatagridRow | undefined;
    for (const row of this.datagridRows) {
      if (row.index == index) {
        result = row;
        this.logger.log('Found row by index', { index, rowId: result.rowId });
        break;
      }
    }
    if (result == undefined) {
      console.error(`Cannot find row for index : ${index}`);
      this.logger.log('Error: No row found for index', { index });
    }
    return result;
  }

  getRowByKeyValue({ key, value }: { key: string, value: any }): AcDatagridRow | undefined {
    this.logger.log('Getting row by key-value', { key, value: value ? '[provided]' : 'undefined' });
    let result: AcDatagridRow | undefined;
    for (const row of this.datagridRows) {
      if (row.data && row.data[key] == value) {
        result = row;
        this.logger.log('Found row by key-value', { key, value, rowId: result.rowId });
        break;
      }
    }
    if (!result) {
      this.logger.log('No row found for key-value', { key, value });
    }
    return result;
  }

  getState(): IAcDatagridState {
    this.logger.log('Getting datagrid state');
    this.datagridState.refresh();
    this.logger.log('Refreshed datagrid state');
    const state = this.datagridState.toJson();
    this.logger.log('Retrieved state', { keys: Object.keys(state) });
    return state;
  }

  refreshRows(): void {
    this.logger.log('Refreshing rows');
    this.hooks.execute({ hook: AcEnumDatagridHook.RefreshRows, args: {} });
    this.logger.log('Executed RefreshRows hook');
  }

  setColumnFilter({ datagridColumn, filter }: { datagridColumn: AcDatagridColumn, filter: AcFilter }) {
    this.logger.log('Setting column filter', { field: datagridColumn.columnDefinition.field, filter: filter });
    const oldFilterGroup: AcFilterGroup = datagridColumn.filterGroup.clone();;
    datagridColumn.filterGroup.addFilterModel({ filter: filter });
    this.logger.log('Added filter to column filterGroup');
    const eventArgs: IAcDatagridColumnFilterChangeEvent = {
      datagridColumn: datagridColumn,
      oldFilterGroup: oldFilterGroup,
      filterGroup: datagridColumn.filterGroup,
      datagridApi: this
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.ColumnFilterChange, args: eventArgs });
    this.logger.log('Executed ColumnFilterChange hook (datagrid level)');
    datagridColumn.hooks.execute({ hook: AcEnumDatagridHook.ColumnFilterChange, args: eventArgs });
    this.logger.log('Executed ColumnFilterChange hook (column level)');
    this.events.execute({ event: AcEnumDatagridEvent.ColumnFilterChange, args: eventArgs });
    this.logger.log('Executed ColumnFilterChange event');
  }

  setColumnSortOrder({ datagridColumn, sortOrder }: { datagridColumn: AcDatagridColumn, sortOrder: AcEnumSortOrder }) {
    this.logger.log('Setting column sort order', { field: datagridColumn.columnDefinition.field, oldOrder: datagridColumn.sortOrder, newOrder: sortOrder });
    const oldSortOrder: AcEnumSortOrder = datagridColumn.sortOrder;
    datagridColumn.sortOrder = sortOrder;
    if (sortOrder != AcEnumSortOrder.None) {
      this.dataManager.sortOrder.addSort({ key: datagridColumn.columnDefinition.field, order: sortOrder });
      this.logger.log('Added sort to dataManager');
    }
    else {
      this.dataManager.sortOrder.removeSort({ key: datagridColumn.columnDefinition.field });
      this.logger.log('Removed sort from dataManager');
    }
    const eventArgs: IAcDatagridColumnSortChangeEvent = {
      datagridColumn: datagridColumn,
      oldSortOrder: oldSortOrder,
      sortOrder: datagridColumn.sortOrder,
      datagridApi: this
    };
    this.hooks.execute({ hook: AcEnumDatagridHook.ColumnSortChange, args: eventArgs });
    this.logger.log('Executed ColumnSortChange hook (datagrid level)');
    datagridColumn.hooks.execute({ hook: AcEnumDatagridHook.ColumnSortChange, args: eventArgs });
    this.logger.log('Executed ColumnSortChange hook (column level)');
    this.events.execute({ event: AcEnumDatagridEvent.ColumnSortChange, args: eventArgs });
    this.logger.log('Executed ColumnSortChange event');
    this.dataManager.processRows();
    this.logger.log('Processed rows after sort change');
  }

  setDataSourceType({ dataSourceType }: { dataSourceType: AcEnumDataSourceType }) {
    this.logger.log('Setting data source type', { dataSourceType });
    // PENDING - implementation to be added
    this.logger.log('Data source type set (pending implementation)');
  }

  setActiveCell({ rowIndex, columnIndex, datagridCell }: { rowIndex?: number, columnIndex?: number, datagridCell?: AcDatagridCell }) {
    this.logger.log('Setting active cell', { rowIndex, columnIndex, datagridCellProvided: !!datagridCell });
    if (!datagridCell) {
      if (rowIndex != undefined && columnIndex != undefined && rowIndex > -1 && columnIndex > -1) {
        const datagridRow = this.getRowByIndex({ index: rowIndex });
        if (datagridRow) {
          datagridCell = datagridRow.getColumnCell({ index: columnIndex });
          this.logger.log('Retrieved datagridCell from row and column index', { rowId: datagridRow.rowId });
        } else {
          this.logger.log('No row found for active cell set', { rowIndex });
          return;
        }
      } else {
        this.logger.log('Invalid indices for active cell set', { rowIndex, columnIndex });
        return;
      }
    }
    if (datagridCell) {
      if (this.activeCell && this.activeCell != datagridCell) {
        if (this.activeCell.element) {
          if (this.activeCell.element.isEditing) {
            this.activeCell.element.exitEditMode();
            this.logger.log('Exited edit mode for previous active cell');
          }
        }
        this.activeCell.isActive = false;
        this.logger.log('Deactivated previous active cell');
      }
      datagridCell.isActive = true;
      if (datagridCell.element) {
        datagridCell.element.focus();
        this.logger.log('Focused active cell element');
      }
      this.activeCell = datagridCell;
      this.logger.log('Set new active cell', { cellId: datagridCell.cellId });
    } else {
      this.logger.log('No valid datagridCell to activate');
    }
  }

  setState({ state }: { state: IAcDatagridState }) {
    this.logger.log('Setting datagrid state', { stateKeys: Object.keys(state) });
    this.datagridState.apply(state);
    this.logger.log('Applied state to datagridState');
  }

  updateColumnPosition({ datagidColumn, oldDatagridColumn }: { datagidColumn: AcDatagridColumn, oldDatagridColumn: AcDatagridColumn }) {
    this.logger.log('Updating column position', { oldIndex: oldDatagridColumn.index, newIndex: datagidColumn.index });
    const eventArgs: IAcDatagridColumnPositionChangeEvent = {
      oldDatagridColumn: oldDatagridColumn,
      datagridColumn: datagidColumn,
      datagridApi: this
    };
    this.events.execute({ event: AcEnumDatagridEvent.ColumnPositionChange, args: eventArgs });
    this.logger.log('Executed ColumnPositionChange event');
  }

  updateRowPosition({ datagridRow, oldDatagridRow }: { datagridRow: AcDatagridRow, oldDatagridRow: AcDatagridRow }) {
    this.logger.log('Updating row position', { oldIndex: oldDatagridRow.index, newIndex: datagridRow.index });
    const eventArgs: IAcDatagridRowPositionChangeEvent = {
      oldDatagridRow: oldDatagridRow,
      datagridRow: datagridRow,
      datagridApi: this
    };
    this.events.execute({ event: AcEnumDatagridEvent.RowPositionChange, args: eventArgs });
    this.logger.log('Executed RowPositionChange event');
  }

  // PENDING
  updateRow({ data, value, key, rowId, highlightCells = true, addIfMissing = false }: { data: any, value?: any, key?: string, rowId?: string, highlightCells?: boolean, addIfMissing?: boolean }): AcDatagridRow | undefined {
    this.logger.log('Updating row', { rowId, key, addIfMissing, highlightCells, dataProvided: !!data, valueProvided: !!value });
    const datagridRow: AcDatagridRow | undefined = this.dataManager.updateRow({ data, value, key, rowId, addIfMissing });
    if (datagridRow) {
      this.logger.log('Updated row in dataManager', { rowId: datagridRow.rowId });
      if (highlightCells) {
        for (const cell of datagridRow.datagridCells) {
          cell.element!.refresh();
          this.logger.log('Refreshed cell', { cellId: cell.cellId });
        }
      }
      this.logger.log('Row update complete');
    } else {
      this.logger.log('No row updated (possibly not found or addIfMissing false)');
    }
    return datagridRow;
  }

}
