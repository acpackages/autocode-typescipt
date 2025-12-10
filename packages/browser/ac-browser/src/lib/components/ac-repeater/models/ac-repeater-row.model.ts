/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, AcHooks, Autocode } from "@autocode-ts/autocode";
import { AcRepeaterRowElement } from "../elements/ac-repeater-row.element";
import { AcRepeaterApi } from "../core/ac-repeater-api";

export class AcRepeaterRow {
  repeaterApi!: AcRepeaterApi;
  instance?: AcRepeaterRowElement;
  index:number = 0;
  data:any = {};
  rowId:string = '';
}
