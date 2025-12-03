import { AcDataManager } from "../../core/ac-data-manager";
import { IAcDataRow } from "../ac-data-row.interface";

export interface IAcDataManagerDisplayedRowsChangeEvent<T extends IAcDataRow = IAcDataRow>{
  displayedRows:T[],
  dataManager:AcDataManager,
}
