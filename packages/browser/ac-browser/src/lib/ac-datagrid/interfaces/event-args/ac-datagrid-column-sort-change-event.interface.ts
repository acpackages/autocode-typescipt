import { AcEnumSortOrder } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnSortChangeEvent{
  oldSortOrder:AcEnumSortOrder,
  sortOrder:AcEnumSortOrder,
  datagridColumn:AcDatagridColumn,
  datagridApi:AcDatagridApi
}
