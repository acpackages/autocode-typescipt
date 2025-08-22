import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { AcRepeaterRow } from "../../models/ac-repeater-row.model";

export interface IAcRepeaterRowDeleteHookArgs{
  repeaterApi:AcRepeaterApi,
  repeaterRow:AcRepeaterRow,
  highlightRow:boolean
}
