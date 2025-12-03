import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridCell } from "../../interfaces/ac-datagrid-cell.interface";

export interface IAcDatagridCellRendererElementInitEvent{
  datagridCell:IAcDatagridCell,
  datagridApi:AcDatagridApi,
  cellRendererElementInstance:any
}
