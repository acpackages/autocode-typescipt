import { AcDataSource } from "../../core/ac-data-source";
import { IAcOnDemandRequestArgs } from "../ac-on-demand-request-args.interface";

export interface IAcDataSourceBeforeGetOnDemandDataHookArgs{
  dataSource:AcDataSource,
  requestArgs:IAcOnDemandRequestArgs,
}
