import { AcResizablePanels } from "../elements/ac-resizable-panels.element";
import { IAcResizablePanel } from "./ac-resizable-panel.interface";

export interface IAcResizablePanelResizeEvent{
  resizableInstance:AcResizablePanels,
  panels:IAcResizablePanel[]
}
