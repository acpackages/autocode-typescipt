import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridCell } from "../../interfaces/ac-datagrid-cell.interface";

export interface IAcDatagridCellHookArgs{
  datagridApi:AcDatagridApi,
  datagridCell:IAcDatagridCell,
  event?:any
}
