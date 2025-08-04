import { AcFilterGroup } from "@autocode-ts/autocode";
import { AcDatagridApi } from "../../core/ac-datagrid-api";
import { AcDatagridColumn } from "../../models/ac-datagrid-column.model";

export interface IAcDatagridColumnFilterChangeEvent{
  oldFilterGroup:AcFilterGroup,
  filterGroup:AcFilterGroup,
  datagridColumn:AcDatagridColumn,
  datagridApi:AcDatagridApi
}
