import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../interfaces/ac-datagrid-row.interface";

export interface IAcDatagridRowEvent{
  datagridApi:AcDatagridApi,
  datagridRow:IAcDatagridRow,
  event?:any
}
