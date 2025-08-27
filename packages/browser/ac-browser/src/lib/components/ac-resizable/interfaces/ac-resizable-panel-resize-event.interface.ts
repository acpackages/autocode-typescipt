import { AcResizablePanels } from "../elements/ac-resizable-panels.element";
import { IAcResizablePanelSize } from "./ac-resizable-panel-size.interface";
import { IAcResizablePanel } from "./ac-resizable-panel.interface";

export interface IAcResizablePanelResizeEvent{
  resizableInstance:AcResizablePanels,
  panels:IAcResizablePanel[],
  panelSizes:IAcResizablePanelSize[]
}
