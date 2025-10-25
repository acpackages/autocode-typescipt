import { AcDataManager } from "../../core/ac-data-manager";
import { AcDataRow } from "../../models/ac-data-row.model";

export interface IAcDataManagerRowHookArgs{
  dataManager:AcDataManager,
  dataSourceRow:AcDataRow,
  event?:any
}
