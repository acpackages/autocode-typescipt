import { AcPagination } from "../../../ac-pagination/_ac-pagination.export";
import { AcRepeaterApi } from "../../core/ac-repeater-api";

export interface IAcRepeaterPaginationChangeEvent{
  repeaterApi:AcRepeaterApi,
  pagination:AcPagination,
  event?:any
}
