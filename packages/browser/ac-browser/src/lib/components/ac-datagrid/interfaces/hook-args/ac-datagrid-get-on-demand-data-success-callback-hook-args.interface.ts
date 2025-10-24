import { IAcOnDemandRequestArgs, IAcOnDemandResponseArgs } from "../../../../interfaces/_interfaces.export";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridGetOnDemandDataSuccessCallbackHookArgs{
  datagridApi:AcDatagridApi,
  requestArgs:IAcOnDemandRequestArgs,
  responseArgs:IAcOnDemandResponseArgs
}
