import { AcDataManager } from "../../core/ac-data-manager";
import { IAcDataRow } from "../ac-data-row.interface";

export interface IAcDataManagerRowHookArgs<T extends IAcDataRow = IAcDataRow>{
  dataManager:AcDataManager,
  dataRow:T,
  event?:any
}
