import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridActiveRowChangeEvent{
  oldActiveDatagridRow:AcDatagridRow|undefined,
  activeDatagridRow:AcDatagridRow,
  datagridApi:AcDatagridApi,
  event:any
}
