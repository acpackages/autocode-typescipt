import { AcEnumSortDirection } from "../../../enums/ac-enum-sort-direction.enum";
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnSortChangeEvent{
  oldSortDirection:AcEnumSortDirection,
  sortDirection:AcEnumSortDirection,
  datagridColumn:AcDatagridColumn,
  datagridApi:AcDatagridApi
}
