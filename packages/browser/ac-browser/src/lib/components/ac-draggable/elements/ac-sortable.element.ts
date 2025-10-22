import { Autocode } from "@autocode-ts/autocode";
import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement, acSwapElementsWithAnimation } from "../../../utils/ac-element-functions";
import { AC_DRAGGABLE_TAG } from "../_ac-draggable.export";
import { AcDraggableAttributeName } from "../consts/ac-draggable-attribute-name.const";
import { AcDraggableApi } from "../core/ac-draggable-api";
import { AcEnumDraggableEvent } from "../enums/ac-enum-draggable-event.enum";
import { IAcDragGroup } from "../interfaces/ac-drag-group.interface";
import { IAcDraggableDragDropEvent } from "../interfaces/ac-draggable-drag-drop-event.interface";
import { AcDraggableSortElement } from "./ac-draggable-sort-element.element";
import { AcDraggable } from "./ac-draggable.element";

export class AcSortable extends AcElementBase {
  draggableApi: AcDraggableApi = new AcDraggableApi({ instance: this });
  groups: Map<string, IAcDragGroup> = new Map();
  override id: string = Autocode.uuid();
  private mutationObserver!: MutationObserver;
  originalUserSelect: any;

  override connectedCallback() {
    super.connectedCallback();
    this.observeDOM();
    this.initElement();
  }

  private observeDOM(): void {
    this.mutationObserver = new MutationObserver(() => {
      this.initElement();
    });
    this.mutationObserver.observe(this, { childList: true, subtree: true });
  }

  private initElement(): void {
    const draggables = this.querySelectorAll(`[${AcDraggableAttributeName.acDraggableElement}]`);
    const targets = this.querySelectorAll(`[${AcDraggableAttributeName.acDraggableTarget}]`);
    draggables.forEach((el) => {
      this.draggableApi.registerDraggableElement({ element: el as HTMLElement });
    });
    targets.forEach((el) => {
      this.draggableApi.registerTargetElement({ element: el as HTMLElement });
    });
  //   if (!this.element.hasAttribute(AcDraggableAttributeName.acDraggableSort)){
  // //     this.element.setAttribute(AcDraggableAttributeName.acDraggableSort,"");
  // //   }
    const draggableSorts = this.querySelectorAll(`[${AcDraggableAttributeName.acDraggableSortElement}]`);
    draggableSorts.forEach((el) => {
      new AcDraggableSortElement({ draggableApi: this.draggableApi, element: el as HTMLElement });
    });
    this.draggableApi.on({event: AcEnumDraggableEvent.DragDrop, callback: (args: IAcDraggableDragDropEvent) => {
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

  public addDragGroup(name: string, accept: string[] = []): void {
    this.groups.set(name, { name, accept });
  }

  public removeDragGroup(name: string): void {
    this.groups.delete(name);
  }

  public destroy(): void {
    this.mutationObserver.disconnect();
  }

  // element: HTMLElement;
  // draggable: AcDraggable;
  // draggableApi: AcDraggableApi;

  // constructor({ element }: { element: HTMLElement }) {
  //   this.element = element;
  //   this.draggable = new AcDraggable({ element: this.element });
  //   this.draggableApi = this.draggable.draggableApi;
  //   this.initElement();
  // }

  // initElement(): void {
  //   if (!this.element.hasAttribute(AcDraggableAttributeName.acDraggableSort)){
  //     this.element.setAttribute(AcDraggableAttributeName.acDraggableSort,"");
  //   }
  //   const draggables = this.element.querySelectorAll(`[${AcDraggableAttributeName.acDraggableSortElement}]`);
  //   draggables.forEach((el) => {
  //     new AcDraggableSortElement({ draggableApi: this.draggableApi, element: el as HTMLElement });
  //   });
  //   this.draggableApi.on({event: AcEnumDraggableEvent.DragDrop, callback: (args: IAcDraggableDragDropEvent) => {
  //       if (!args.elementInstance || !args.targetInstance) return;
  //       setTimeout(() => {
  //         acSwapElementsWithAnimation({
  //           element1: args.elementInstance.element,
  //           element2: args.targetInstance.element,
  //           duration: 0
  //         });
  //       }, 100);
  //     }
  //   })
  // }

}

acRegisterCustomElement({ tag: AC_DRAGGABLE_TAG.sortable, type: AcSortable });
