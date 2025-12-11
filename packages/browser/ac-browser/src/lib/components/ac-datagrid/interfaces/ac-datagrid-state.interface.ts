import { IAcDatagridColumnState } from "./ac-datagrid-column-state.interface";

export interface IAcDatagridState{
  columns?:IAcDatagridColumnState[],
  extensionStates?: Record<string,any>,
  pagination?:any,
  sortOrder?:any
}
