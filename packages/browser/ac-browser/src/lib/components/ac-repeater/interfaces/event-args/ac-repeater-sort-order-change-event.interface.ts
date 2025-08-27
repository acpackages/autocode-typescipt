import { AcSortOrder } from "@autocode-ts/autocode";
import { AcRepeaterApi } from "../../core/ac-repeater-api";

export interface IAcRepeaterSortOrderChangeEvent{
  repeaterApi:AcRepeaterApi,
  sortOrder:AcSortOrder,
  event?:any
}
