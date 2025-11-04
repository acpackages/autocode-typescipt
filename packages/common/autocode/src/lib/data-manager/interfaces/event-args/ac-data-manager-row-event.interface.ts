import { AcDataManager } from "../../core/ac-data-manager";
import { AcDataRow } from "../../models/ac-data-row.model";

export interface IAcDataManagerRowEvent<T extends AcDataRow = AcDataRow>{
  dataManager:AcDataManager,
  dataRow:T,
  event?:any
}
