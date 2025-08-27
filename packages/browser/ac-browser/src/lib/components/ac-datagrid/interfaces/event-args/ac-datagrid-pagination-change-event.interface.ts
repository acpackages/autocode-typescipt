import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcPagination } from "../../../ac-pagination/_ac-pagination.export";

export interface IAcDatagridPaginationChangeEvent{
  datagridApi:AcDatagridApi,
  pagination:AcPagination,
  event?:any
}
