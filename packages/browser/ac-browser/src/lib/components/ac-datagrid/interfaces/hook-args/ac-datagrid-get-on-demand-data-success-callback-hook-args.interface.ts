import { IAcOnDemandRequestArgs,IAcOnDemandResponseArgs } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridGetOnDemandDataSuccessCallbackHookArgs{
  datagridApi:AcDatagridApi,
  requestArgs:IAcOnDemandRequestArgs,
  responseArgs:IAcOnDemandResponseArgs
}
