import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";
import { IAcDatagridColDef } from "../ac-datagrid-col-def.interface";

export interface IAcDatagridColDefsSetEvent{
  colDefs:IAcDatagridColDef[],
  datagridColumns:AcDatagridColumn[],
  datagridApi:AcDatagridApi
}
