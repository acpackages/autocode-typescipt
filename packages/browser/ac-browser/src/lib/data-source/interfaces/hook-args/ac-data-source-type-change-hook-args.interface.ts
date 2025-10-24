import { AcEnumDataSourceType } from "../../../enums/ac-enum-data-source-type.enum";
import { AcDataSource } from "../../_data-source.export";

export interface IAcDataSourceDataSourceTypeChangeHookArgs{
  dataSourceType:AcEnumDataSourceType,
  dataSource:AcDataSource,
  oldDataSourceType:AcEnumDataSourceType
}
