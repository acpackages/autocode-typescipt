import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridRowFocusHookArgs{
  datagridApi:AcDatagridApi,
  datagridRow:AcDatagridRow,
  highlightCells:boolean;
  index:number
}
