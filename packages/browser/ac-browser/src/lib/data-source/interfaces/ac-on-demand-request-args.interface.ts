import { AcFilterGroup, AcSortOrder } from "@autocode-ts/autocode";

export interface IAcOnDemandRequestArgs{
  startIndex:number;
  rowsCount:number;
  filterGroup:AcFilterGroup;
  sortOrder:AcSortOrder;
  successCallback:Function
}
