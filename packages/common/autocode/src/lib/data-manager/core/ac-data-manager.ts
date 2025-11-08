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

export class AcDataManager<T extends AcDataRow = AcDataRow> {
  private _data: any[] = [];
  get data(): any[] {
    return this._data;
  }
  set data(value: any[]) {
    this.setRows({ data: value });
  }

  private _displayedRows: T[] = [];
  get displayedRows(): T[] {
    return this._displayedRows;
  }
  set displayedRows(value: T[]) {
    this._displayedRows = value;
    const eventArgs: IAcDataManagerDisplayedRowsChangeEvent = {
      displayedRows: value,
      dataManager: this
    };
    this.hooks.execute({ hook: AcEnumDataManagerHook.DisplayedRowsChange, args: eventArgs });
    this.events.execute({ event: AcEnumDataManagerEvent.DisplayedRowsChange, args: eventArgs });
  }

  private _filterGroup!: AcFilterGroup;
  get filterGroup(): AcFilterGroup {
    return this._filterGroup;
  }
  set filterGroup(value: AcFilterGroup) {
    if (value != this._filterGroup) {
      this._filterGroup = value;
      value.on({
        event: 'change', callback: () => {
          this.refreshRows();
        }
      });
      this.refreshRows();
    }
  }

  private _onDemandFunction?: (args: IAcOnDemandRequestArgs) => void;
  get onDemandFunction(): ((args: IAcOnDemandRequestArgs) => void) | undefined {
    return this._onDemandFunction;
  }
  set onDemandFunction(value: (args: IAcOnDemandRequestArgs) => void) {
    if (value != this._onDemandFunction) {
      this._onDemandFunction = value;
      this.type = 'ondemand';
    }
  }

  private _searchQuery!: string;
  get searchQuery(): string {
    return this._searchQuery;
  }
  set searchQuery(value: string) {
    if (value != this._searchQuery) {
      this._searchQuery = value;
      this.refreshRows();
    }
  }

  private _sortOrder!: AcSortOrder;
  get sortOrder(): AcSortOrder {
    return this._sortOrder;
  }
  set sortOrder(value: AcSortOrder) {
    if (value != this._sortOrder) {
      value.on({
        event: 'change', callback: () => {
          this.refreshRows();
        }
      });
      this._sortOrder = value;
      this.refreshRows();
    }
  }

