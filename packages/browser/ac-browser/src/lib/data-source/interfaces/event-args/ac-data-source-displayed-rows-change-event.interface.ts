import { AcDataSource, AcDataSourceRow } from "../../_data-source.export";

export interface IAcDataSourceDisplayedRowsChangeEvent{
  displayedRows:AcDataSourceRow[],
  dataSource:AcDataSource,
}
