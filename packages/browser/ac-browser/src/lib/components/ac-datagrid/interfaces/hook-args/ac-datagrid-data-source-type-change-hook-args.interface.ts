
import { AcEnumDataSourceType } from "../../../../enums/ac-enum-data-source-type.enum";
import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridDataSourceTypeChangeHookArgs{
  dataSourceType:AcEnumDataSourceType,
  datagridApi:AcDatagridApi,
  oldDataSourceType:AcEnumDataSourceType
}
