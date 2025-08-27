import { IAcDatagridOnDemandRequestArgs, IAcDatagridOnDemandResponseArgs } from "../../_ac-datagrid.export";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridGetOnDemandDataSuccessCallbackHookArgs{
  datagridApi:AcDatagridApi,
  requestArgs:IAcDatagridOnDemandRequestArgs,
  responseArgs:IAcDatagridOnDemandResponseArgs
}
