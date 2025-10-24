import { AcDataSource } from "../../core/ac-data-source";
import { IAcOnDemandRequestArgs } from "../ac-on-demand-request-args.interface";
import { IAcOnDemandResponseArgs } from "../ac-on-demand-response-args.interface";

export interface IAcDataSourceGetOnDemandDataSuccessCallbackHookArgs{
  dataSource:AcDataSource,
  requestArgs:IAcOnDemandRequestArgs,
  responseArgs:IAcOnDemandResponseArgs
}
