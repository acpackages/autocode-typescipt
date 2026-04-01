import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterRow } from "../ac-repeater-row.interface";

export interface IIAcRepeaterRowAddHookArgs{
  repeaterApi:AcRepeaterApi,
  repeaterRow:IAcRepeaterRow,
  append:boolean,
  highlightRow:boolean
}
