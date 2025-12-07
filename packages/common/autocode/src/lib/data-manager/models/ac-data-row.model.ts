/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Autocode } from "../../core/autocode";
import { AC_DATA_MANAGER_EVENT } from "../_data-manager.export";
import { AcDataManager } from "../core/ac-data-manager";

export class AcDataRow {
  rowId: string = Autocode.uuid();

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

  extensionData: Record<string, any> = {};
  isPlaceholder: boolean = false;

  get isFirst(): boolean {
    return this.displayIndex == 0;
  }

  get isLast(): boolean {
    return false;
    // return this.displayIndex == this.dataManager.displayedRows.length - 1;
  }

  constructor({ data = {}, index = -1, isPlaceholder = false }: { data?: any, dataManager: AcDataManager, index?: number, isPlaceholder?: boolean }) {
    this.isPlaceholder = isPlaceholder;
    this.index = index;
    this.data = data;
  }

}
