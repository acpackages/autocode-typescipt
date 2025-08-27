import { AcSortOrder } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridSortOrderChangeEvent{
  datagridApi:AcDatagridApi,
  sortOrder:AcSortOrder,
  event?:any
}
