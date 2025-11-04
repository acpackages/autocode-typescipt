import { AcDataManager } from "../../core/ac-data-manager";
import { AcDataRow } from "../../models/ac-data-row.model";

export interface IAcDataManagerDisplayedRowsChangeEvent<T extends AcDataRow = AcDataRow>{
  displayedRows:T[],
  dataManager:AcDataManager,
}
