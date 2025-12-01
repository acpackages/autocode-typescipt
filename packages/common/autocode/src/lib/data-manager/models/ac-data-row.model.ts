/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcEvents } from "../../core/ac-events";
import { AcHooks } from "../../core/ac-hooks";
import { Autocode } from "../../core/autocode";
import { acSingleTimeout } from "../../utils/ac-utility-functions";
import { AcEnumDataManagerEvent } from "../_data-manager.export";
import { AcDataManager } from "../core/ac-data-manager";

export class AcDataRow {
  rowId: string = Autocode.uuid();

  private dataChangeCallback: Function = (args: any) => {
    console.log(args);
    this.notifyRowDataChange();
  };
  private _data: any;
  get data(): any {
    return this._data;
  }
  set data(value: any) {
    if (value != this._data) {
      this._data = value;
    }
  }

  private _displayIndex: number = -1;
  get displayIndex(): number {
    return this._displayIndex;
  }
  set displayIndex(value: number) {
    if (this._displayIndex != value) {
      this._displayIndex = value;
    }
  }

  private _index: number = -1;
  get index(): number {
    return this._index;
  }
  set index(value: number) {
    if (this._index != value) {
      this._index = value;
    }
  }

  dataManager!: AcDataManager;
  events: AcEvents = new AcEvents();
  extensionData: Record<string, any> = {};
  hooks: AcHooks = new AcHooks();
  isPlaceholder: boolean = false;

  get isFirst(): boolean {
    return this.displayIndex == 0;
  }

  get isLast(): boolean {
    return this.displayIndex == this.dataManager.displayedRows.length - 1;
  }

  constructor({ data = {}, dataManager, index = -1, isPlaceholder = false }: { data?: any, dataManager: AcDataManager, index?: number, isPlaceholder?: boolean }) {
    this.isPlaceholder = isPlaceholder;
    this.dataManager = dataManager;
    this.index = index;
    this.data = data;
    this.dataManager.events.execute({ event: AcEnumDataManagerEvent.DataRowInstanceCreate, args: { dataRow: this } });
  }

  notifyRowDataChange() {
    acSingleTimeout({
      callback: () => {
        this.hooks.execute({ hook: AcEnumDataManagerEvent.DataChange });
      }, duration: 10, key: this.rowId
    });
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback, subscriptionId });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }


}
