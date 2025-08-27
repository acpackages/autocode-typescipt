import { IAcDatagridState, IAcResizablePanelSize } from "@autocode-ts/ac-browser";

export interface IAcDDETableEditorState{
  tablesDatagrid?:IAcDatagridState,
  tableColumnsDatagrid?:IAcDatagridState,
  tableRelationshipsDatagrid?:IAcDatagridState,
  tableTriggersDatagrid?:IAcDatagridState,
  detailPanels?:IAcResizablePanelSize[],
  editorPanels?:IAcResizablePanelSize[],
}
