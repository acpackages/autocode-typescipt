
import { IAcOnDemandRequestArgs } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridBeforeGetOnDemandDataHookArgs{
  datagridApi:AcDatagridApi,
  requestArgs:IAcOnDemandRequestArgs,
}
