import { AcEnumSortOrder } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";

export interface IAcDatagridColumnSortChangeEvent{
  oldSortOrder:AcEnumSortOrder,
  sortOrder:AcEnumSortOrder,
  datagridColumn:IAcDatagridColumn,
  datagridApi:AcDatagridApi
}
