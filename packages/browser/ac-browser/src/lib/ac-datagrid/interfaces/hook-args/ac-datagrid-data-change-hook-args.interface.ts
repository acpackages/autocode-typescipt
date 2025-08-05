import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridDataChangeHookArgs{
  data:any[],
  datagridApi:AcDatagridApi,
  oldData:any[]
}
