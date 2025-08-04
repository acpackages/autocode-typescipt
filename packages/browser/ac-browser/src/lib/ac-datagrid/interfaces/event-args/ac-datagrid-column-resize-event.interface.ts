import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnResizeEvent{
  oldWidth:number,
  width:number,
  datagridColumn:AcDatagridColumn,
  datagridApi:AcDatagridApi
}
