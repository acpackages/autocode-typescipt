/* eslint-disable @typescript-eslint/no-inferrable-types */
import { arrayRemoveByKey } from "@autocode-ts/ac-extensions";
import { AcDataManager, AcEvents, AcHooks, AcSortOrder } from "@autocode-ts/autocode";
import { AcEnumPaginationEvent, AcPagination } from "../../ac-pagination/_ac-pagination.export";
import { IAcPaginationPageChangeEvent } from "../../ac-pagination/interfaces/_interfaces.export";
import { AcEnumRepeaterEvent } from "../enums/ac-enum-repeater-event.enum";
import { AcEnumRepeaterHook } from "../enums/ac-enum-repeater-hooks.enum";
import { IAcRepeaterState } from "../interfaces/ac-repeater-state.interface";
import { IAcRepeaterRowEvent } from "../interfaces/event-args/ac-repeater-row-event.interface";
import { IAcRepeaterRowPositionChangeEvent } from "../interfaces/event-args/ac-repeater-row-position-change-event.interface";
import { IAcRepeaterTotalRowsChangeEvent } from "../interfaces/event-args/ac-repeater-total-rows-change-event.interface";
import { IAcRepeaterDataSourceTypeChangeHookArgs } from "../interfaces/hook-args/ac-repeater-data-source-type-change-hook-args.interface";
import { IAcRepeaterExtensionEnabledHookArgs } from "../interfaces/hook-args/ac-repeater-extension-enabled-hook-args.interface";
import { IAcRepeaterRowDeleteHookArgs } from "../interfaces/hook-args/ac-repeater-row-delete-hook-args.interface";
import { IAcRepeaterRowFocusHookArgs } from "../interfaces/hook-args/ac-repeater-row-focus-hook-args.interface";
import { IAcRepeaterRowUpdateHookArgs } from "../interfaces/hook-args/ac-repeater-row-update-hook-args.interface";
import { IAcRepeaterUsePaginationChangeHookArgs } from "../interfaces/hook-args/ac-repeater-use-pagination-change-hook-args.interface";
import { AcRepeaterRow } from "../models/ac-repeater-row.model";
import { AcRepeaterExtension } from "./ac-repeater-extension";
import { IAcRepeaterRowHookArgs } from "../interfaces/hook-args/ac-repeater-row-hook-args.interface";
import { IAcRepeaterRowAddHookArgs } from "../interfaces/hook-args/ac-repeater-row-add-hook-args.interface";
import { AcRepeaterExtensionManager } from "./ac-repeater-extension-manager";
import { AcRepeaterState } from "./ac-repeater-state";
import { AcRepeaterEventHandler } from "./ac-repeater-event-handler";
import { AcRepeater } from "../elements/ac-repeater.element";
import { AcEnumDataSourceType } from "../../../enums/ac-enum-data-source-type.enum";

export class AcRepeaterApi{

  get data(): any[] {
    return this.dataManager.data;
  }
  set data(value: any[]) {
    this.dataManager.data = value;
  }

  get repeaterRows(): AcRepeaterRow[] {
    let result: AcRepeaterRow[] = [];
    if (this.dataManager) {
      result = this.dataManager.rows as AcRepeaterRow[];
    }
    return result;
  }

  get displayedRepeaterRows(): AcRepeaterRow[] {
    return this.dataManager.displayedRows as AcRepeaterRow[];
  }

  private _usePagination: boolean = false;
  get usePagination(): boolean {
    return this._usePagination;
  }
  set usePagination(value: boolean) {
    const hookArgs: IAcRepeaterUsePaginationChangeHookArgs = {
      usePagination: value,
      repeaterApi: this,
      oldUsePagination: this._usePagination
    };
    this._usePagination = value;
    this.pagination = new AcPagination();
    this.pagination.bindDataManager({dataManager:this.dataManager});
    this.hooks.execute({ hook: AcEnumRepeaterHook.UsePaginationChange, args: hookArgs });
    this.repeater.repeaterFooter.setPagination();
  }

