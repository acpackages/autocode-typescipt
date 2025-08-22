import { AcRepeaterApi } from "../../core/ac-repeater-api";
import { IAcRepeaterOnDemandRequestArgs } from "../callback-args/ac-repeater-on-demand-request-args.interface";

export interface IAcRepeaterBeforeGetOnDemandDataHookArgs{
  repeaterApi:AcRepeaterApi,
  requestArgs:IAcRepeaterOnDemandRequestArgs,
}
