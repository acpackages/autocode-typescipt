import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { AcRepeaterRow } from "../../models/ac-repeater-row.model";


export interface IAcRepeaterDisplayedRowsChangeEvent{
  displayedRows:AcRepeaterRow[],
  repeaterApi:AcRepeaterApi
}
