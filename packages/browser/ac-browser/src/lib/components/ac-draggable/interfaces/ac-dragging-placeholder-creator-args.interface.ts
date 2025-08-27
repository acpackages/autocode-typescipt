import { AcDraggableElement } from "../_ac-draggable.export";
import { AcDraggableApi } from "../core/ac-draggable-api";

export interface IAcDraggableDraggingPreviewCreatorArgs {
  draggableApi:AcDraggableApi,
  elementInstance:AcDraggableElement,
  event:MouseEvent|TouchEvent
}
