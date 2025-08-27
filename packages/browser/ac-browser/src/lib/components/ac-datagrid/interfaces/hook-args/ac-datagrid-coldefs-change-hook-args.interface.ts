import { IAcDatagridColumnDefinition } from "../../_ac-datagrid.export";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridColDefsChangeHookArgs{
  columnDefinitions:IAcDatagridColumnDefinition[],
  datagridApi:AcDatagridApi,
  oldColumnDefinitions:IAcDatagridColumnDefinition[]
}
