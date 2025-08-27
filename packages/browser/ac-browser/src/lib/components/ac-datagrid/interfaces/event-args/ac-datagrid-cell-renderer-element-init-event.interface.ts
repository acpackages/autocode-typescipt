import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridCell } from "../../models/ac-datagrid-cell.model";

export interface IAcDatagridCellRendererElementInitEvent{
  datagridCell:AcDatagridCell,
  datagridApi:AcDatagridApi,
  cellRendererElementInstance:any
}
