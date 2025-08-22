/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcRepeaterRowElement } from "../elements/ac-repeater-row.element";
import { AcRepeaterApi } from "../core/ac-repeater-api";

export class AcRepeaterRow {
  acRowId: string = Autocode.uuid();
  data: any;
  repeaterApi!: AcRepeaterApi;
  events: AcEvents = new AcEvents();
  extensionData: Record<string, any> = {};
  hooks: AcHooks = new AcHooks();
  index: number = -1;
  displayIndex:number = -1;
  instance?: AcRepeaterRowElement;

  get isFirst(): boolean {
    return this.displayIndex == 0;
  }

  get isLast(): boolean {
    return this.displayIndex == this.repeaterApi.displayedRepeaterRows.length - 1;
  }

  constructor({ data = {},repeaterApi, index = -1 }: { data?: any,repeaterApi:AcRepeaterApi, index?: number }) {
    this.data = data;
    this.repeaterApi = repeaterApi;
    this.index = index;
  }

  on({eventName,callback}:{eventName:string,callback:Function}):string{
    return this.events.subscribe({eventName,callback});
  }
}
