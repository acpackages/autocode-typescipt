import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridStateChangeEvent{
  datagridApi:AcDatagridApi,
  datagridState:any,
  event?:any
}
