import { AcDataSource, AcDataSourceRow } from "../../_data-source.export";

export interface IAcDataSourceRowEvent{
  dataSource:AcDataSource,
  dataSourceRow:AcDataSourceRow,
  event?:any
}
