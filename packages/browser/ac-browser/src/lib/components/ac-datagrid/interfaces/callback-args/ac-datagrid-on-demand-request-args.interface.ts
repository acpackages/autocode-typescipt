import { AcFilterGroup, AcSortOrder } from "@autocode-ts/autocode";

export interface IAcDatagridOnDemandRequestArgs{
  startIndex:number;
  rowsCount:number;
  filterGroup:AcFilterGroup;
  sortOrder:AcSortOrder;
  successCallback:Function
}
