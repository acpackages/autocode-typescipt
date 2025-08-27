import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridRowPositionChangeEvent{
  oldDatagridRow:AcDatagridRow,
  datagridRow:AcDatagridRow,
  datagridApi:AcDatagridApi,
}
