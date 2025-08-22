import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { AcRepeaterRow } from "../../models/ac-repeater-row.model";

export interface IAcRepeaterRowEvent{
  repeaterApi:AcRepeaterApi,
  repeaterRow:AcRepeaterRow,
  event?:any
}
