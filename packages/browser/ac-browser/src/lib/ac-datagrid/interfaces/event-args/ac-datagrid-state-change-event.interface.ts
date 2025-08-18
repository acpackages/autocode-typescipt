import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridStateChangeEvent{
  datagridApi:AcDatagridApi,
  datagridStateJson:any,
  event?:any
}
