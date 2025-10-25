import { AcDataManager } from "../../core/ac-data-manager";
import { AcDataRow } from "../../models/ac-data-row.model";

export interface IAcDataManagerRowEvent{
  dataManager:AcDataManager,
  dataSourceRow:AcDataRow,
  event?:any
}
