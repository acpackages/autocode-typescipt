import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../ac-datagrid-row.interface";

export interface IAcDatagridRowFocusHookArgs{
  datagridApi:AcDatagridApi,
  datagridRow:IAcDatagridRow,
  highlightCells:boolean;
  index:number
}
