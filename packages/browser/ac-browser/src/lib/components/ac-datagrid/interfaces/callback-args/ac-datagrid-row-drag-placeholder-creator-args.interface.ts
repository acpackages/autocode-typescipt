import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../interfaces/ac-datagrid-row.interface";

export interface IAcDatagridRowDragPlaceholderCreatorArgs{
  datagridRow:IAcDatagridRow,
  datagridApi:AcDatagridApi
}
