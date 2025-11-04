/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AcEvents } from "../../core/ac-events";
import { AcHooks } from "../../core/ac-hooks";
import { Autocode } from "../../core/autocode";
import { AcEnumDataManagerEvent } from "../_data-manager.export";
import { AcDataManager } from "../core/ac-data-manager";

export class AcDataRow {
  acRowId: string = Autocode.uuid();

  private _data: any;
  get data():any{
    return this._data;
  }
  set data(value:any){
    this._data = value;
    if(this.dataManager.autoSetUniqueIdToData){
      if(value['__ac_row_id__']){
        this.acRowId = value['__ac_row_id__'];
      }
      else{
        value['__ac_row_id__'] = this.acRowId;
      }
    }
  }

  dataManager!: AcDataManager;
  events: AcEvents = new AcEvents();
  extensionData: Record<string, any> = {};
  hooks: AcHooks = new AcHooks();
  index: number = -1;
  isPlaceholder:boolean = false;
  displayIndex:number = -1;

  get isFirst(): boolean {
    return this.displayIndex == 0;
  }

  get isLast(): boolean {
    return this.displayIndex == this.dataManager.displayedRows.length - 1;
  }

  constructor({ data = {},dataManager, index = -1,isPlaceholder = false }: { data?: any,dataManager:AcDataManager, index?: number,isPlaceholder?:boolean }) {
    this.isPlaceholder = isPlaceholder;
    this.dataManager = dataManager;
    this.index = index;
    this.data = data;
    this.dataManager.events.execute({event:AcEnumDataManagerEvent.DataRowInstanceCreate,args:{dataRow:this}});
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback,subscriptionId });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }
}
