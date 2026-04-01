import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterRow } from "../ac-repeater-row.interface";


export interface IAcRepeaterDisplayedRowsChangeEvent{
  displayedRows:IAcRepeaterRow[],
  repeaterApi:AcRepeaterApi
}
