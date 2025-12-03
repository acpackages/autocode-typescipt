import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../ac-datagrid-row.interface";

export interface IAcDatagridRowHookArgs{
  datagridApi:AcDatagridApi,
  datagridRow:IAcDatagridRow,
  event?:any
}
