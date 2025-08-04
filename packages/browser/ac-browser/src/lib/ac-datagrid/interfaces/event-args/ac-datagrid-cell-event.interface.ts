import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridCell } from "../../models/ac-datagrid-cell.model";

export interface IAcDatagridCellEvent{
  datagridCell:AcDatagridCell,
  datagridApi:AcDatagridApi,
  event?:any
}
