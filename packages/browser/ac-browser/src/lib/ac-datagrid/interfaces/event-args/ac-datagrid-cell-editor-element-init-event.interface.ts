import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridCell } from "../../models/ac-datagrid-cell.model";

export interface IAcDatagridCellEditorElementInitEvent{
  datagridCell:AcDatagridCell,
  datagridApi:AcDatagridApi,
  cellEditorElementInstance:any
}
