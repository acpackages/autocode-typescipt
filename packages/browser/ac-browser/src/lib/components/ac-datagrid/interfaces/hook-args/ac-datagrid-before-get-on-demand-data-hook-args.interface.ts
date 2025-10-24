import { IAcOnDemandRequestArgs } from "../../../../interfaces/_interfaces.export";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridBeforeGetOnDemandDataHookArgs{
  datagridApi:AcDatagridApi,
  requestArgs:IAcOnDemandRequestArgs,
}
