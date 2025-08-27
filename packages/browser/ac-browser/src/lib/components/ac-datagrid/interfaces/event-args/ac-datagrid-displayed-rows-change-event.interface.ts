import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../models/ac-datagrid-row.model";

export interface IAcDatagridDisplayedRowsChangeEvent{
  displayedRows:AcDatagridRow[],
  datagridApi:AcDatagridApi
}
