import { AcDataManager } from "../../core/ac-data-manager";

export interface IAcDataManagerDataEvent{
  dataManager:AcDataManager,
  data:any[],
  event?:any
}
