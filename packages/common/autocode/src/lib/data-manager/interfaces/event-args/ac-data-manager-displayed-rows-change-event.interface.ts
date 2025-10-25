import { AcDataManager } from "../../core/ac-data-manager";
import { AcDataRow } from "../../models/ac-data-row.model";

export interface IAcDataManagerDisplayedRowsChangeEvent{
  displayedRows:AcDataRow[],
  dataManager:AcDataManager,
}
