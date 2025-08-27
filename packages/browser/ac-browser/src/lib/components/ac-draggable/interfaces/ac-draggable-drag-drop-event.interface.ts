
import { AcDraggableApi } from "../core/ac-draggable-api";
import { AcDraggableElement } from "../elements/ac-draggable-element.element";
import { AcDraggableTarget } from "../elements/ac-draggable-target.element";

export interface IAcDraggableDragDropEvent{
  elementInstance:AcDraggableElement
  targetInstance:AcDraggableTarget,
  draggableApi:AcDraggableApi,
  event:MouseEvent|TouchEvent
};
