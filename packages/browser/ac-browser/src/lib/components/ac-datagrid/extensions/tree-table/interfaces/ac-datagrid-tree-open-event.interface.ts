import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../../interfaces/ac-datagrid-row.interface";
import { AcDatagridTree } from "../elements/ac-datagrid-tree.element";


export interface IAcDatagridTreeOpenEvent{
  datagridRow:IAcDatagridRow,
  datagridTree:AcDatagridTree,
  datagridApi:AcDatagridApi
}
