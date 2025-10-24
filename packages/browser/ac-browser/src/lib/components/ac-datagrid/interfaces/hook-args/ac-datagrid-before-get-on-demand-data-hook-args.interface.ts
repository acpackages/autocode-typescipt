
import { IAcOnDemandRequestArgs } from "../../../../data-source/interfaces/ac-on-demand-request-args.interface";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridBeforeGetOnDemandDataHookArgs{
  datagridApi:AcDatagridApi,
  requestArgs:IAcOnDemandRequestArgs,
}
