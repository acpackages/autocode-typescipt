import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagriDataChangeHookArgs{
  data:any[],
  datagridApi:AcDatagridApi,
  oldData:any[]
}
