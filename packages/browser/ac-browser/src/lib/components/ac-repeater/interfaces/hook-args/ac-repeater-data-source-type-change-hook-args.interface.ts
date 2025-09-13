import { AcEnumDataSourceType } from "../../../../enums/ac-enum-data-source-type.enum";
import { AcRepeaterApi } from "../../core/ac-repeater-api";

export interface IAcRepeaterDataSourceTypeChangeHookArgs{
  dataSourceType:AcEnumDataSourceType,
  repeaterApi:AcRepeaterApi,
  oldDataSourceType:AcEnumDataSourceType
}
