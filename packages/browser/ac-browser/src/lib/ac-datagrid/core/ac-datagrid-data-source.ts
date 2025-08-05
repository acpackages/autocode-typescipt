/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, Autocode } from "@autocode-ts/autocode";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { AcDatagridApi } from "./ac-datagrid-api";
import { AcEnumSortDirection } from "../../enums/ac-enum-sort-direction.enum";
import { IAcDatagridDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-datagrid-displayed-rows-change-event.interface";
import { IAcDatagridTotalRowsChangeEvent } from "../interfaces/event-args/ac-datagrid-total-rows-change-event.interface";
import { AcEnumDatagridHook } from "../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridDataChangeHookArgs } from "../interfaces/hook-args/ac-datagrid-data-change-hook-args.interface";
import { IAcDatagridRowHookArgs } from "../interfaces/hook-args/ac-datagrid-row-hook-args.interface";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";

export class AcDatagridDataSource {
  private _displayedDatagridRows: AcDatagridRow[] = [];
  get displayedDatagridRows(): AcDatagridRow[] {
    return this._displayedDatagridRows;
  }
  set displayedDatagridRows(value: AcDatagridRow[]) {
    this._displayedDatagridRows = value;
    const eventArgs: IAcDatagridDisplayedRowsChangeEvent = {
      displayedRows: value,
      datagridApi: this.datagridApi
    };
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.DisplayedRowsChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumDatagridEvent.DisplayedRowsChange, args: eventArgs });
  }

  private _totalRows: number = 0;
  get totalRows(): number {
    return this._totalRows;
  }
  set totalRows(value: number) {
    this._totalRows = value;
    const eventArgs: IAcDatagridTotalRowsChangeEvent = {
      totalRows: value,
      datagridApi: this.datagridApi
    };
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.TotalRowsChange, args: eventArgs });
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.DisplayedRowsChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumDatagridEvent.TotalRowsChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumDatagridEvent.DisplayedRowsChange, args: eventArgs });
  }

  allDataAvailable: boolean = false;
  data: any[] = [];
  datagridApi: AcDatagridApi;
  datagridRows: AcDatagridRow[] = [];
  processedDatagridRows: AcDatagridRow[] = [];
  events: AcEvents = new AcEvents();

  constructor({ datagridApi }: { datagridApi: AcDatagridApi }) {
    this.datagridApi = datagridApi;
  }

  getData({ startIndex = 0, rowsCount = 100}: { startIndex?: number; rowsCount?: number; } = {}){
    //
  }

  processData() {
    this.processedDatagridRows = [...this.datagridRows];
    this.totalRows = this.processedDatagridRows.length;
    if (this.datagridApi.sortOrder.length > 0) {
      this.processedDatagridRows.sort((a: AcDatagridRow, b: AcDatagridRow): number => {
        let index = 0;
        for (const datagridColumn of this.datagridApi.sortOrder) {
          const field = datagridColumn.colDef.field;
          const valA: any = a.data[field];
          const valB: any = b.data[field];
          let result = 0;
          if (typeof valA === "string") {
            result = valA.localeCompare(valB);
          } else {
            result = valA - valB;
          }
          if (result !== 0) {
            index = datagridColumn.sortDirection == AcEnumSortDirection.Ascending ? result : -result;
            break;
          }
        }
        return index;
      });
    }
    this.setDisplayedData();
  }

  setData({ data,startIndex,totalCount }: { data: any[],startIndex?:number,totalCount?:number }) {
    const hookArgs: IAcDatagridDataChangeHookArgs = {
      data: data,
      datagridApi: this.datagridApi,
      oldData: this.data
    }
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.BeforeDataChange, args: hookArgs });
    this.data = data;
    let index = 0;
    this.datagridRows = [];
    for (const row of this.data) {
      const datagridRow: AcDatagridRow = new AcDatagridRow({
        data: row,
        index: index,
        datagridApi: this.datagridApi
      });
      this.datagridRows.push(datagridRow);
      const hookArgs: IAcDatagridRowHookArgs = {
        datagridApi: this.datagridApi,
        datagridRow: datagridRow,
      };
      this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.DatagridRowCreated, args: hookArgs });
      index++;
    }
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.DataChange, args: hookArgs });
    this.allDataAvailable = true;
    this.totalRows = index;
    this.processData();
  }

  setDisplayedData() {
    let displayedRows: AcDatagridRow[] = [];
    if (this.datagridApi.usePagination && this.datagridApi.pagination) {
      const startIndex = this.datagridApi.pagination.paginationApi.startRow - 1;
      const endIndex = this.datagridApi.pagination.paginationApi.endRow - 1;
      if (startIndex >= 0 && endIndex >= 0) {
        for (let index = startIndex; index <= endIndex; index++) {
          displayedRows.push(this.processedDatagridRows[index]);
        }
      }
    }
    else {
      displayedRows = this.processedDatagridRows;
    }
    this.displayedDatagridRows = displayedRows;
  }

}
