import { AcFilterGroup } from "../../models/ac-filter-group.model";
import { AcSortOrder } from "../../models/ac-sort-order.model";


export interface IAcOnDemandRequestArgs{
  errorCallback?:Function
  filterGroup?:AcFilterGroup;
  searchQuery?:string;
  allRows?:boolean;
  pageNumber?:number;
  rowsCount?:number;
  sortOrder?:AcSortOrder;
  startIndex?:number;
  successCallback:Function;
}
