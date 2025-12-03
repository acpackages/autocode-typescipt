import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridCell } from "../../interfaces/ac-datagrid-cell.interface";

export interface IAcDatagridCellEvent{
  datagridCell:IAcDatagridCell,
  datagridApi:AcDatagridApi,
  event?:any
}
