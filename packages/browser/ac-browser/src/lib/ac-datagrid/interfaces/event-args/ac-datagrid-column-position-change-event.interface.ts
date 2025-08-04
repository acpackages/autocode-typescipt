import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnPositionChangeEvent{
  oldDatagridColumn:AcDatagridColumn,
  datagridColumn:AcDatagridColumn,
  datagridApi:AcDatagridApi,
}
