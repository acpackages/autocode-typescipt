/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { AcEvents } from "../../core/ac-events";
import { AcHooks } from "../../core/ac-hooks";
import { AcEnumConditionOperator } from "../../enums/ac-enum-condition-operator.enum";
import { AcEnumLogicalOperator } from "../../enums/ac-enum-logical-operator.enum";
import { AcEnumSortOrder } from "../../enums/ac-enum-sort-order.enum";
import { AcFilterGroup } from "../../models/ac-filter-group.model";
import { AcFilter } from "../../models/ac-filter.model";
import { AcSortOrder } from "../../models/ac-sort-order.model";
import { AcEnumDataManagerEvent } from "../enums/ac-enum-data-manager-event.enum";
import { AcEnumDataManagerHook } from "../enums/ac-enum-data-manager-hook.enum";
import { IAcOnDemandRequestArgs } from "../interfaces/ac-on-demand-request-args.interface";
import { IAcOnDemandResponseArgs } from "../interfaces/ac-on-demand-response-args.interface";
import { IAcDataManagerDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-data-manager-displayed-rows-change-event.interface";
import { IAcDataManagerTotalRowsChangeEvent } from "../interfaces/event-args/ac-data-manager-total-rows-change-event.interface";
import { IAcDataManagerBeforeGetOnDemandDataHookArgs } from "../interfaces/hook-args/ac-data-manager-before-get-on-demand-data-hook-args.interface";
import { IAcDataManagerDataChangeHookArgs } from "../interfaces/hook-args/ac-data-manager-data-change-hook-args.interface";
import { IAcDataManagerGetOnDemandDataSuccessCallbackHookArgs } from "../interfaces/hook-args/ac-data-manager-get-on-demand-data-success-callback-hook-args.interface";
import { IAcDataManagerRowHookArgs } from "../interfaces/hook-args/ac-data-row-hook-args.interface";
import { AcDataRow } from "../models/ac-data-row.model";
import { IAcDataManagerRowEvent } from "../interfaces/event-args/ac-data-manager-row-event.interface";
import { AcLogger } from "../../core/ac-logger";

export class AcDataManager<T extends AcDataRow = AcDataRow> {
  private _data: any[] = [];
  get data(): any[] {
    return this._data;
  }
  set data(value: any[]) {
    if (this._data != value) {
      this.logger.log("Setting data", { valueLength: value.length });
      this.setRows({ data: value });
      this.logger.log("Data set complete");
    }
  }

  private _displayedRows: T[] = [];
  get displayedRows(): T[] {
    return this._displayedRows;
  }
  set displayedRows(value: T[]) {
    this.logger.log("Setting displayedRows", { oldLength: this._displayedRows.length, newLength: value.length });
    if (value != this._displayedRows) {
      this._displayedRows = value;
      const eventArgs: IAcDataManagerDisplayedRowsChangeEvent = {
        displayedRows: value,
        dataManager: this
      };
      this.hooks.execute({ hook: AcEnumDataManagerHook.DisplayedRowsChange, args: eventArgs });
      this.events.execute({ event: AcEnumDataManagerEvent.DisplayedRowsChange, args: eventArgs });
      this.logger.log("DisplayedRowsChange event executed");
    }
    this.logger.log("DisplayedRows set complete");
  }

  private _filterGroup!: AcFilterGroup;
  get filterGroup(): AcFilterGroup {
    return this._filterGroup;
  }
  set filterGroup(value: AcFilterGroup) {
    this.logger.log("Setting filterGroup", { hasFilters: value.hasFilters(), filterGroupsCount: value.filterGroups.length });
    if (value != this._filterGroup) {
      this._filterGroup = value;
      value.on({
        event: 'change', callback: () => {
          this.logger.log("FilterGroup change detected, triggering refreshRows");
          this.refreshRows();
        }
      });
      this.refreshRows();
    }
    this.logger.log("FilterGroup set complete");
  }

  private _onDemandFunction?: (args: IAcOnDemandRequestArgs) => void;
  get onDemandFunction(): ((args: IAcOnDemandRequestArgs) => void) | undefined {
    return this._onDemandFunction;
  }
  set onDemandFunction(value: (args: IAcOnDemandRequestArgs) => void) {
    this.logger.log("Setting onDemandFunction");
    if (value != this._onDemandFunction) {
      this._onDemandFunction = value;
      this.type = 'ondemand';
      this.logger.log("Type switched to 'ondemand'");
    }
    this.logger.log("OnDemandFunction set complete");
  }

  private _searchQuery!: string;
  get searchQuery(): string {
    return this._searchQuery;
  }
  set searchQuery(value: string) {
    this.logger.log("Setting searchQuery", { query: value });
    if (value != this._searchQuery) {
      this._searchQuery = value;
      this.refreshRows();
    }
    this.logger.log("SearchQuery set complete");
  }

  private _sortOrder!: AcSortOrder;
  get sortOrder(): AcSortOrder {
    return this._sortOrder;
  }
  set sortOrder(value: AcSortOrder) {
    this.logger.log("Setting sortOrder", { sortOrdersCount: value.sortOrders.length });
    if (value != this._sortOrder) {
      value.on({
        event: 'change', callback: () => {
          this.logger.log("SortOrder change detected, triggering refreshRows");
          this.refreshRows();
        }
      });
      this._sortOrder = value;
      this.refreshRows();
    }
    this.logger.log("SortOrder set complete");
  }

  private _totalRows: number = 0;
  get totalRows(): number {
    return this._totalRows;
  }
  set totalRows(value: number) {
    this.logger.log("Setting totalRows", { oldValue: this._totalRows, newValue: value });
    if (value != this._totalRows) {
      this._totalRows = value;
      const eventArgs: IAcDataManagerTotalRowsChangeEvent = {
        totalRows: value,
        dataManager: this
      };
      this.hooks.execute({ hook: AcEnumDataManagerHook.TotalRowsChange, args: eventArgs });
      this.hooks.execute({ hook: AcEnumDataManagerHook.DisplayedRowsChange, args: eventArgs });
      this.events.execute({ event: AcEnumDataManagerEvent.TotalRowsChange, args: eventArgs });
      this.events.execute({ event: AcEnumDataManagerEvent.DisplayedRowsChange, args: eventArgs });
      this.logger.log("TotalRowsChange and DisplayedRowsChange events executed");
    }
    this.logger.log("TotalRows set complete");
  }

  private _type: 'offline' | 'ondemand' = 'offline';
  get type(): 'offline' | 'ondemand' {
    return this._type;
  }
  set type(value: 'offline' | 'ondemand') {
    this.logger.log("Setting type", { oldType: this._type, newType: value });
    if (this._type != value) {
      this._type = value;
      this.logger.log(`Type switched to '${value}'`);
    }
    this.logger.log("Type set complete");
  }

  allDataAvailable: boolean = true;
  allRows: T[] = [];
  autoSetUniqueIdToData: boolean = false;
  rows: T[] = [];
  events: AcEvents = new AcEvents();
  hooks: AcHooks = new AcHooks();
  isWorking: boolean = false;
  lastRowsCount: number = 0;
  lastStartIndex: number = 0;
  lastDisplayedRowsCount: number = -1;
  lastDisplayedStartIndex: number = 0;
  logger: AcLogger = new AcLogger({ logMessages: false });
  private refreshRowsTimeout: any;
  refreshRowsTimeoutDuration = 100;

  constructor(private DataRow: new (...args: any[]) => T = AcDataRow as any) {
    this.logger.log("Initializing AcDataManager");
    this.sortOrder = new AcSortOrder();
    this.filterGroup = new AcFilterGroup();
    this.logger.log("Initialized AcDataManager");
  }

  addData({ data = {} }: { data?: any } = {}): T {
    this.logger.log("Adding data", { dataKeys: Object.keys(data) });
    this._data.push(data);
    const index: number = this._data.length - 1;
    const dataRow: T = new this.DataRow({
      data: data,
      index: index,
      dataManager: this
    });
    this.allRows.push(dataRow);
    this.rows.push(dataRow);
    this.totalRows++;
    dataRow.displayIndex = this.displayedRows.length;
    this.displayedRows.push(dataRow);
    this.logger.log("Data added successfully", { rowId: dataRow.rowId, index });
    return dataRow;
  }

  private checkOnDemandRowsAvailable({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}): boolean {
    this.logger.log("Checking on-demand rows availability", { startIndex, rowsCount, totalRows: this.totalRows });
    let available: boolean = false;
    if (this.totalRows > 0) {
      if (rowsCount == -1) {
        rowsCount = this.totalRows;
      }
      let endIndex = startIndex + (rowsCount - 1);
      if (endIndex > (this.totalRows - 1)) {
        endIndex = this.totalRows - 1;
      }
      this.logger.log(`Checking rows availble from start index ${startIndex} to end index ${endIndex} in total rows ${this.totalRows}`);
      if (startIndex < this.totalRows && endIndex < this.totalRows) {
        available = true;
        for (let index = startIndex; index <= endIndex; index++) {
          if (available) {
            if (!this.rows[index]) {
              available = false;
              this.logger.log("Row not available at index", { index });
              break;
            }
            else if (this.rows[index].isPlaceholder) {
              available = false;
              this.logger.log("Placeholder row found at index", { index });
              break;
            }
          }
        }
      }
      else {
        this.logger.log("Start or end index out of bounds");
      }
    }
    else {
      this.logger.log("No total rows, all available");
    }
    this.logger.log("On-demand rows availability check complete", { available });
    return available;
  }

  deleteRow({ data, rowId, key, value }: { data?: any, rowId?: string, key?: string, value?: any }): T | undefined {
    this.logger.log("Deleting row", { rowId, key, value });
    const dataRow: T | undefined = this.rows.find((dataRow: T) => {
      let valid: boolean = false;
      if (rowId) {
        valid = dataRow.rowId == rowId;
      }
      else if (key && value) {
        valid = dataRow.data[key] == value;
      }
      else if (data && key) {
        valid = dataRow.data[key] == data[key];
      }
      else if (data) {
        valid = dataRow.data == data;
      }
      return valid;
    });
    if (dataRow) {
      arrayRemoveByKey(this.allRows, 'rowId', dataRow.rowId);
      arrayRemoveByKey(this.rows, 'rowId', dataRow.rowId);
      arrayRemoveByKey(this._displayedRows, 'rowId', dataRow.rowId);
      this.totalRows--;
      this.setDisplayedRowIndexes();
      this.logger.log("Row deleted successfully", { rowId: dataRow.rowId });
    } else {
      this.logger.log("Row not found for deletion");
    }
    return dataRow;
  }

  private evaluateFilter(filter: AcFilter, row: T): boolean {
    this.logger.log("Evaluating filter", { key: filter.key, operator: filter.operator, value: filter.value });
    const field = filter.key;
    if (!field) {
      this.logger.log("No field in filter, returning true");
      return true;
    }

    const value = row.data[field];
    const filterValue = filter.value;
    const op = filter.operator ?? AcEnumConditionOperator.Unknown;

    const normalize = (v: any): any =>
      typeof v === "string" ? v.toLowerCase().trim() : v;

    let result: boolean;
    switch (op) {
      case AcEnumConditionOperator.EqualTo:
        result = normalize(value) == normalize(filterValue);
        break;

      case AcEnumConditionOperator.NotEqualTo:
        result = normalize(value) != normalize(filterValue);
        break;

      case AcEnumConditionOperator.GreaterThan:
        result = Number(value) > Number(filterValue);
        break;

      case AcEnumConditionOperator.GreaterThanEqualTo:
        result = Number(value) >= Number(filterValue);
        break;

      case AcEnumConditionOperator.LessThan:
        result = Number(value) < Number(filterValue);
        break;

      case AcEnumConditionOperator.LessThanEqualTo:
        result = Number(value) <= Number(filterValue);
        break;

      case AcEnumConditionOperator.Contains:
        result = (
          value != null &&
          filterValue != null &&
          value.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
        );
        break;

      case AcEnumConditionOperator.NotContains:
        result = (
          value == null ||
          filterValue == null ||
          !value.toString().toLowerCase().includes(filterValue.toString().toLowerCase())
        );
        break;

      case AcEnumConditionOperator.StartsWith:
        result = (
          value != null &&
          filterValue != null &&
          value.toString().toLowerCase().startsWith(filterValue.toString().toLowerCase())
        );
        break;

      case AcEnumConditionOperator.EndsWith:
        result = (
          value != null &&
          filterValue != null &&
          value.toString().toLowerCase().endsWith(filterValue.toString().toLowerCase())
        );
        break;

      case AcEnumConditionOperator.In:
        result = Array.isArray(filterValue)
          ? filterValue.map(normalize).includes(normalize(value))
          : false;
        break;

      case AcEnumConditionOperator.NotIn:
        result = Array.isArray(filterValue)
          ? !filterValue.map(normalize).includes(normalize(value))
          : true;
        break;

      case AcEnumConditionOperator.Between:
        if (!Array.isArray(filterValue) || filterValue.length !== 2) {
          this.logger.log("Invalid Between filter value");
          result = true;
        } else {
          const [min, max] = filterValue;
          const valNum = Number(value);
          result = valNum >= Number(min) && valNum <= Number(max);
        }
        break;

      case AcEnumConditionOperator.IsNull:
        result = value === null || value === undefined;
        break;

      case AcEnumConditionOperator.IsNotNull:
        result = value !== null && value !== undefined;
        break;

      case AcEnumConditionOperator.IsEmpty:
        result = value === null || value === undefined || value === "";
        break;

      case AcEnumConditionOperator.IsNotEmpty:
        result = value !== null && value !== undefined && value !== "";
        break;

      default:
        result = true;
        this.logger.log("Unknown operator, defaulting to true");
    }
    this.logger.log("Filter evaluation complete", { result, fieldValue: value });
    return result;
  }

  private evaluateFilterGroup(group: AcFilterGroup, row: T): boolean {
    this.logger.log("Evaluating filter group", { operator: group.operator, filtersCount: group.filters.length, subGroupsCount: group.filterGroups.length });
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
    let combinedResult: boolean;
    if (group.operator === AcEnumLogicalOperator.Or) {
      combinedResult = results.some(Boolean);
    }
    // Default AND
    else {
      combinedResult = results.every(Boolean);
    }
    this.logger.log("Filter group evaluation complete", { combinedResult, resultsCount: results.length });
    return combinedResult;
  }

  private evaluateSearch(searchQuery: string, row: T, searchKeys: string[]): boolean {
    this.logger.log("Evaluating search", { query: searchQuery, searchKeysLength: searchKeys.length, rowIndex: row.index });
    let isValid: boolean = true;
    if (searchQuery) {
      isValid = false;
      for (const field of searchKeys) {
        if (!isValid) {
          const value = row.data[field];
          const valid: boolean = value != null && searchQuery != null && value.toString().toLowerCase().includes(searchQuery.toString().toLowerCase());
          if (valid) {
            isValid = true;
            this.logger.log("Search match found in field", { field, value });
            break;
          }
        }
      }
    }
    this.logger.log("Search evaluation complete", { isValid });
    return isValid;
  }

  async getData({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}): Promise<any[]> {
    this.logger.log("Getting data", { startIndex, rowsCount });
    const allRows: T[] = await this.getRows({ startIndex, rowsCount });
    const result: any[] = [];
    for (const row of allRows) {
      result.push(row.data);
    }
    this.logger.log("Data retrieval complete", { resultLength: result.length });
    return result;
  }

  async getRows({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}): Promise<T[]> {
    this.logger.log("Getting rows", { startIndex, rowsCount, type: this.type });
    this.lastStartIndex = startIndex;
    this.lastRowsCount = rowsCount;
    const setResultFromRows = () => {
      const fromIndex: number = startIndex ?? 0;
      const toIndex: number = fromIndex + ((rowsCount > -1 ? rowsCount : this.totalRows) - 1);
      for (let index = fromIndex; index <= toIndex && index < this.totalRows; index++) {
        if (this.rows[index]) {
          result.push(this.rows[index]);
        }
      }
      this.logger.log("Rows set from existing data", { fromIndex, toIndex, fetchedCount: result.length });
    };
    const result: T[] = [];
    if (this.type === "ondemand") {
      if (this.onDemandFunction) {
        if (this.checkOnDemandRowsAvailable({ startIndex, rowsCount })) {
          this.logger.log("All requested on-demand rows available locally");
          setResultFromRows();
        }
        else {
          this.logger.log("Fetching on-demand data");
          return new Promise<T[]>((resolve, reject) => {
            const requestArgs: IAcOnDemandRequestArgs = {
              filterGroup: this.filterGroup,
              sortOrder: this.sortOrder,
              successCallback: (response: IAcOnDemandResponseArgs) => {
                try {
                  const hookArgs: IAcDataManagerGetOnDemandDataSuccessCallbackHookArgs = {
                    dataManager: this,
                    requestArgs,
                    responseArgs: response,
                  };
                  this.logger.log("On-demand success callback received", { dataLength: response.data.length, totalCount: response.totalCount });
                  this.setRows({
                    data: response.data,
                    totalCount: response.totalCount,
                    startIndex: startIndex,
                  });
                  setResultFromRows();
                  this.hooks.execute({
                    hook: AcEnumDataManagerHook.GetOnDemandDataSuccessCallback,
                    args: hookArgs,
                  });
                  this.logger.log("On-demand success callback processed");
                  resolve(result);
                } catch (error) {
                  this.logger.log("Error in on-demand success callback", { error });
                  reject(error);
                }
              },
              errorCallback: (error: any) => {
                this.logger.log("On-demand error callback", { error });
                reject(error); // ✅ Optional: handle rejection from API
              },
            };
            if (startIndex >= 0 && rowsCount > 0) {
              requestArgs.pageNumber = (startIndex / rowsCount) + 1;
              requestArgs.rowsCount = rowsCount;
              requestArgs.startIndex = startIndex;
            }
            else {
              requestArgs.allRows = true;
            }
            requestArgs.searchQuery = this.searchQuery;
            const hookArgs: IAcDataManagerBeforeGetOnDemandDataHookArgs = {
              dataManager: this,
              requestArgs,
            };

            this.hooks.execute({
              hook: AcEnumDataManagerHook.BeforeGetOnDemandData,
              args: hookArgs,
            });
            this.logger.log("BeforeGetOnDemandData hook executed");

            // Call the on-demand function
            try {
              this.onDemandFunction!(requestArgs);
              this.logger.log("On-demand function called");
            } catch (err) {
              this.logger.log("Error calling on-demand function", { err });
              reject(err);
            }
          });
        }
      } else {
        this.logger.log("No onDemandFunction set, returning empty array");
        return [];
      }
    }
    else {
      this.logger.log("Offline mode, setting rows from local data");
      setResultFromRows();
    }
    this.logger.log("Rows retrieval complete", { resultLength: result.length });
    return result;
  }

  getRowIndex({ key, value }: { key: string, value: any }): number {
    this.logger.log("Getting row index", { key, value });
    const index = this.allRows.findIndex((row: T) => {
      return row.data[key] == value;
    });
    this.logger.log("Row index retrieval complete", { index });
    return index;
  }

  getRowAtIndex({ index }: { index: number }): T | undefined {
    this.logger.log("Getting row at index", { index });
    const row = this.allRows.find((row: T) => {
      return row.index == index;
    });
    this.logger.log("Row at index retrieval complete", { index, found: !!row });
    return row;
  }

  getRow({ key, value }: { key: string, value: any }): T | undefined {
    this.logger.log("Getting row", { key, value });
    const row = this.allRows.find((row: T) => {
      return row.data[key] == value;
    });
    this.logger.log("Row retrieval complete", { key, found: !!row });
    return row;
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.logger.log("Unsubscribing from event", { event, subscriptionId });
    this.events.unsubscribe({ event, callback, subscriptionId });
    this.logger.log("Unsubscribe complete");
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    this.logger.log("Subscribing to event", { event });
    const subscriptionId = this.events.subscribe({ event, callback });
    this.logger.log("Subscribe complete", { subscriptionId });
    return subscriptionId;
  }

  processRows() {
    this.logger.log("Processing rows", { allRowsLength: this.allRows.length, searchQuery: this.searchQuery, filterGroupHasFilters: this.filterGroup.hasFilters(), sortOrdersCount: this.sortOrder.sortOrders.length });
    let filteredRows = [...this.allRows];
    if (this.type == 'offline') {
      if (filteredRows.length > 0) {
        if (this.searchQuery) {
          const keys: any = Object.keys(filteredRows[0].data);
          this.logger.log("Applying search filter", { query: this.searchQuery, keysLength: keys.length });
          filteredRows = filteredRows.filter((row: T) => this.evaluateSearch(this.searchQuery, row, keys));
          this.logger.log("Search filter applied", { filteredLength: filteredRows.length });
        }
        if (this.filterGroup && (this.filterGroup.hasFilters() || this.filterGroup.filterGroups.length > 0)) {
          this.logger.log("Applying filter group");
          filteredRows = filteredRows.filter((row: T) => this.evaluateFilterGroup(this.filterGroup, row));
          this.logger.log("Filter group applied", { filteredLength: filteredRows.length });
        }
      }
      this.rows = filteredRows;
      if (this.sortOrder.sortOrders.length > 0) {
        this.logger.log("Applying sort orders");
        this.rows.sort((a: T, b: T): number => {
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
        this.logger.log("Sort orders applied");
      }
      this.totalRows = this.rows.length;
      this.logger.log("Setting displayed rows after processing", { startIndex: this.lastDisplayedStartIndex, rowsCount: this.lastDisplayedRowsCount });
      this.setDisplayedRows({ startIndex: this.lastDisplayedStartIndex, rowsCount: this.lastDisplayedRowsCount });
    }
    else {
      this.rows = filteredRows;
      this.totalRows = this.rows.length;
      this.logger.log("On-demand mode, rows set without full processing");
    }
    this.logger.log("Rows processing complete", { rowsLength: this.rows.length, totalRows: this.totalRows });
  }

  async refreshRows() {
    this.logger.log("Refreshing rows", { type: this.type, timeoutDuration: this.refreshRowsTimeoutDuration });
    if (this.refreshRowsTimeout) {
      clearTimeout(this.refreshRowsTimeout);
      this.logger.log("Cleared existing refresh timeout");
    }
    this.refreshRowsTimeout = setTimeout(async () => {
      this.logger.log("Refresh timeout executed");
      if (this.type == "offline") {
        this.processRows();
      }
      else {
        this.logger.log("On-demand refresh: setting isWorking to true");
        this.isWorking = true;
        this.reset();
        await this.getRows({ rowsCount: this.lastRowsCount });
        this.setDisplayedRows({ startIndex: this.lastDisplayedStartIndex, rowsCount: this.lastDisplayedRowsCount });
        this.logger.log("On-demand refresh: setting isWorking to false");
        this.isWorking = false;
      }
      this.logger.log("Refresh rows complete");
    }, this.refreshRowsTimeoutDuration);
  }

  reset() {
    this.logger.log("Resetting data manager");
    this._data = [];
    this.totalRows = 0;
    this.allRows = [];
    this.displayedRows = [];
    this.lastDisplayedStartIndex = 0;
    this.rows = [];
    this.logger.log("Reset complete");
  }

  setRows({ data, startIndex, totalCount }: { data: any[], startIndex?: number, totalCount?: number }) {
    this.logger.log("Setting rows", { dataLength: data.length, startIndex, totalCount, type: this.type });
    if (this.type == 'offline') {
      const hookArgs: IAcDataManagerDataChangeHookArgs = {
        data: data,
        dataManager: this,
        oldData: this.data
      }
      this.hooks.execute({ hook: AcEnumDataManagerHook.BeforeDataChange, args: hookArgs });
      this.logger.log("BeforeDataChange hook executed");
      this._data = data;
      let index = 0;
      this.allRows = [];
      for (const row of this._data) {
        const dataRow: T = new this.DataRow({
          data: row,
          index: index,
          dataManager: this
        });
        this.allRows.push(dataRow);
        const hookArgs: IAcDataManagerRowHookArgs = {
          dataManager: this,
          dataRow: dataRow,
        };
        this.hooks.execute({ hook: AcEnumDataManagerHook.RowCreate, args: hookArgs });
        index++;
      }
      this.hooks.execute({ hook: AcEnumDataManagerHook.DataChange, args: hookArgs });
      this.logger.log("DataChange hook executed, all data available");
      this.allDataAvailable = true;
      this.processRows();
    }
    else if (this.type == 'ondemand') {
      if (totalCount == undefined) {
        totalCount = data.length;
      }
      if (this._data.length < totalCount) {
        this.logger.log("Initializing placeholders for totalCount", { totalCount });
        this._data = new Array(totalCount).fill(undefined);
        this.allRows = [];
        for (let index = 0; index < totalCount; index++) {
          const dataRow: T = new this.DataRow({
            data: {},
            isPlaceholder: true,
            index: index,
            dataManager: this
          });
          this.allRows[index] = dataRow;
        }
      }
      const hookArgs: IAcDataManagerDataChangeHookArgs = {
        data: data,
        dataManager: this,
        oldData: this.data
      }
      this.hooks.execute({ hook: AcEnumDataManagerHook.BeforeDataChange, args: hookArgs });
      this.logger.log("BeforeDataChange hook executed for on-demand");
      if (startIndex == undefined) {
        startIndex = 0;
      }
      let index: number = startIndex;
      for (const row of data) {
        this._data[index] = row;
        this.allRows[index].isPlaceholder = false;
        this.allRows[index].data = row;
        const hookArgs: IAcDataManagerRowHookArgs = {
          dataManager: this,
          dataRow: this.allRows[index],
        };
        this.hooks.execute({ hook: AcEnumDataManagerHook.RowCreate, args: hookArgs });
        index++;
      }
      this.hooks.execute({ hook: AcEnumDataManagerHook.DataChange, args: hookArgs });
      this.allDataAvailable = this.data.filter((item) => { return item == undefined }).length == 0;
      this.totalRows = totalCount;
      this.logger.log("On-demand data set, allDataAvailable:", { allDataAvailable: this.allDataAvailable });
      this.processRows();
    }
    this.logger.log("Rows set complete", { totalRows: this.totalRows, allDataAvailable: this.allDataAvailable });
  }

  async setDisplayedRows({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}) {
    this.logger.log("Setting displayed rows", { startIndex, rowsCount });
    this.lastDisplayedRowsCount = rowsCount;
    this.lastDisplayedStartIndex = startIndex;
    const displayedRows: T[] = await this.getRows({ startIndex, rowsCount });
    this.logger.log("Setting displayed rows display index");
    let displayIndex: number = startIndex - 1;
    for (const row of displayedRows) {
      displayIndex++;
      row.displayIndex = displayIndex;
    }
    this.displayedRows = displayedRows;
    this.logger.log("Displayed rows set complete", { length: displayedRows.length });
  }

  async setDisplayedRowIndexes({ startIndex = 0, displayedRows }: { startIndex?: number; displayedRows?: T[]; } = {}) {
    this.logger.log("Setting displayed row indexes", { startIndex });
    if (displayedRows == undefined) {
      displayedRows = this._displayedRows;
    }
    let displayIndex: number = startIndex - 1;
    for (const row of displayedRows) {
      displayIndex++;
      row.displayIndex = displayIndex;
    }
    this.displayedRows = displayedRows;
    this.logger.log("Displayed row indexes set complete", { length: displayedRows.length });
  }

  updateRow({ data, value, key, rowId, addIfMissing = true }: { data: any, value?: any, key?: string, rowId?: string, highlightCells?: boolean, addIfMissing?: boolean }): T | undefined {
    this.logger.log("Updating row", { rowId, key, value, dataKeys: Object.keys(data), addIfMissing });
    let dataRow: T | undefined = this.rows.find((row) => {
      let valid: boolean = false;
      if (rowId) {
        valid = row.rowId == rowId;
      }
      else if (key && value) {
        valid = row.data[key] == value;
      }
      else if (data && key) {
        valid = row.data[key] == data[key];
      }
      else if (data) {
        valid = row.data == data;
      }
      return valid;
    });
    if (dataRow) {
      dataRow.data = data;
      const eventArgs: IAcDataManagerRowEvent = {
        dataManager: this,
        dataRow: dataRow
      };
      this.events.execute({ event: AcEnumDataManagerEvent.RowUpdate, args: eventArgs });
      this.logger.log("Row updated successfully", { rowId: dataRow.rowId });
    }
    else if (addIfMissing) {
      this.logger.log("Row not found, adding new row");
      dataRow = this.addData({ data: data });
    } else {
      this.logger.log("Row not found and addIfMissing false");
    }
    return dataRow;
  }

}
