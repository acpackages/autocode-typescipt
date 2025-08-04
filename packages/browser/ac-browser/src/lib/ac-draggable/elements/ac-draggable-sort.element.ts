import { acSwapElementsWithAnimation } from "../../utils/ac-element-functions";
import { AcDraggableAttributeName } from "../consts/ac-draggable-attribute-name.const";
import { AcDraggableApi } from "../core/ac-draggable-api";
import { AcEnumDraggableEvent } from "../enums/ac-enum-draggable-event.enum";
import { IAcDraggableDragDropEvent } from "../interfaces/ac-draggable-drag-drop-event.interface";
import { AcDraggableSortElement } from "./ac-draggable-sort-element.element";
import { AcDraggable } from "./ac-draggable.element";

export class AcDraggableSort {
  element: HTMLElement;
  draggable: AcDraggable;
  draggableApi: AcDraggableApi;

  constructor({ element }: { element: HTMLElement }) {
    this.element = element;
    this.draggable = new AcDraggable({ element: this.element });
    this.draggableApi = this.draggable.draggableApi;
    this.initElement();
  }

  initElement(): void {
    if (!this.element.hasAttribute(AcDraggableAttributeName.acDraggableSort)){
      this.element.setAttribute(AcDraggableAttributeName.acDraggableSort,"");
    }
    const draggables = this.element.querySelectorAll(`[${AcDraggableAttributeName.acDraggableSortElement}]`);
    draggables.forEach((el) => {
      new AcDraggableSortElement({ draggableApi: this.draggableApi, element: el as HTMLElement });
    });
    this.draggableApi.on({eventName: AcEnumDraggableEvent.DragDrop, callback: (args: IAcDraggableDragDropEvent) => {
        if (!args.elementInstance || !args.targetInstance) return;
        setTimeout(() => {
          acSwapElementsWithAnimation({
            element1: args.elementInstance.element,
            element2: args.targetInstance.element,
            duration: 0
          });
        }, 100);
      }
    })
  }




}
