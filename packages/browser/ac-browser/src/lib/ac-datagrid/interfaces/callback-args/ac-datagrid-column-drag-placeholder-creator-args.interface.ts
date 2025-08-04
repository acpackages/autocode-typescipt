
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnDragPlaceholderCreatorArgs{
  datagridColumn:AcDatagridColumn,
  datagridApi:AcDatagridApi
}
