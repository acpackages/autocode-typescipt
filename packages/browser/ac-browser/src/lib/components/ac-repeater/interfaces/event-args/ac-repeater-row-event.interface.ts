import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterRow } from "../ac-repeater-row.interface";

export interface IIAcRepeaterRowEvent{
  repeaterApi:AcRepeaterApi,
  repeaterRow:IAcRepeaterRow,
  event?:any
}
