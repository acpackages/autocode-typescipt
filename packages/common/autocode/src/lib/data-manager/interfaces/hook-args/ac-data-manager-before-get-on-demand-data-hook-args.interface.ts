import { AcDataManager } from "../../core/ac-data-manager";
import { IAcOnDemandRequestArgs } from "../ac-on-demand-request-args.interface";

export interface IAcDataManagerBeforeGetOnDemandDataHookArgs{
  dataManager:AcDataManager,
  requestArgs:IAcOnDemandRequestArgs,
}
