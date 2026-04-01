import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterRow } from "../ac-repeater-row.interface";

export interface IAcRepeaterActiveRowChangeEvent{
  oldActiveRepeaterRow:IAcRepeaterRow|undefined,
  activeRepeaterRow:IAcRepeaterRow,
  repeaterApi:AcRepeaterApi,
  event:any
}
