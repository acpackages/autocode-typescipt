import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridCell } from "../../models/ac-datagrid-cell.model";

export interface IAcDatagridCellHookArgs{
  datagridApi:AcDatagridApi,
  datagridCell:AcDatagridCell,
  event?:any
}
