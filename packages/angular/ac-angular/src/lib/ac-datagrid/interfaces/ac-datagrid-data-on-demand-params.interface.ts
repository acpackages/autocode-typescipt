import { IAcDataGridFilterGroup } from "./ac-datagrid-filter-group.interface";
import { IAcDataGridSort } from "./ac-datagrid-sort.interface";

export interface IAcDataGridDataOnDemandParams{
  pageNumber?:number,
  pageSize?:number,
  filterGroup?:IAcDataGridFilterGroup,
  sortOrder?:IAcDataGridSort[],
  successCallback?:Function,
  errorCallback?:Function
}
