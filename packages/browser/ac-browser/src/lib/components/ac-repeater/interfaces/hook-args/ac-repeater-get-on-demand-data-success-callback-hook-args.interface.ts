import { IAcOnDemandResponseArgs } from "@autocode-ts/autocode";
import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterOnDemandRequestArgs } from "../callback-args/ac-repeater-on-demand-request-args.interface";

export interface IAcRepeaterGetOnDemandDataSuccessCallbackHookArgs{
  repeaterApi:AcRepeaterApi,
  requestArgs:IAcRepeaterOnDemandRequestArgs,
  responseArgs:IAcOnDemandResponseArgs
}
