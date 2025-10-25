import { AcFilterGroup } from "../../models/ac-filter-group.model";
import { AcSortOrder } from "../../models/ac-sort-order.model";


export interface IAcOnDemandRequestArgs{
  startIndex:number;
  rowsCount:number;
  filterGroup:AcFilterGroup;
  sortOrder:AcSortOrder;
  successCallback:Function
  errorCallback:Function
}
