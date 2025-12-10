import { GridOptions } from "ag-grid-community";

export const AC_DATAGRID_AGGRID_DEFAULT_OPTIONS: GridOptions = {
  alwaysMultiSort: true,
  pagination: true,
  suppressContextMenu: true,
  animateRows:true,
  rowNumbers:{
    width:40,
  }
  // suppressColumnVirtualisation:false,
  // cellFadeDuration:0,
  // suppressAnimationFrame:false
};
