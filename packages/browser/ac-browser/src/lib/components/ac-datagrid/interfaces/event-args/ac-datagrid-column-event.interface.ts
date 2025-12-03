import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";

export interface IAcDatagridColumnEvent{
  datagridApi:AcDatagridApi,
  datagridColumn:IAcDatagridColumn,
  event?:any
}
