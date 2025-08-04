import { AcPaginationApi } from "../../core/ac-pagination-api";

export interface IAcPaginationPageChangeEvent{
  previousActivePage:number,
  activePage:number,
  totalPages:number,
  startRow:number,
  endRow:number
  paginationApi:AcPaginationApi
}
