import { AcResizablePanel } from "../elements/ac-resizable-panel.element";
import { AcResizablePanels } from "../elements/ac-resizable-panels.element";
import { IAcResizablePanelSize } from "./ac-resizable-panel-size.interface";

export interface IAcResizablePanelResizeEvent{
  resizableInstance:AcResizablePanels,
  panels:AcResizablePanel[],
  panelSizes:IAcResizablePanelSize[]
}
