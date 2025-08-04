import { IAcDatagridColDef } from "../../_ac-datagrid.export";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridColDefsChangeHookArgs{
  colDefs:IAcDatagridColDef[],
  datagridApi:AcDatagridApi,
  oldColDefs:IAcDatagridColDef[]
}
