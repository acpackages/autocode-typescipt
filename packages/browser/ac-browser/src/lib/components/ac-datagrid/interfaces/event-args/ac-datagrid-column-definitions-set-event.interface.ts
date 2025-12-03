import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";
import { IAcDatagridColumnDefinition } from "../ac-datagrid-column-definition.interface";

export interface IAcDatagridColumnDefinitionsSetEvent{
  columnDefinitions:IAcDatagridColumnDefinition[],
  datagridColumns:IAcDatagridColumn[],
  datagridApi:AcDatagridApi
}
