import { AcRepeaterApi } from "../../core/ac-repeater-api";

export interface IAcRepeaterDataChangeHookArgs{
  data:any[],
  repeaterApi:AcRepeaterApi,
  oldData:any[]
}
