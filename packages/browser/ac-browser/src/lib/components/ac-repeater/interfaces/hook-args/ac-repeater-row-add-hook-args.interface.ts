import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { AcRepeaterRow } from "../../models/ac-repeater-row.model";

export interface IAcRepeaterRowAddHookArgs{
  repeaterApi:AcRepeaterApi,
  repeaterRow:AcRepeaterRow,
  append:boolean,
  highlightRow:boolean
}
