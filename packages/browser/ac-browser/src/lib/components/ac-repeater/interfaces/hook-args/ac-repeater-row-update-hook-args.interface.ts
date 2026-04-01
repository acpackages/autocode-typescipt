import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterRow } from "../../models/ac-repeater-row.model";

export interface IIAcRepeaterRowUpdateHookArgs{
  repeaterApi:AcRepeaterApi,
  repeaterRow:IAcRepeaterRow,
  highlightRow:boolean
}