  activeRepeaterRow:AcRepeaterRow | undefined;
  repeater!: AcRepeater;
  repeaterState:AcRepeaterState;
  dataManager: AcDataManager = new AcDataManager();
  eventHandler!:AcRepeaterEventHandler;
  events: AcEvents = new AcEvents();
  extensions: Record<string, AcRepeaterExtension> = {};
  hooks: AcHooks = new AcHooks();
  hoverCellId?: string;
  hoverColumnId?: string;
  hoverRowId?: string;
  pagination?: AcPagination;
  sortOrder: AcSortOrder = new AcSortOrder();

  constructor({ repeater }: { repeater: AcRepeater }) {
    AcRepeaterExtensionManager.registerBuiltInExtensions();
    this.repeater = repeater
    this.repeaterState = new AcRepeaterState({repeaterApi:this});
    this.eventHandler = new AcRepeaterEventHandler({repeaterApi:this});
  }

  addRow({ data, append = true, highlightRow = false }: { data?: any, append?: boolean, highlightRow?: boolean } = {}) {
    // const repeaterRow: AcRepeaterRow = new AcRepeaterRow({
    //   data: data,
    //   repeaterApi:this,
    //   index: this.dataSource.repeaterRows.length
    // });
    // this.dataSource.repeaterRows.push(repeaterRow);
    // const hookArgs: IAcRepeaterRowHookArgs = {
    //   repeaterApi: this,
    //   repeaterRow: repeaterRow,
    // };
    // this.hooks.execute({ hook: AcEnumRepeaterHook.RepeaterRowCreate, args: hookArgs });
    // const addHookArgs: IAcRepeaterRowAddHookArgs = {
    //   repeaterApi: this,
    //   repeaterRow: repeaterRow,
    //   append: append,
    //   highlightRow: highlightRow
    // }
    // this.hooks.execute({ hook: AcEnumRepeaterHook.RowAdd, args: addHookArgs });
    // const eventArgs: IAcRepeaterRowEvent = {
    //   repeaterApi: this,
    //   repeaterRow: repeaterRow
    // };
    // this.events.execute({ event: AcEnumRepeaterEvent.RowAdd, args: eventArgs });
    // this.dataSource.totalRows++;
  }

  deleteRow({ data, rowId, key, value, highlightRow = false }: { data?: any, rowId?: string, key?: string, value?: any, highlightRow?: boolean }) {
    // const repeaterRow: AcRepeaterRow | undefined = this.repeaterRows.find((repeaterRow) => {
    //   let valid: boolean = false;
    //   if (rowId) {
    //     valid = repeaterRow.rowId == rowId;
    //   }
    //   else if (key && value) {
    //     valid = repeaterRow.data[key] == value;
    //   }
    //   else if (data && key) {
    //     valid = repeaterRow.data[key] == data[key];
    //   }
    //   else if (data) {
    //     valid = repeaterRow.data == data;
    //   }
    //   return valid;
    // });
    // if (repeaterRow) {
    //   arrayRemoveByKey(this.dataSource.repeaterRows,'rowId',repeaterRow.rowId);
    //   const deleteHookArgs: IAcRepeaterRowDeleteHookArgs = {
    //     repeaterApi: this,
    //     repeaterRow: repeaterRow,
    //     highlightRow: highlightRow
    //   }
    //   this.hooks.execute({ hook: AcEnumRepeaterHook.RowDelete, args: deleteHookArgs });
    //   const eventArgs: IAcRepeaterRowEvent = {
    //     repeaterApi: this,
    //     repeaterRow: repeaterRow
    //   };
    //   this.events.execute({ event: AcEnumRepeaterEvent.RowDelete, args: eventArgs });
    //   this.dataSource.totalRows--;
    // }
  }

  enableExtension({ extensionName }: { extensionName: string }): AcRepeaterExtension | null {
    if (AcRepeaterExtensionManager.hasExtension({ extensionName: extensionName })) {
      const extensionInstance = AcRepeaterExtensionManager.createInstance({ extensionName: extensionName });
      if (extensionInstance) {
        extensionInstance.repeaterApi = this;
        const hookId: string = this.hooks.subscribeAllHooks({
          callback: (hook: string, args: any) => {
            extensionInstance.handleHook({ hook: hook, args: args });
          }
        });
        extensionInstance.hookId = hookId;
        extensionInstance.init();
        this.extensions[extensionName] = extensionInstance;
        const hookArgs: IAcRepeaterExtensionEnabledHookArgs = {
          extensionName: extensionName,
          repeaterApi: this,
        };
        this.hooks.execute({ hook: AcEnumRepeaterHook.ExtensionEnable, args: hookArgs });
        return extensionInstance;
      }
    }
    return null;
  }

