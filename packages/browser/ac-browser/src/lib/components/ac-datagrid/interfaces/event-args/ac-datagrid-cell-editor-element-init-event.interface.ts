import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridCell } from "../../interfaces/ac-datagrid-cell.interface";

export interface IAcDatagridCellEditorElementInitEvent{
  datagridCell:IAcDatagridCell,
  datagridApi:AcDatagridApi,
  cellEditorElementInstance:any
}
