import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridRowAddHookArgs{
  datagridApi:AcDatagridApi,
  datagridRow:AcDatagridRow,
  append:boolean,
  highlightCells:boolean
}
