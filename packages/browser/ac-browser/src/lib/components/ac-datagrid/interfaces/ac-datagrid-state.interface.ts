import { IAcDatagridColumnState } from "./ac-datagrid-column-state.interface";

export interface IAcDatagridState{
  columns?:IAcDatagridColumnState[],
  extension_states?: Record<string,any>,
  pagination?:any,
  sort_order?:any
}
