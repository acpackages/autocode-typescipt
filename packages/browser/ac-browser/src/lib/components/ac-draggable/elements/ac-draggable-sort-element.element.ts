/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Autocode } from "@autocode-ts/autocode";
import { AcDraggableApi } from "../core/ac-draggable-api";
import { AcDraggableTarget } from "./ac-draggable-target.element";
import { AcDraggableAttributeName } from "../consts/ac-draggable-attribute-name.const";
import { AcDraggableElement } from "./ac-draggable-element.element";

export class AcDraggableSortElement {
  draggableApi!: AcDraggableApi;
  element!: HTMLElement;
  id: string = Autocode.uuid();
  originalUserSelect: any;
  elementInstance: AcDraggableElement;
  targetInstance: AcDraggableTarget;
  wrapper!: HTMLDivElement;
  beforeArea!: HTMLDivElement;
  afterArea!: HTMLDivElement;

  constructor({ draggableApi, element }: { draggableApi: AcDraggableApi, element: HTMLElement }) {
    this.draggableApi = draggableApi;
    this.element = element;
    this.elementInstance = new AcDraggableElement({ draggableApi: draggableApi, element: element });
    this.targetInstance = new AcDraggableTarget({ draggableApi: draggableApi, element: element });
    if (!this.element.hasAttribute(AcDraggableAttributeName.acDraggableSortElement)) {
      this.element.setAttribute(AcDraggableAttributeName.acDraggableSortElement, "");
    }
    this.wrapElementWithDropZones();
    this.attachListeners();
  }

  wrapElementWithDropZones(): void {
    const parent = this.element.parentElement!;
    this.wrapper = document.createElement('div');
    this.wrapper.style.position = 'relative';
    this.wrapper.style.display = 'block';
    this.wrapper.classList.add('ac-sort-element-wrapper');
    this.beforeArea = document.createElement('div');
    this.beforeArea.classList.add('ac-drop-before');
    Object.assign(this.beforeArea.style, {
      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      height: '2px',
      background: 'transparent',
      zIndex: '10',
      pointerEvents: 'none',
      transition: 'background 0.2s',
    });
    this.afterArea = document.createElement('div');
    this.afterArea.classList.add('ac-drop-after');
    Object.assign(this.afterArea.style, {
      position: 'absolute',
      bottom: '0',
      left: '0',
      right: '0',
      height: '2px',
      background: 'transparent',
      zIndex: '10',
      pointerEvents: 'none',
      transition: 'background 0.2s',
    });
    parent.replaceChild(this.wrapper, this.element);
    this.wrapper.appendChild(this.beforeArea);
    this.wrapper.appendChild(this.element);
    this.wrapper.appendChild(this.afterArea);
  }

  attachListeners(): void {
    const clearHighlight = () => {
      this.beforeArea.style.background = 'transparent';
      this.afterArea.style.background = 'transparent';
    };
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (this.draggableApi.draggingElement) {
        const clientY = (e instanceof MouseEvent) ? e.clientY : e.touches[0].clientY;
        const rect = this.wrapper.getBoundingClientRect();
        const offsetY = clientY - rect.top;
        if (offsetY <= 6) {
          this.beforeArea.style.background = 'red';
          this.afterArea.style.background = 'transparent';
        } else if (offsetY >= (rect.height - 6)) {
          this.beforeArea.style.background = 'transparent';
          this.afterArea.style.background = 'red';
        }
        else {
          clearHighlight();
        }
      }
    };

    this.wrapper.addEventListener('mousemove', onMove);
    this.wrapper.addEventListener('touchmove', onMove, { passive: true });
    this.wrapper.addEventListener('mouseleave', clearHighlight);
    this.wrapper.addEventListener('mouseup', clearHighlight);
    this.wrapper.addEventListener('touchend', clearHighlight);
  }

}
