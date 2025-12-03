import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../interfaces/ac-datagrid-row.interface";

export interface IAcDatagridActiveRowChangeEvent{
  oldActiveDatagridRow:IAcDatagridRow|undefined,
  activeDatagridRow:IAcDatagridRow,
  datagridApi:AcDatagridApi,
  event:any
}
