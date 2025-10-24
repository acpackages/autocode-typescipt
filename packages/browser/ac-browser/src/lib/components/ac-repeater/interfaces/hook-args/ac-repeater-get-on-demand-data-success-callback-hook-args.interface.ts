import { IAcOnDemandResponseArgs } from "../../../ac-datagrid/interfaces/callback-args/ac-datagrid-on-demand-response-args.interface";
import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterOnDemandRequestArgs } from "../callback-args/ac-repeater-on-demand-request-args.interface";

export interface IAcRepeaterGetOnDemandDataSuccessCallbackHookArgs{
  repeaterApi:AcRepeaterApi,
  requestArgs:IAcRepeaterOnDemandRequestArgs,
  responseArgs:IAcOnDemandResponseArgs
}
