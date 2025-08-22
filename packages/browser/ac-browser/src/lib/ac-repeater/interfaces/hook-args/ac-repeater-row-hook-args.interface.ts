import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { AcRepeaterRow } from "../../models/ac-repeater-row.model";

export interface IAcRepeaterRowHookArgs{
  repeaterApi:AcRepeaterApi,
  repeaterRow:AcRepeaterRow,
  event?:any
}
