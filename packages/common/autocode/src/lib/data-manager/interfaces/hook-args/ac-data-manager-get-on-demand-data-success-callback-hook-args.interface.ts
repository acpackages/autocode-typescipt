import { AcDataManager } from "../../core/ac-data-manager";
import { IAcOnDemandRequestArgs } from "../ac-on-demand-request-args.interface";
import { IAcOnDemandResponseArgs } from "../ac-on-demand-response-args.interface";

export interface IAcDataManagerGetOnDemandDataSuccessCallbackHookArgs{
  dataManager:AcDataManager,
  requestArgs:IAcOnDemandRequestArgs,
  responseArgs:IAcOnDemandResponseArgs
}
