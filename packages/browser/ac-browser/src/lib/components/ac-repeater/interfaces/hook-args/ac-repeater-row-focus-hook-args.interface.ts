import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterRow } from "../ac-repeater-row.interface";

export interface IIAcRepeaterRowFocusHookArgs{
  repeaterApi:AcRepeaterApi,
  repeaterRow:IAcRepeaterRow,
  highlightRow:boolean;
  index:number
}
