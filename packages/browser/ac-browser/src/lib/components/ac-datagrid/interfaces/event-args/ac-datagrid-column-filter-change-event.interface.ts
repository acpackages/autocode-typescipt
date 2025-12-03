import { AcFilterGroup } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { IAcDatagridColumn } from "../../interfaces/ac-datagrid-column.interface";

export interface IAcDatagridColumnFilterChangeEvent{
  oldFilterGroup:AcFilterGroup,
  filterGroup:AcFilterGroup,
  datagridColumn:IAcDatagridColumn,
  datagridApi:AcDatagridApi
}
