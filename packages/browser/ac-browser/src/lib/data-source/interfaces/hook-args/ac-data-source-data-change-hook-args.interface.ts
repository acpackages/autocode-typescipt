import { AcDataSource } from "../../core/ac-data-source";

export interface IAcDataSourceDataChangeHookArgs{
  data:any[],
  dataSource:AcDataSource,
  oldData:any[]
}
