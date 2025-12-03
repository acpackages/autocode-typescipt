import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../interfaces/ac-datagrid-row.interface";

export interface IAcDatagridRowPositionChangeEvent{
  oldDatagridRow:IAcDatagridRow,
  datagridRow:IAcDatagridRow,
  datagridApi:AcDatagridApi,
}
