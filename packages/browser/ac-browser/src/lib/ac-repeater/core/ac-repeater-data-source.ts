/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumSortOrder, AcEvents } from "@autocode-ts/autocode";
import { AcRepeaterRow } from "../models/ac-repeater-row.model";
import { IAcRepeaterDisplayedRowsChangeEvent } from "../interfaces/event-args/ac-repeater-displayed-rows-change-event.interface";
import { AcEnumRepeaterHook } from "../enums/ac-enum-repeater-hooks.enum";
import { AcEnumRepeaterEvent } from "../enums/ac-enum-repeater-event.enum";
import { AcRepeaterApi } from "./ac-repeater-api";
import { IAcRepeaterTotalRowsChangeEvent } from "../interfaces/event-args/ac-repeater-total-rows-change-event.interface";
import { IAcRepeaterDataChangeHookArgs } from "../interfaces/hook-args/ac-repeater-data-change-hook-args.interface";
import { IAcRepeaterRowHookArgs } from "../interfaces/hook-args/ac-repeater-row-hook-args.interface";

export class AcRepeaterDataSource {
  private _displayedRepeaterRows: AcRepeaterRow[] = [];
  get displayedRepeaterRows(): AcRepeaterRow[] {
    return this._displayedRepeaterRows;
  }
  set displayedRepeaterRows(value: AcRepeaterRow[]) {
    this._displayedRepeaterRows = value;
    const eventArgs: IAcRepeaterDisplayedRowsChangeEvent = {
      displayedRows: value,
      repeaterApi: this.repeaterApi
    };
    this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.DisplayedRowsChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumRepeaterEvent.DisplayedRowsChange, args: eventArgs });
  }

  private _totalRows: number = 0;
  get totalRows(): number {
    return this._totalRows;
  }
  set totalRows(value: number) {
    this._totalRows = value;
    const eventArgs: IAcRepeaterTotalRowsChangeEvent = {
      totalRows: value,
      repeaterApi: this.repeaterApi
    };
    this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.TotalRowsChange, args: eventArgs });
    this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.DisplayedRowsChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumRepeaterEvent.TotalRowsChange, args: eventArgs });
    this.events.execute({ eventName: AcEnumRepeaterEvent.DisplayedRowsChange, args: eventArgs });
  }

  allDataAvailable: boolean = false;
  data: any[] = [];
  repeaterApi: AcRepeaterApi;
  repeaterRows: AcRepeaterRow[] = [];
  processedRepeaterRows: AcRepeaterRow[] = [];
  events: AcEvents = new AcEvents();

  constructor({ repeaterApi }: { repeaterApi: AcRepeaterApi }) {
    this.repeaterApi = repeaterApi;
  }

  getData({ startIndex = 0, rowsCount = 100}: { startIndex?: number; rowsCount?: number; } = {}){
    //
  }

  processData() {
    this.processedRepeaterRows = [...this.repeaterRows];
    this.totalRows = this.processedRepeaterRows.length;
    if (this.repeaterApi.sortOrder.sortOrders.length > 0) {
      this.processedRepeaterRows.sort((a: AcRepeaterRow, b: AcRepeaterRow): number => {
        let index = 0;
        for (const sort of this.repeaterApi.sortOrder.sortOrders) {
          const field = sort.key;
          const valA: any = a.data[field];
          const valB: any = b.data[field];
          let result = 0;
          if (typeof valA === "string") {
            result = valA.localeCompare(valB);
          } else {
            result = valA - valB;
          }
          if (result !== 0) {
            index = sort.order == AcEnumSortOrder.Ascending ? result : -result;
            break;
          }
        }
        return index;
      });
    }
    this.setDisplayedData();
  }

  setData({ data,startIndex,totalCount }: { data: any[],startIndex?:number,totalCount?:number }) {
    const hookArgs: IAcRepeaterDataChangeHookArgs = {
      data: data,
      repeaterApi: this.repeaterApi,
      oldData: this.data
    }
    this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.BeforeDataChange, args: hookArgs });
    this.data = data;
    let index = 0;
    this.repeaterRows = [];
    for (const row of this.data) {
      const repeaterRow: AcRepeaterRow = new AcRepeaterRow({
        data: row,
        index: index,
        repeaterApi: this.repeaterApi
      });
      this.repeaterRows.push(repeaterRow);
      const hookArgs: IAcRepeaterRowHookArgs = {
        repeaterApi: this.repeaterApi,
        repeaterRow: repeaterRow,
      };
      this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.RepeaterRowCreated, args: hookArgs });
      index++;
    }
    this.repeaterApi.hooks.execute({ hookName: AcEnumRepeaterHook.DataChange, args: hookArgs });
    this.allDataAvailable = true;
    this.totalRows = index;
    // this.processData();
  }

  setDisplayedData() {
    let displayedRows: AcRepeaterRow[] = [];
    if (this.repeaterApi.usePagination && this.repeaterApi.pagination) {
      const startIndex = this.repeaterApi.pagination.paginationApi.startRow - 1;
      const endIndex = this.repeaterApi.pagination.paginationApi.endRow - 1;
      if (startIndex >= 0 && endIndex >= 0) {
        for (let index = startIndex; index <= endIndex; index++) {
          displayedRows.push(this.processedRepeaterRows[index]);
        }
      }
    }
    else {
      displayedRows = this.processedRepeaterRows;
    }
    this.displayedRepeaterRows = displayedRows;
  }

}
