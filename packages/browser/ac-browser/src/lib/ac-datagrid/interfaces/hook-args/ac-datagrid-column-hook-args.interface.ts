import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnHookArgs{
  datagridApi:AcDatagridApi,
  datagridColumn:AcDatagridColumn,
}
