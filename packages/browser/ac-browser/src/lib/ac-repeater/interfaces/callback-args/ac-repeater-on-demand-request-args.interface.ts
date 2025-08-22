import { AcFilterGroup, AcSortOrder } from "@autocode-ts/autocode";

export interface IAcRepeaterOnDemandRequestArgs{
  startIndex:number;
  rowsCount:number;
  filterGroup:AcFilterGroup;
  sortOrder:AcSortOrder;
  successCallback:Function
}
