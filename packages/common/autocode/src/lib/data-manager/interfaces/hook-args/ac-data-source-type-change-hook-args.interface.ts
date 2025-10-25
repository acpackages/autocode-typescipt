import { AcDataManager } from "../../core/ac-data-manager";

export interface IAcDataManagerDataSourceTypeChangeHookArgs{
  dataSourceType:any,
  dataManager:AcDataManager,
  oldDataSourceType:any
}
