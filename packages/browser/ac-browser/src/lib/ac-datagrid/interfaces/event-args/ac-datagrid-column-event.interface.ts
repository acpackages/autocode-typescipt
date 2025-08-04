import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnEvent{
  datagridApi:AcDatagridApi,
  datagridColumn:AcDatagridColumn,
  event?:any
}
