import { AcRepeaterApi } from "../../core/ac-repeater-api";

export interface IAcRepeaterUsePaginationChangeHookArgs{
  repeaterApi:AcRepeaterApi,
  oldUsePagination:boolean,
  usePagination:boolean
}
