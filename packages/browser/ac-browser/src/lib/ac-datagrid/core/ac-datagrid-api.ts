/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcPagination } from "../../ac-pagination/elements/ac-pagination.element";
import { AcDatagrid } from "../elements/ac-datagrid.element";
import { IAcDatagridColumnDefinition } from "../interfaces/ac-datagrid-column-definition.interface";
import { AcEnumSortOrder, AcEvents, AcFilter, AcFilterGroup, AcHooks, AcSortOrder } from "@autocode-ts/autocode";
import { AcDatagridDataSource } from "./ac-datagrid-data-source";
import { AcEnumDataSourceType } from "../../enums/ac-enum-data-source-type.enum";
import { acAddClassToElement, acRemoveClassFromElement } from "../../utils/ac-element-functions";
import { AcDatagridOnDemandDataSource } from "./ac-datagrid-on-demand-data-source";
import { AcEnumPaginationEvent } from "../../ac-pagination/_ac-pagination.export";
import { arrayRemove, arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcDatagridCssClassName } from "../consts/ac-datagrid-css-class-name.const";
import { IAcDatagridColDefsSetEvent } from "../interfaces/event-args/ac-datagrid-col-defs-set-event.interface";
import { IAcDatagridColumnDragPlaceholderCreatorArgs } from "../interfaces/callback-args/ac-datagrid-column-drag-placeholder-creator-args.interface";
import { IAcDatagridRowDragPlaceholderCreatorArgs } from "../interfaces/callback-args/ac-datagrid-row-drag-placeholder-creator-args.interface";
import { IAcDatagridRowPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-row-position-change-event.interface";
import { IAcDatagridColumnPositionChangeEvent } from "../interfaces/event-args/ac-datagrid-column-position-change-event.interface";
import { IAcDatagridTotalRowsChangeEvent } from "../interfaces/event-args/ac-datagrid-total-rows-change-event.interface";
import { IAcDatagridColumnSortChangeEvent } from "../interfaces/event-args/ac-datagrid-column-sort-change-event.interface";
import { IAcDatagridColumnFilterChangeEvent } from "../interfaces/event-args/ac-datagrid-column-filter-change-event.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { AcDatagridExtension } from "./ac-datagrid-extension";
import { AcDatagridExtensionManager } from "./ac-datagrid-extension-manager";
import { IAcPaginationPageChangeEvent } from "../../ac-pagination/interfaces/event-params/ac-page-change-event.interface";
import { IAcDatagridColDefsChangeHookArgs } from "../interfaces/hook-args/ac-datagrid-coldefs-change-hook-args.interface";
import { IAcDatagridDataSourceTypeChangeHookArgs } from "../interfaces/hook-args/ac-datagrid-data-source-type-change-hook-args.interface";
import { AcDatagridState, IAcDatagridColumnHookArgs, IAcDatagridExtensionEnabledHookArgs, IAcDatagridRowFocusHookArgs, IAcDatagridRowHookArgs, IAcDatagridUsePaginationChangeHookArgs } from "../_ac-datagrid.export";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";
import { AcDatagridColumn } from "../models/ac-datagrid-column.model";
import { AcDatagridCell } from "../models/ac-datagrid-cell.model";
import { IAcDatagridRowAddHookArgs } from "../interfaces/hook-args/ac-datagrid-row-add-hook-args.interface";
import { IAcDatagridRowDeleteHookArgs } from "../interfaces/hook-args/ac-datagrid-row-delete-hook-args.interface";
import { IAcDatagridRowUpdateHookArgs } from "../interfaces/hook-args/ac-datagrid-row-update-hook-args.interface";
import { IAcDatagridRowEvent } from "../interfaces/event-args/ac-datagrid-row-event.interface";
import { AcDatagridEventHandler } from "./ac-datagrid-event-handler";

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
    this.hooks.execute({ hookName: AcEnumDatagridHook.BeforeColDefsChange, args: hookArgs });
    this._columnDefinitions = value;
    this.datagridColumns = [];
    let index = 0;
    for (const column of this._columnDefinitions) {
      const datagridColumn: AcDatagridColumn = new AcDatagridColumn({
        columnDefinition: column,
        datagridApi:this,
        index: index
      });
      this.datagridColumns.push(datagridColumn);
      const columnCreatedArgs: IAcDatagridColumnHookArgs = {
        datagridApi: this,
        datagridColumn: datagridColumn
      };
      this.hooks.execute({ hookName: AcEnumDatagridHook.DatagridColumnCreated, args: columnCreatedArgs });
      index++;
    }
    this.hooks.execute({ hookName: AcEnumDatagridHook.ColDefsChange, args: hookArgs });
    const event: IAcDatagridColDefsSetEvent = {
      columnDefinitions: value,
      datagridColumns: this.datagridColumns,
      datagridApi: this
    };
    this.events.execute({ eventName: AcEnumDatagridEvent.ColDefsSet, args: event });
  }

  get data(): any[] {
    return this.dataSource.data;
  }
  set data(value: any[]) {
    this.dataSource?.setData({ data: value });
  }

  private _dataSourceType: AcEnumDataSourceType = AcEnumDataSourceType.Unknown;
  get dataSourceType(): AcEnumDataSourceType {
    return this._dataSourceType;
  }
  set dataSourceType(value: AcEnumDataSourceType) {
    this.setDataSourceType({ dataSourceType: value });
  }

  get datagridRows(): AcDatagridRow[] {
    let result: AcDatagridRow[] = [];
    if (this.dataSource) {
      result = this.dataSource.datagridRows;
    }
    return result;
  }

  get displayedDatagridRows(): AcDatagridRow[] {
    let result: AcDatagridRow[] = [];
    if (this.dataSource) {
      result = this.dataSource.displayedDatagridRows;
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
    this.pagination = new AcPagination();
    this.pagination.on({
      eventName: AcEnumPaginationEvent.PageChange, callback: (params: IAcPaginationPageChangeEvent) => {
        if (this.dataSource) {
          this.dataSource.setDisplayedData();
        }
      }
    })
    if (this.dataSource) {
      this.dataSource.setDisplayedData();
    }
    this.hooks.execute({ hookName: AcEnumDatagridHook.UsePaginationChange, args: hookArgs });
    this.datagrid.datagridFooter.setPagination();
  }

  activeDatagridRow:AcDatagridRow | undefined;
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
  datagrid!: AcDatagrid;
  datagridColumns: AcDatagridColumn[] = [];
  datagridState:AcDatagridState = new AcDatagridState();
  dataSource!: AcDatagridDataSource;
  eventHandler!:AcDatagridEventHandler;
  events: AcEvents = new AcEvents();
  extensions: Record<string, AcDatagridExtension> = {};
  focusedCell?: AcDatagridCell;
  hooks: AcHooks = new AcHooks();
  hoverCellId?: string;
  hoverColumnId?: string;
  hoverRowId?: string;
  pagination?: AcPagination;
  sortOrder: AcSortOrder = new AcSortOrder();

  constructor({ datagrid }: { datagrid: AcDatagrid }) {
    AcDatagridExtensionManager.registerBuiltInExtensions();
    this.datagrid = datagrid
    this.datagridState.datagridApi = this;
    this.eventHandler = new AcDatagridEventHandler({datagridApi:this});
    this.dataSourceType = AcEnumDataSourceType.Unknown;
  }

  addRow({ data, append = true, highlightCells = false }: { data?: any, append?: boolean, highlightCells?: boolean } = {}) {
    const datagridRow: AcDatagridRow = new AcDatagridRow({
      data: data,
      datagridApi:this,
      index: this.dataSource.datagridRows.length
    });
    this.dataSource.datagridRows.push(datagridRow);
    const hookArgs: IAcDatagridRowHookArgs = {
      datagridApi: this,
      datagridRow: datagridRow,
    };
    this.hooks.execute({ hookName: AcEnumDatagridHook.DatagridRowCreated, args: hookArgs });
    const addHookArgs: IAcDatagridRowAddHookArgs = {
      datagridApi: this,
      datagridRow: datagridRow,
      append: append,
      highlightCells: highlightCells
    }
    this.hooks.execute({ hookName: AcEnumDatagridHook.RowAdd, args: addHookArgs });
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this,
      datagridRow: datagridRow
    };
    this.events.execute({ eventName: AcEnumDatagridEvent.RowAdd, args: eventArgs });
    this.dataSource.totalRows++;
  }

  autoResizeColumn({ datagridColumn }: { datagridColumn: AcDatagridColumn }) {
    let maxWidth: number = 0;
    for (const datagridRow of this.datagridRows) {
      if (datagridRow.instance) {
        for (const datagridCell of datagridRow.instance.datagridCells) {
          if (datagridCell.datagridColumn.acColumnId == datagridColumn.acColumnId) {
            const cellWidth = datagridCell.cellContainer.offsetWidth;
            if (cellWidth > maxWidth) {
              maxWidth = cellWidth;
            }
          }
        }
      }
    }
    // this.setColumnWidth({ datagridColumn: datagridColumn, width: maxWidth });
  }

  deleteRow({ data, rowId, key, value, highlightCells = false }: { data?: any, rowId?: string, key?: string, value?: any, highlightCells?: boolean }) {
    const datagridRow: AcDatagridRow | undefined = this.datagridRows.find((datagridRow) => {
      let valid: boolean = false;
      if (rowId) {
        valid = datagridRow.acRowId == rowId;
      }
      else if (key && value) {
        valid = datagridRow.data[key] == value;
      }
      else if (data && key) {
        valid = datagridRow.data[key] == data[key];
      }
      else if (data) {
        valid = datagridRow.data == data;
      }
      return valid;
    });
    if (datagridRow) {
      arrayRemoveByKey(this.dataSource.datagridRows,'acRowId',datagridRow.acRowId);
      const deleteHookArgs: IAcDatagridRowDeleteHookArgs = {
        datagridApi: this,
        datagridRow: datagridRow,
        highlightCells: highlightCells
      }
      this.hooks.execute({ hookName: AcEnumDatagridHook.RowDelete, args: deleteHookArgs });
      const eventArgs: IAcDatagridRowEvent = {
        datagridApi: this,
        datagridRow: datagridRow
      };
      this.events.execute({ eventName: AcEnumDatagridEvent.RowDelete, args: eventArgs });
      this.dataSource.totalRows--;
    }
  }

  enableExtension({ extensionName }: { extensionName: string }): AcDatagridExtension | null {
    if (AcDatagridExtensionManager.hasExtension({ extensionName: extensionName })) {
      const extensionInstance = AcDatagridExtensionManager.createInstance({ extensionName: extensionName });
      if (extensionInstance) {
        extensionInstance.datagridApi = this;
        const hookId: string = this.hooks.subscribeAllHooks({
          callback: (hookName: string, args: any) => {
            extensionInstance.handleHook({ hookName: hookName, hookArgs: args });
          }
        });
        extensionInstance.hookId = hookId;
        extensionInstance.init();
        this.extensions[extensionName] = extensionInstance;
        const hookArgs: IAcDatagridExtensionEnabledHookArgs = {
          extensionName: extensionName,
          datagridApi: this,
        };
        this.hooks.execute({ hookName: AcEnumDatagridHook.ExtensionEnabled, args: hookArgs });
        return extensionInstance;
      }
    }
    return null;
  }

  focusFirstRow({ highlightCells }: { highlightCells?: boolean } = {}) {
    this.focusRow({ index: 0, highlightCells: highlightCells });
  }

  focusLastRow({ highlightCells }: { highlightCells?: boolean } = {}) {
    this.focusRow({ index: this.dataSource.totalRows - 1, highlightCells: highlightCells });
  }

  focusRow({ index, highlightCells = false }: { index: number, highlightCells?: boolean }) {
    const hookArgs: IAcDatagridRowFocusHookArgs = {
      datagridApi: this,
      datagridRow: this.datagridRows[index],
      index: index,
      highlightCells: highlightCells
    }
    this.hooks.execute({ hookName: AcEnumDatagridHook.RowFocus, args: hookArgs });
  }

  on({ eventName, callback }: { eventName: string, callback: Function }): string {
    return this.events.subscribe({ eventName: eventName, callback: callback });
  }

  getColumnByField({field}:{field:string}):AcDatagridColumn | undefined{
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
    if(result == undefined){
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

  setColumnFilter({ datagridColumn, filter }: { datagridColumn: AcDatagridColumn, filter: AcFilter }) {
    const oldFilterGroup: AcFilterGroup = datagridColumn.filterGroup.cloneInstance();;
    datagridColumn.filterGroup.addFilterModel({ filter: filter });
    const eventArgs: IAcDatagridColumnFilterChangeEvent = {
      datagridColumn: datagridColumn,
      oldFilterGroup: oldFilterGroup,
      filterGroup: datagridColumn.filterGroup,
      datagridApi: this
    };
    this.hooks.execute({ hookName: AcEnumDatagridHook.ColumnFilterChange, args: eventArgs });
    datagridColumn.hooks.execute({ hookName: AcEnumDatagridHook.ColumnFilterChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumDatagridEvent.ColumnFilterChange, args: eventArgs });
  }

  setColumnSortOrder({ datagridColumn, sortOrder }: { datagridColumn: AcDatagridColumn, sortOrder: AcEnumSortOrder }) {
    const oldSortOrder: AcEnumSortOrder = datagridColumn.sortOrder;
    datagridColumn.sortOrder = sortOrder;
    if (sortOrder != AcEnumSortOrder.None) {
      this.sortOrder.addSort({key:datagridColumn.columnDefinition.field,order:sortOrder});
    }
    const eventArgs: IAcDatagridColumnSortChangeEvent = {
      datagridColumn: datagridColumn,
      oldSortOrder: oldSortOrder,
      sortOrder: datagridColumn.sortOrder,
      datagridApi: this
    };
    this.hooks.execute({ hookName: AcEnumDatagridHook.ColumnSortChange, args: eventArgs });
    datagridColumn.hooks.execute({ hookName: AcEnumDatagridHook.ColumnSortChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumDatagridEvent.ColumnSortChange, args: eventArgs });
    this.dataSource.processData();
  }

  // setColumnWidth({ datagridColumn, width }: { datagridColumn: AcDatagridColumn, width: number }) {
  //   const oldWidth: number = datagridColumn.width;
  //   datagridColumn.width = width;
  //   const eventArgs: IAcDatagridColumnResizeEvent = {
  //     datagridColumn: datagridColumn,
  //     oldWidth: oldWidth,
  //     width: width,
  //     datagridApi: this
  //   };
  //   this.hooks.execute({ hookName: AcEnumDatagridHook.ColumnWidthChange, args: eventArgs });
  //   datagridColumn.hooks.execute({ hookName: AcEnumDatagridHook.ColumnWidthChange, args: eventArgs });
  //   this.events.execute({ eventName: AcEnumDatagridEvent.ColumnResize, args: eventArgs });
  // }

  setDataSourceType({ dataSourceType }: { dataSourceType: AcEnumDataSourceType }) {
    const hookArgs: IAcDatagridDataSourceTypeChangeHookArgs = {
      oldDataSourceType: this._dataSourceType,
      datagridApi: this,
      dataSourceType: dataSourceType
    };
    this._dataSourceType = dataSourceType;
    if (this.dataSourceType == AcEnumDataSourceType.OnDemand) {
      this.dataSource = new AcDatagridOnDemandDataSource({ datagridApi: this });
    }
    else {
      this.dataSource = new AcDatagridDataSource({ datagridApi: this });
    }
    this.dataSource.events.subscribe({
      eventName: AcEnumDatagridEvent.TotalRowsChange,
      callback: (params: IAcDatagridTotalRowsChangeEvent) => {
        if (this.pagination) {
          this.pagination.paginationApi.totalRows = params.totalRows;
        }
      }
    });
    this.hooks.execute({ hookName: AcEnumDatagridHook.DataSourceTypeChange, args: hookArgs });
    return this.dataSource;
  }

  setFocusedCell({ datagridCell }: { datagridCell: AcDatagridCell }) {
    if (this.focusedCell && this.focusedCell.instance) {
      acRemoveClassFromElement({ cssClass: AcDatagridCssClassName.acDatagridCellFocused, element: this.focusedCell.instance.element });
      if (this.focusedCell.instance.isEditing) {
        this.focusedCell.instance.exitEditMode();
      }
    }
    this.focusedCell = datagridCell;
    if (this.focusedCell && this.focusedCell.instance && this.focusedCell.instance.element) {
      acAddClassToElement({ cssClass: AcDatagridCssClassName.acDatagridCellFocused, element: this.focusedCell.instance.element });
    }
  }

  updateColumnPosition({ datagidColumn, oldDatagridColumn }: { datagidColumn: AcDatagridColumn, oldDatagridColumn: AcDatagridColumn }) {
    const eventArgs: IAcDatagridColumnPositionChangeEvent = {
      oldDatagridColumn: oldDatagridColumn,
      datagridColumn: datagidColumn,
      datagridApi: this
    };
    this.events.execute({ eventName: AcEnumDatagridEvent.ColumnPositionChange, args: eventArgs });
  }

  updateRowPosition({ datagridRow, oldDatagridRow }: { datagridRow: AcDatagridRow, oldDatagridRow: AcDatagridRow }) {
    const eventArgs: IAcDatagridRowPositionChangeEvent = {
      oldDatagridRow: oldDatagridRow,
      datagridRow: datagridRow,
      datagridApi: this
    };
    this.events.execute({ eventName: AcEnumDatagridEvent.RowPositionChange, args: eventArgs });
  }

  // PENDING
  updateRow({ data, value, key, rowId, highlightCells = true, addIfMissing = false }: { data: any, value?: any, key?: string, rowId?: string, highlightCells?: boolean, addIfMissing?: boolean }) {
    const datagridRow: AcDatagridRow | undefined = this.datagridRows.find((datagridRow) => {
      let valid: boolean = false;
      if (rowId) {
        valid = datagridRow.acRowId == rowId;
      }
      else if (key && value) {
        valid = datagridRow.data[key] == value;
      }
      else if (data && key) {
        valid = datagridRow.data[key] == data[key];
      }
      else if (data) {
        valid = datagridRow.data == data;
      }
      return valid;
    });
    if (datagridRow) {
      datagridRow.data = data;
      const updateHookArgs: IAcDatagridRowUpdateHookArgs = {
        datagridApi: this,
        datagridRow: datagridRow,
        highlightCells: highlightCells
      }
      this.hooks.execute({ hookName: AcEnumDatagridHook.RowUpdate, args: updateHookArgs });
      const eventArgs:IAcDatagridRowEvent = {
      datagridApi:this,
      datagridRow:datagridRow
    };
    this.events.execute({eventName:AcEnumDatagridEvent.RowUpdate,args:eventArgs});
    }
    else {
      this.addRow({ data: data, highlightCells: highlightCells });
    }
  }

}
