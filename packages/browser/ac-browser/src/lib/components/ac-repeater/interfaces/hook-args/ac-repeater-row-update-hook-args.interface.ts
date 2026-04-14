import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterRow } from "../ac-repeater-row.interface";

export interface IIAcRepeaterRowUpdateHookArgs{
  repeaterApi:AcRepeaterApi,
  repeaterRow:IAcRepeaterRow,
  highlightRow:boolean
}
