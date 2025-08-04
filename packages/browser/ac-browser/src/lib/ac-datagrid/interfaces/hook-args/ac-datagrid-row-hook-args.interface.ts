import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridRowHookArgs{
  datagridApi:AcDatagridApi,
  datagridRow:AcDatagridRow,
}
