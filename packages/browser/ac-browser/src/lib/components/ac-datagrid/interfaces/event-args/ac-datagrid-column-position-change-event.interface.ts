import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";

export interface IAcDatagridColumnPositionChangeEvent{
  oldDatagridColumn:IAcDatagridColumn,
  datagridColumn:IAcDatagridColumn,
  datagridApi:AcDatagridApi,
}
