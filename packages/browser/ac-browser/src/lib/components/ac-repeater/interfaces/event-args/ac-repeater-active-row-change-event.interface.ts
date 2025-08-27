import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { AcRepeaterRow } from "../../models/ac-repeater-row.model";

export interface IAcRepeaterActiveRowChangeEvent{
  oldActiveRepeaterRow:AcRepeaterRow|undefined,
  activeRepeaterRow:AcRepeaterRow,
  repeaterApi:AcRepeaterApi,
  event:any
}
