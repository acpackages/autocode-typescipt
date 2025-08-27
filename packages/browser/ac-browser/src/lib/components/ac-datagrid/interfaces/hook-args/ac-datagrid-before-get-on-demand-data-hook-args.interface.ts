import { IAcDatagridOnDemandRequestArgs } from "../../_ac-datagrid.export";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridBeforeGetOnDemandDataHookArgs{
  datagridApi:AcDatagridApi,
  requestArgs:IAcDatagridOnDemandRequestArgs,
}
