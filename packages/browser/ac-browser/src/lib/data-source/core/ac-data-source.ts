/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumConditionOperator, AcEnumLogicalOperator, AcEnumSortOrder, AcEvents, AcFilter, AcFilterGroup, AcHooks, AcSortOrder } from "@autocode-ts/autocode";
import { AcDataSourceRow } from "../models/ac-data-source-row.model";
import { IAcOnDemandRequestArgs } from "../interfaces/ac-on-demand-request-args.interface";
import { IAcOnDemandResponseArgs } from "../interfaces/ac-on-demand-response-args.interface";
import { AcEnumDataSourceHook } from "../enums/ac-enum-data-source-hook.enum";
import { AcEnumDataSourceEvent } from "../enums/ac-enum-data-source-event.enum";
import { IAcDataSourceDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-data-source-displayed-rows-change-event.interface";
import { IAcDataSourceTotalRowsChangeEvent } from "../interfaces/event-args/ac-data-source-total-rows-change-event.interface";
import { IAcDataSourceGetOnDemandDataSuccessCallbackHookArgs } from "../interfaces/hook-args/ac-data-source-get-on-demand-data-success-callback-hook-args.interface";
import { IAcDataSourceBeforeGetOnDemandDataHookArgs } from "../interfaces/hook-args/ac-data-source-before-get-on-demand-data-hook-args.interface";
import { IAcDataSourceDataChangeHookArgs } from "../interfaces/hook-args/ac-data-source-data-change-hook-args.interface";
import { IAcDataSourceRowHookArgs } from "../interfaces/hook-args/ac-data-source-row-hook-args.interface";

export class AcDataSource {
  private _data: any[] = [];
  get data(): any[] {
    return this._data;
  }
  set data(value: any[]) {
    this.setRows({ data: value });
  }

  private _displayedRows: AcDataSourceRow[] = [];
  get displayedRows(): AcDataSourceRow[] {
    return this._displayedRows;
  }
  set displayedRows(value: AcDataSourceRow[]) {
    this._displayedRows = value;
    const eventArgs: IAcDataSourceDisplayedRowsChangeEvent = {
      displayedRows: value,
      dataSource: this
    };
    this.hooks.execute({ hook: AcEnumDataSourceHook.DisplayedRowsChange, args: eventArgs });
    this.events.execute({ event: AcEnumDataSourceEvent.DisplayedRowsChange, args: eventArgs });
  }

  private _filterGroup: AcFilterGroup = new AcFilterGroup();
  get filterGroup(): AcFilterGroup {
    return this._filterGroup;
  }
  set filterGroup(value: AcFilterGroup) {
    if (value != this._filterGroup) {
      this._filterGroup = value;
    }
  }

  private _sortOrder: AcSortOrder = new AcSortOrder();
  get sortOrder(): AcSortOrder {
    return this._sortOrder;
  }
  set sortOrder(value: AcSortOrder) {
    if (value != this._sortOrder) {
      this._sortOrder = value;
    }
  }

  private _totalRows: number = 0;
  get totalRows(): number {
    return this._totalRows;
  }
  set totalRows(value: number) {
    if (value != this._totalRows) {
      this._totalRows = value;
      const eventArgs: IAcDataSourceTotalRowsChangeEvent = {
        totalRows: value,
        dataSource: this
      };
      this.hooks.execute({ hook: AcEnumDataSourceHook.TotalRowsChange, args: eventArgs });
      this.hooks.execute({ hook: AcEnumDataSourceHook.DisplayedRowsChange, args: eventArgs });
      this.events.execute({ event: AcEnumDataSourceEvent.TotalRowsChange, args: eventArgs });
      this.events.execute({ event: AcEnumDataSourceEvent.DisplayedRowsChange, args: eventArgs });
    }
  }

  private _type: 'offline' | 'ondemand' = 'offline';
  get type(): 'offline' | 'ondemand' {
    return this._type;
  }
  set type(value: 'offline' | 'ondemand') {
    if (this._type != value) {
      this._type = value;
    }
  }

  allDataAvailable: boolean = false;
  autoSetUniqueIdToData:boolean = false;
  events: AcEvents = new AcEvents();
  hooks: AcHooks = new AcHooks();
  onDemandFunction?: (args: IAcOnDemandRequestArgs) => void;
  processedRows: AcDataSourceRow[] = [];
  rows: AcDataSourceRow[] = [];

  constructor() {
    //
  }

  clearRows() {
    this._data = [];
    this.totalRows = 0;
    this.rows = [];
    this.displayedRows = [];
    this.processedRows = [];
  }

  /**
 * Evaluates a single filter condition for a given row.
 */
  private evaluateFilter(filter: AcFilter, row: AcDataSourceRow): boolean {
    const field = filter.key;
    if (!field) return true;

    const value = row.data[field];
    const filterValue = filter.value;
    const op = filter.operator ?? AcEnumConditionOperator.Unknown;

    const normalize = (v: any): any =>
      typeof v === "string" ? v.toLowerCase().trim() : v;

    switch (op) {
      case AcEnumConditionOperator.EqualTo:
        return normalize(value) == normalize(filterValue);

      case AcEnumConditionOperator.NotEqualTo:
        return normalize(value) != normalize(filterValue);

      case AcEnumConditionOperator.GreaterThan:
        return Number(value) > Number(filterValue);

      case AcEnumConditionOperator.GreaterThanEqualTo:
        return Number(value) >= Number(filterValue);

      case AcEnumConditionOperator.LessThan:
        return Number(value) < Number(filterValue);

      case AcEnumConditionOperator.LessThanEqualTo:
        return Number(value) <= Number(filterValue);

      case AcEnumConditionOperator.Contains:
        return (
          value != null &&
          filterValue != null &&
          value.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
        );

      case AcEnumConditionOperator.NotContains:
        return (
          value == null ||
          filterValue == null ||
          !value.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
        );

      case AcEnumConditionOperator.StartsWith:
        return (
          value != null &&
          filterValue != null &&
          value.toString().toLowerCase().startsWith(filterValue.toString().toLowerCase())
        );

      case AcEnumConditionOperator.EndsWith:
        return (
          value != null &&
          filterValue != null &&
          value.toString().toLowerCase().endsWith(filterValue.toString().toLowerCase())
        );

      case AcEnumConditionOperator.In:
        return Array.isArray(filterValue)
          ? filterValue.map(normalize).includes(normalize(value))
          : false;

      case AcEnumConditionOperator.NotIn:
        return Array.isArray(filterValue)
          ? !filterValue.map(normalize).includes(normalize(value))
          : true;

      case AcEnumConditionOperator.Between:
        if (!Array.isArray(filterValue) || filterValue.length !== 2) return true;
        const [min, max] = filterValue;
        const valNum = Number(value);
        return valNum >= Number(min) && valNum <= Number(max);

      case AcEnumConditionOperator.IsNull:
        return value === null || value === undefined;

      case AcEnumConditionOperator.IsNotNull:
        return value !== null && value !== undefined;

      case AcEnumConditionOperator.IsEmpty:
        return value === null || value === undefined || value === "";

      case AcEnumConditionOperator.IsNotEmpty:
        return value !== null && value !== undefined && value !== "";

      default:
        return true;
    }
  }

  /**
 * Recursively evaluates a filter group with AND/OR logic.
 */
  private evaluateFilterGroup(group: AcFilterGroup, row: AcDataSourceRow): boolean {
    const results: boolean[] = [];

    // Evaluate filters in this group
    for (const filter of group.filters) {
      results.push(this.evaluateFilter(filter, row));
    }

    // Evaluate nested groups recursively
    for (const subGroup of group.filterGroups) {
      results.push(this.evaluateFilterGroup(subGroup, row));
    }

    // Combine results based on logical operator
    if (group.operator === AcEnumLogicalOperator.Or) {
      return results.some(Boolean);
    }
    // Default AND
    return results.every(Boolean);
  }

  getRows({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}): AcDataSourceRow[] {
    const result: AcDataSourceRow[] = [];
    if (this.type == "ondemand") {
      if (this.onDemandFunction) {
        const successCallback: Function = (response: IAcOnDemandResponseArgs) => {
          const hookArgs: IAcDataSourceGetOnDemandDataSuccessCallbackHookArgs = {
            dataSource: this,
            requestArgs: requestArgs,
            responseArgs: response,
          }
          this.setRows({ data: response.data, totalCount: response.totalCount, startIndex: startIndex });
          this.hooks.execute({ hook: AcEnumDataSourceHook.GetOnDemandDataSuccessCallback, args: hookArgs });
        }
        const requestArgs: IAcOnDemandRequestArgs = {
          filterGroup: new AcFilterGroup(),
          rowsCount: rowsCount,
          startIndex: startIndex,
          successCallback: successCallback,
          sortOrder: new AcSortOrder()
        };
        const hookArgs: IAcDataSourceBeforeGetOnDemandDataHookArgs = {
          dataSource: this,
          requestArgs: requestArgs
        }
        this.hooks.execute({ hook: AcEnumDataSourceHook.BeforeGetOnDemandData, args: hookArgs });
        this.onDemandFunction(requestArgs);
      }
    }
    else {
      const fromIndex: number = startIndex ?? 0;
      const toIndex: number = fromIndex + ((rowsCount > -1 ? rowsCount : this.totalRows) - 1);
      for (let index = fromIndex; index < toIndex && index < this.totalRows; index++) {
        result.push(this.rows[index]);
      }
    }
    return result;
  }

  getRowIndex({ key, value }: { key: string, value: any }): number {
    return this.rows.findIndex((row: AcDataSourceRow) => {
      return row.data[key] == value;
    });
  }

  getRowAtIndex({ index }: { index: number }): AcDataSourceRow | undefined {
    return this.rows.find((row: AcDataSourceRow) => {
      return row.index == index;
    });
  }

  getRow({ key, value }: { key: string, value: any }): AcDataSourceRow | undefined {
    return this.rows.find((row: AcDataSourceRow) => {
      return row.data[key] == value;
    });
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback,subscriptionId });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  processRows() {
    // Step 1: clone all rows
    let filteredRows = [...this.rows];

    // Step 2: apply filters (if defined)
    if (this.filterGroup && (this.filterGroup.hasFilters() || this.filterGroup.filterGroups.length > 0)) {
      filteredRows = filteredRows.filter((row: AcDataSourceRow) =>
        this.evaluateFilterGroup(this.filterGroup, row)
      );
    }

    // Step 3: assign filtered list
    this.processedRows = filteredRows;
    this.totalRows = this.processedRows.length;

    // Step 4: sort if sortOrder present
    if (this.sortOrder.sortOrders.length > 0) {
      this.processedRows.sort((a: AcDataSourceRow, b: AcDataSourceRow): number => {
        let index = 0;
        for (const sort of this.sortOrder.sortOrders) {
          const field = sort.key;
          const valA: any = a.data[field];
          const valB: any = b.data[field];
          let result = 0;

          if (typeof valA === "string" && typeof valB === "string") {
            result = valA.localeCompare(valB);
          } else {
            result = (valA ?? 0) - (valB ?? 0);
          }

          if (result !== 0) {
            index = sort.order == AcEnumSortOrder.Ascending ? result : -result;
            break;
          }
        }
        return index;
      });
    }

    // Step 5: update visible data
    this.setDisplayedData();
  }

  setRows({ data, startIndex, totalCount }: { data: any[], startIndex?: number, totalCount?: number }) {
    if (this.type == 'offline') {
      const hookArgs: IAcDataSourceDataChangeHookArgs = {
        data: data,
        dataSource: this,
        oldData: this.data
      }
      this.hooks.execute({ hook: AcEnumDataSourceHook.BeforeDataChange, args: hookArgs });
      this._data = data;
      let index = 0;
      this.rows = [];
      for (const row of this._data) {
        const dataSourceRow: AcDataSourceRow = new AcDataSourceRow({
          data: row,
          index: index,
          dataSource: this
        });
        this.rows.push(dataSourceRow);
        const hookArgs: IAcDataSourceRowHookArgs = {
          dataSource: this,
          dataSourceRow: dataSourceRow,
        };
        this.hooks.execute({ hook: AcEnumDataSourceHook.RowCreate, args: hookArgs });
        index++;
      }
      this.hooks.execute({ hook: AcEnumDataSourceHook.DataChange, args: hookArgs });
      this.allDataAvailable = true;
      this.totalRows = index;
      this.processRows();
    }
    else if (this.type == 'ondemand') {
      if (totalCount == undefined) {
        totalCount = data.length;
      }
      if (this._data.length < totalCount) {
        this._data = new Array(totalCount).fill(undefined);
      }
      const hookArgs: IAcDataSourceDataChangeHookArgs = {
        data: data,
        dataSource: this,
        oldData: this.data
      }
      this.hooks.execute({ hook: AcEnumDataSourceHook.BeforeDataChange, args: hookArgs });
      this.rows = [];
      if (startIndex == undefined) {
        startIndex = 0;
      }
      let index: number = startIndex;
      for (const row of data) {
        this._data[index] = row;
        const dataSourceRow: AcDataSourceRow = new AcDataSourceRow({
          data: row,
          index: index,
          dataSource: this
        });
        this.rows.push(dataSourceRow);
        const hookArgs: IAcDataSourceRowHookArgs = {
          dataSource: this,
          dataSourceRow: dataSourceRow,
        };
        this.hooks.execute({ hook: AcEnumDataSourceHook.RowCreate, args: hookArgs });
        index++;
      }
      this.hooks.execute({ hook: AcEnumDataSourceHook.DataChange, args: hookArgs });
      this.allDataAvailable = this.data.filter((item) => { return item == undefined }).length == 0;
      this.totalRows = totalCount;
      this.processRows();
    }
  }

  setDisplayedData() {
    let displayedRows: AcDataSourceRow[] = [];
    // if (this.datagridApi.usePagination && this.datagridApi.pagination) {
    //   const startIndex = this.datagridApi.pagination.paginationApi.startRow - 1;
    //   const endIndex = this.datagridApi.pagination.paginationApi.endRow - 1;
    //   if (startIndex >= 0 && endIndex >= 0) {
    //     for (let index = startIndex; index <= endIndex; index++) {
    //       displayedRows.push(this.processedRows[index]);
    //     }
    //   }
    // }
    // else {
    displayedRows = this.processedRows;
    // }
    this.displayedRows = displayedRows;
  }

}