  private _totalRows: number = 0;
  get totalRows(): number {
    return this._totalRows;
  }
  set totalRows(value: number) {
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
  allRows: T[] = [];
  autoSetUniqueIdToData: boolean = false;
  rows: T[] = [];
  events: AcEvents = new AcEvents();
  hooks: AcHooks = new AcHooks();
  lastRowsCount: number = 0;
  lastStartIndex: number = 0;
  lastDisplayedRowsCount: number = -1;
  lastDisplayedStartIndex: number = 0;
  isWorking:boolean = false;

  constructor(private DataRow: new (...args: any[]) => T = AcDataRow as any) {
    this.sortOrder = new AcSortOrder();
    this.filterGroup = new AcFilterGroup();
  }

  addData({ data }: { data: any }): T {
    this._data.push(data);
    const index: number = this._data.length - 1;
    const dataRow: T = new this.DataRow({
      data: data,
      index: index,
      dataManager: this
    });
    this.allRows.push(dataRow);
    this.totalRows++;
    this.processRows();
    return dataRow;
  }

  private checkOnDemandRowsAvailable({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}): boolean {
    let available: boolean = false;
    if (this.totalRows > 0) {
      if (rowsCount == -1) {
        rowsCount = this.totalRows;
      }
      const endIndex = startIndex + (rowsCount - 1);
      if (startIndex < this.totalRows && endIndex < this.totalRows) {
        available = true;
        for (let index = startIndex; index <= endIndex; index++) {
          if (available) {
            if (!this.rows[index]) {
              available = false;
              break;
            }
            else if (this.rows[index].isPlaceholder) {
              available = false;
              break;
            }
          }
        }
      }
      else {
        //
      }
    }
    else {
      //
    }
    return available;
  }

  deleteRow({ data, rowId, key, value }: { data?: any, rowId?: string, key?: string, value?: any }): T | undefined {
    const dataRow: T | undefined = this.rows.find((dataRow: T) => {
      let valid: boolean = false;
      if (rowId) {
        valid = dataRow.acRowId == rowId;
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
      arrayRemoveByKey(this.rows, 'acRowId', dataRow.acRowId);
      this.totalRows--;
    }
    return dataRow;
  }

  private evaluateFilter(filter: AcFilter, row: T): boolean {
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

  private evaluateFilterGroup(group: AcFilterGroup, row: T): boolean {
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

  private evaluateSearch(searchQuery: string, row: T, searchKeys: string[]): boolean {
    let isValid: boolean = true;
    if (searchQuery) {
      isValid = false;
      for (const field of searchKeys) {
        if (!isValid) {
          const value = row.data[field];
          const valid: boolean = value != null && searchQuery != null && value.toString().toLowerCase().includes(searchQuery.toString().toLowerCase());
          if (valid) {
            isValid = true;
            break;
          }
        }
      }
    }
    return isValid;
  }

  async getData({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}): Promise<any[]> {
    const allRows: T[] = await this.getRows({ startIndex, rowsCount });
    const result: any[] = [];
    for (const row of allRows) {
      result.push(row.data);
    }
    return result;
  }

  async getRows({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}): Promise<T[]> {
    this.lastStartIndex = startIndex;
    this.lastRowsCount = rowsCount;
    const setResultFromRows = () => {
      const fromIndex: number = startIndex ?? 0;
      const toIndex: number = fromIndex + ((rowsCount > -1 ? rowsCount : this.totalRows) - 1);
      for (let index = fromIndex; index <= toIndex && index < this.totalRows; index++) {
        result.push(this.rows[index]);
      }
    };
    const result: T[] = [];
    if (this.type === "ondemand") {
      if (this.onDemandFunction) {
        if (this.checkOnDemandRowsAvailable({ startIndex, rowsCount })) {
          setResultFromRows();
        }
        else {
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
                  resolve(result);
                } catch (error) {
                  reject(error);
                }
              },
              errorCallback: (error: any) => {
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

            // Call the on-demand function
            try {
              this.onDemandFunction!(requestArgs);
            } catch (err) {
              reject(err);
            }
          });
        }
      } else {
        return [];
      }
    }
    else {
      setResultFromRows();
    }
    return result;
  }

  getRowIndex({ key, value }: { key: string, value: any }): number {
    return this.allRows.findIndex((row: T) => {
      return row.data[key] == value;
    });
  }

  getRowAtIndex({ index }: { index: number }): T | undefined {
    return this.allRows.find((row: T) => {
      return row.index == index;
    });
  }

  getRow({ key, value }: { key: string, value: any }): T | undefined {
    return this.allRows.find((row: T) => {
      return row.data[key] == value;
    });
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback, subscriptionId });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

  processRows() {
    let filteredRows = [...this.allRows];
    if (this.type == 'offline') {
      if (filteredRows.length > 0) {
        if (this.searchQuery) {
          const keys: any = Object.keys(filteredRows[0].data);
          filteredRows = filteredRows.filter((row: T) => this.evaluateSearch(this.searchQuery, row, keys));
        }
        if (this.filterGroup && (this.filterGroup.hasFilters() || this.filterGroup.filterGroups.length > 0)) {
          filteredRows = filteredRows.filter((row: T) => this.evaluateFilterGroup(this.filterGroup, row));
        }
      }
      this.rows = filteredRows;
      if (this.sortOrder.sortOrders.length > 0) {
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
      }
      this.totalRows = this.rows.length;
      this.setDisplayedRows({ startIndex: this.lastDisplayedStartIndex, rowsCount: this.lastDisplayedRowsCount });
    }
    else {
      this.rows = filteredRows;
    }
  }

  async refreshRows() {
    if (this.type == "offline") {
      this.processRows();
    }
    else {
      this.isWorking =true;
      this.reset();
      await this.getRows({ rowsCount: this.lastRowsCount });
      this.setDisplayedRows({startIndex:this.lastDisplayedStartIndex,rowsCount:this.lastDisplayedRowsCount});
      this.isWorking = false;
    }
  }

  reset() {
    this._data = [];
    this.totalRows = 0;
    this.allRows = [];
    this.displayedRows = [];
    this.lastDisplayedStartIndex = 0;
    this.rows = [];
  }

  setRows({ data, startIndex, totalCount }: { data: any[], startIndex?: number, totalCount?: number }) {
    if (this.type == 'offline') {
      const hookArgs: IAcDataManagerDataChangeHookArgs = {
        data: data,
        dataManager: this,
        oldData: this.data
      }
      this.hooks.execute({ hook: AcEnumDataManagerHook.BeforeDataChange, args: hookArgs });
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
      this.allDataAvailable = true;
      this.processRows();
    }
    else if (this.type == 'ondemand') {
      if (totalCount == undefined) {
        totalCount = data.length;
      }
      if (this._data.length < totalCount) {
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
      this.processRows();
    }
  }

  async setDisplayedRows({ startIndex = 0, rowsCount = -1 }: { startIndex?: number; rowsCount?: number; } = {}) {
    this.lastDisplayedRowsCount = rowsCount;
    this.lastDisplayedStartIndex = startIndex;
    const displayedRows: T[] = await this.getRows({ startIndex, rowsCount });
    this.displayedRows = displayedRows;
  }

  updateRow({ data, value, key, rowId, addIfMissing = true }: { data: any, value?: any, key?: string, rowId?: string, highlightCells?: boolean, addIfMissing?: boolean }): T|undefined {
    let dataRow: T | undefined = this.rows.find((row) => {
      let valid: boolean = false;
      if (rowId) {
        valid = row.acRowId == rowId;
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
    }
    else if(addIfMissing){
      dataRow = this.addData({ data: data });
    }
    return dataRow;
  }

}
