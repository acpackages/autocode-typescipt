import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridRowDeleteHookArgs{
  datagridApi:AcDatagridApi,
  datagridRow:AcDatagridRow,
  highlightCells:boolean
}
