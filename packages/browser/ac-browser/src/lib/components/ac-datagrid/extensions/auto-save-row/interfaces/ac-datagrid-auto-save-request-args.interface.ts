import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../../interfaces/ac-datagrid-row.interface";
import { IAcDatagridAutoSaveResponseArgs } from "./ac-datagrid-auto-save-response-args.interface";

export interface IAcDatagridAutoSaveRequestArgs {
  datagridRow:IAcDatagridRow;
  datagridApi:AcDatagridApi;
  successCallback:(args:IAcDatagridAutoSaveResponseArgs)=>void;
  errorCallback?:Function;
}
