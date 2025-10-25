import { AcDataManager } from "../../core/ac-data-manager";

export interface IAcDataManagerDataChangeHookArgs{
  data:any[],
  dataManager:AcDataManager,
  oldData:any[]
}
