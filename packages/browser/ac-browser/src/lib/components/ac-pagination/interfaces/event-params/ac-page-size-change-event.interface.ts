import { AcPaginationApi } from "../../core/ac-pagination-api";

export interface IAcPaginationPageSizeChangeEvent{
  previousPageSize:number,
  pageSize:number,
  paginationApi:AcPaginationApi
}
