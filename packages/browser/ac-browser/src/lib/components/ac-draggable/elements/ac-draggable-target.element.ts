import { Autocode } from "@autocode-ts/autocode";
import { AcDraggableApi } from "../core/ac-draggable-api";
import { AcDraggableAttributeName } from "../_ac-draggable.export";

export class AcDraggableTarget {
  get acceptedTags(): string[] {
    const result: string[] = [];
    if (this.element.hasAttribute(AcDraggableAttributeName.acDraggableTargetAcceptedTags)) {
      const tags = this.element.getAttribute(AcDraggableAttributeName.acDraggableTargetAcceptedTags);
      if (tags) {
        for (const tag of tags.split(",")) {
          if (tag.trim()) {
            result.push(tag.trim());
          }
        }
      }
    }
    return result;
  }

  get hasAcceptedTags(): boolean {
    return this.element.hasAttribute(AcDraggableAttributeName.acDraggableTargetAcceptedTags);
  }

  draggableApi!: AcDraggableApi;
  element!: HTMLElement;
  originalUserSelect: any;
  private _managedListeners: Array<{ target: EventTarget, type: string, handler: any, options?: any }> = [];
  id: string = Autocode.uuid();

  constructor({ draggableApi, element }: { draggableApi: AcDraggableApi, element: HTMLElement }) {
    this.draggableApi = draggableApi;
    this.element = element;
    this.initElement();
  }

  protected addEventListenerManaged(target: EventTarget, type: string, handler: any, options?: any): void {
    target.addEventListener(type, handler, options);
    this._managedListeners.push({ target, type, handler, options });
  }

  initElement(): void {
    if (this.element.hasAttribute(AcDraggableAttributeName.acDraggableTargetId)) return;
    this.element.setAttribute(AcDraggableAttributeName.acDraggableTargetId, this.id);

    this.draggableApi.targetInstances[this.id] = this;

    if (!this.element.hasAttribute(AcDraggableAttributeName.acDraggableTarget)){
      this.element.setAttribute(AcDraggableAttributeName.acDraggableTarget,"");
    }

    const onMouseEnter = (event: MouseEvent | TouchEvent): void => {
      if (this.draggableApi.draggingElement && this.draggableApi.draggingElement.element != this.element) {
        this.draggableApi.handleDragEnter({targetInstance:this,event:event});
      }

    };

    const onMouseLeave = (event: MouseEvent | TouchEvent): void => {
      if (this.draggableApi.draggingElement && this.draggableApi.draggingElement.element != this.element) {
        this.draggableApi.handleDragLeave({targetInstance:this,event:event});
      }
    };

    const onMouseMove = (event: MouseEvent | TouchEvent): void => {
      if (this.draggableApi.draggingElement && this.draggableApi.draggingElement.element != this.element) {
        this.draggableApi.handleDragOver({targetInstance:this,event:event});
      }
    };

    // Mouse events
    this.addEventListenerManaged(this.element, "mouseenter", onMouseEnter);
    this.addEventListenerManaged(this.element, "mouseleave", onMouseLeave);
    this.addEventListenerManaged(this.element, "mousemove", onMouseMove);

    // Touch events
    this.addEventListenerManaged(this.element, "touchstart", onMouseEnter, { passive: true });
    this.addEventListenerManaged(this.element, "touchend", onMouseLeave, { passive: true });
    this.addEventListenerManaged(this.element, "touchcancel", onMouseLeave, { passive: true });
    this.addEventListenerManaged(this.element, "touchmove", onMouseMove, { passive: true });
  }

  destroy() {
    this._managedListeners.forEach(({ target, type, handler, options }) => {
      target.removeEventListener(type, handler, options);
    });
    this._managedListeners = [];
    acNullifyInstanceProperties({ instance: this });
  }
}
