import { AcDataSource, AcDataSourceRow } from "../../_data-source.export";

export interface IAcDataSourceRowHookArgs{
  dataSource:AcDataSource,
  dataSourceRow:AcDataSourceRow,
  event?:any
}
