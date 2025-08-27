import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";
import { AcDatagridTree } from "../elements/ac-datagrid-tree.element";

export interface IAcDatagridTreeCloseEvent{
  datagridRow:AcDatagridRow,
  datagridTree:AcDatagridTree,
  datagridApi:AcDatagridApi
}
