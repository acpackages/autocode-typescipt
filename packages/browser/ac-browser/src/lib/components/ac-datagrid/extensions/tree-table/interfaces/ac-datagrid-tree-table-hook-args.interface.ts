import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridTreeTableExtension } from "../core/ac-datagrid-tree-table-extension";

export interface IAcDatagridTreeTableHookArgs{
  datagridApi:AcDatagridApi,
  datagridTreeTableExtension:AcDatagridTreeTableExtension,
  value:any
}