  focusFirstRow({ highlightRow }: { highlightRow?: boolean } = {}) {
    this.focusRow({ index: 0, highlightRow: highlightRow });
  }

  focusLastRow({ highlightRow }: { highlightRow?: boolean } = {}) {
    this.focusRow({ index: this.dataManager.totalRows - 1, highlightRow: highlightRow });
  }

  focusRow({ index, highlightRow = false }: { index: number, highlightRow?: boolean }) {
    const hookArgs: IAcRepeaterRowFocusHookArgs = {
      repeaterApi: this,
      repeaterRow: this.repeaterRows[index],
      index: index,
      highlightRow: highlightRow
    }
    this.hooks.execute({ hook: AcEnumRepeaterHook.RowFocus, args: hookArgs });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event: event, callback: callback });
  }

  getRowById({ rowId }: { rowId: string }): AcRepeaterRow | undefined {
    let result: AcRepeaterRow | undefined;
    for (const row of this.repeaterRows) {
      if (row.rowId == rowId) {
        result = row;
        break;
      }
    }
    return result;
  }

  getRowByIndex({ index }: { index: number }): AcRepeaterRow | undefined {
    let result: AcRepeaterRow | undefined;
    for (const row of this.repeaterRows) {
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

  getRowByKeyValue({ key, value }: { key: string, value: any }): AcRepeaterRow | undefined {
    let result: AcRepeaterRow | undefined;
    for (const row of this.repeaterRows) {
      if (row.data && row.data[key] == value) {
        result = row;
        break;
      }
    }
    return result;
  }

  getState():IAcRepeaterState{
    this.repeaterState.refresh();
    return this.repeaterState.toJson();
  }

  setState({state}:{state:IAcRepeaterState}){
    this.repeaterState.apply(state);
  }


  updateRowPosition({ repeaterRow, oldRepeaterRow }: { repeaterRow: AcRepeaterRow, oldRepeaterRow: AcRepeaterRow }) {
    const eventArgs: IAcRepeaterRowPositionChangeEvent = {
      // oldRepeaterRow: oldRepeaterRow,
      repeaterRow: repeaterRow,
      repeaterApi: this
    };
    this.events.execute({ event: AcEnumRepeaterEvent.RowPositionChange, args: eventArgs });
  }

  // PENDING
  updateRow({ data, value, key, rowId, highlightRow = true, addIfMissing = false }: { data: any, value?: any, key?: string, rowId?: string, highlightRow?: boolean, addIfMissing?: boolean }) {
    const repeaterRow: AcRepeaterRow | undefined = this.repeaterRows.find((repeaterRow) => {
      let valid: boolean = false;
      if (rowId) {
        valid = repeaterRow.rowId == rowId;
      }
      else if (key && value) {
        valid = repeaterRow.data[key] == value;
      }
      else if (data && key) {
        valid = repeaterRow.data[key] == data[key];
      }
      else if (data) {
        valid = repeaterRow.data == data;
      }
      return valid;
    });
    if (repeaterRow) {
      repeaterRow.data = data;
      const updateHookArgs: IAcRepeaterRowUpdateHookArgs = {
        repeaterApi: this,
        repeaterRow: repeaterRow,
        highlightRow: highlightRow
      }
      this.hooks.execute({ hook: AcEnumRepeaterHook.RowUpdate, args: updateHookArgs });
      const eventArgs:IAcRepeaterRowEvent = {
      repeaterApi:this,
      repeaterRow:repeaterRow
    };
    this.events.execute({event:AcEnumRepeaterEvent.RowUpdate,args:eventArgs});
    }
    else {
      this.addRow({ data: data, highlightRow: highlightRow });
    }
  }

}
