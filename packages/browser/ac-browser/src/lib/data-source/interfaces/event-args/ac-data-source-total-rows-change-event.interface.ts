import { AcDataSource } from "../../core/ac-data-source";

export interface IAcDataSourceTotalRowsChangeEvent{
  totalRows:number,
  dataSource:AcDataSource,
}
