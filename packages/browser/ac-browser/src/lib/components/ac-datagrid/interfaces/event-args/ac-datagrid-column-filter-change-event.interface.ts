import { IAcFilterGroup } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";

export interface IAcDatagridColumnFilterChangeEvent{
  oldFilterGroup?:IAcFilterGroup,
  filterGroup?:IAcFilterGroup,
  datagridColumn:IAcDatagridColumn,
  datagridApi:AcDatagridApi
}
