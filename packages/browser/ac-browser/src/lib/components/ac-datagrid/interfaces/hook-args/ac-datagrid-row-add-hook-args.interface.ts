import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../interfaces/ac-datagrid-row.interface";

export interface IAcDatagridRowAddHookArgs{
  datagridApi:AcDatagridApi,
  datagridRow:IAcDatagridRow,
  append:boolean,
  highlightCells:boolean
}
