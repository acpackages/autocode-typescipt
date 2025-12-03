
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";

export interface IAcDatagridColumnDragPlaceholderCreatorArgs{
  datagridColumn:IAcDatagridColumn,
  datagridApi:AcDatagridApi
}
