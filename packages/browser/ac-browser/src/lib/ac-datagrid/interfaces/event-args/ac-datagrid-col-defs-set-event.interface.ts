import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";
import { IAcDatagridColumnDefinition } from "../ac-datagrid-column-definition.interface";

export interface IAcDatagridColDefsSetEvent{
  columnDefinitions:IAcDatagridColumnDefinition[],
  datagridColumns:AcDatagridColumn[],
  datagridApi:AcDatagridApi
}
