import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridUsePaginationChangeHookArgs{
  datagridApi:AcDatagridApi,
  oldUsePagination:boolean,
  usePagination:boolean
}
