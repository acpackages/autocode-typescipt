import { IAcDatagridState, IAcResizablePanelSize } from "@autocode-ts/ac-browser";

export interface IAcDDEViewEditorState{
  viewsDatagrid?:IAcDatagridState,
  viewColumnsDatagrid?:IAcDatagridState,
  detailPanels?:IAcResizablePanelSize[],
  editorPanels?:IAcResizablePanelSize[],
}
