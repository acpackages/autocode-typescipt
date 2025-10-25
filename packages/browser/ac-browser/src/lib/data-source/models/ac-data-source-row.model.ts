/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcDataSource } from "../core/ac-data-source";

export class AcDataSourceRow {
  acRowId: string = Autocode.uuid();
  data: any;
  dataSource!: AcDataSource;
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
    return this.displayIndex == this.dataSource.displayedRows.length - 1;
  }

  constructor({ data = {},dataSource, index = -1 }: { data?: any,dataSource:AcDataSource, index?: number }) {
    this.data = data;
    this.dataSource = dataSource;
    if(dataSource.autoSetUniqueIdToData){
      if(data['__ac_row_id__']){
        this.acRowId = data['__ac_row_id__'];
      }
      else{
        data['__ac_row_id__'] = this.acRowId;
      }
    }
    this.index = index;
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback,subscriptionId });
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }
}
