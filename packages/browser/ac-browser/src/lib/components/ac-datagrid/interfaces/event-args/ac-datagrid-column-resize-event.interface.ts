import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";

export interface IAcDatagridColumnResizeEvent{
  oldWidth:number,
  width:number,
  datagridColumn:IAcDatagridColumn,
  datagridApi:AcDatagridApi
}
