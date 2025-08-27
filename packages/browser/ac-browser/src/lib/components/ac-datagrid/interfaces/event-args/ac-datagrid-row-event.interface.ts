import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridRowEvent{
  datagridApi:AcDatagridApi,
  datagridRow:AcDatagridRow,
  event?:any
}
