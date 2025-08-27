import { AcRepeaterApi } from "../../core/ac-repeater-api";

export interface IAcRepeaterStateChangeEvent{
  repeaterApi:AcRepeaterApi,
  datagridState:any,
  event?:any
}
