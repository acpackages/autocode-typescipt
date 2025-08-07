/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { AcResizableAttributeName } from "../consts/ac-resizable-attribute-name.const";
import { AcEnumResizePanelDirection } from "../enums/ac-enum-resize-panel-direction.enum";

export class AcResizablePanels {
  private element: HTMLElement;
  private direction: AcEnumResizePanelDirection;
  private panels: HTMLElement[] = [];
  private resizeObserver!: ResizeObserver;
  private updateTimeout: any;
  private updateAllowed: boolean = false;
  events:AcEvents = new AcEvents();

  get isHorizontal(): boolean {
    return this.direction == AcEnumResizePanelDirection.Horizontal;
  }

  constructor({ element, direction = AcEnumResizePanelDirection.Vertical }: { element: HTMLElement, direction?: AcEnumResizePanelDirection }) {
    this.element = element;
    this.direction = direction;
    this.panels = Array.from(this.element.querySelectorAll(`[${AcResizableAttributeName.acResizablePanel}]`)) as HTMLElement[];
    this.setupLayout();
    this.setupHandles();
    this.observePanelSizes();
  }

  destroy() {
    this.resizeObserver.disconnect();
  }

  private observePanelSizes() {
    this.resizeObserver = new ResizeObserver(() => {
      this.updatePanelSizes();
    });
    this.panels.forEach((panel) => {
      this.resizeObserver.observe(panel);
    });
    setTimeout(() => {
      this.updateAllowed = true;
    }, 500);
  }

  on({eventName,callback}:{eventName:string,callback:Function}):string{
    return this.events.subscribe({eventName:eventName,callback:callback});
  }

  setPanelSize({ index, size }: { index: number, size: number }) {
    if (this.isHorizontal) {
      this.panels[index].style.minWidth = `${size}%`;
      this.panels[index].style.maxWidth = `${size}%`;
      setTimeout(() => {

        this.updateAllowed = false;
        this.panels[index].style.minWidth = ``;
        this.panels[index].style.maxWidth = ``;
        setTimeout(() => {
          this.updateAllowed = true;
        }, 100);
      }, 500);
    }
    else {
      this.panels[index].style.minHeight = `${size}%`;
      this.panels[index].style.maxHeight = `${size}%`;
      setTimeout(() => {
        this.updateAllowed = false;
        this.panels[index].style.minHeight = ``;
        this.panels[index].style.maxHeight = ``;
        setTimeout(() => {
          this.updateAllowed = true;
        }, 100);
      }, 500);
    }

  }

  private setupHandles() {
    for (let i = 0; i < this.panels.length - 1; i++) {
      const handle = document.createElement('div');
      handle.classList.add(AcResizableAttributeName.acResizeHandle);
      handle.style.cursor = this.isHorizontal ? 'col-resize' : 'row-resize';
      handle.style.background = '#ccc';
      handle.style.zIndex = '10';
      handle.style.position = 'relative';
      handle.style[this.isHorizontal ? 'width' : 'height'] = '5px';
      handle.style[this.isHorizontal ? 'height' : 'width'] = '100%';

      this.panels[i].insertAdjacentElement('afterend', handle);

      let startPos = 0;
      let startSizes: number[] = [];

      const onMouseDown = (e: MouseEvent) => {
        this.updateAllowed = false;
        startPos = this.isHorizontal ? e.clientX : e.clientY;
        startSizes = [this.panels[i].getBoundingClientRect()[this.isHorizontal ? 'width' : 'height'],
        this.panels[i + 1].getBoundingClientRect()[this.isHorizontal ? 'width' : 'height']];
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
      };

      const onMouseMove = (e: MouseEvent) => {
        const delta = (this.isHorizontal ? e.clientX : e.clientY) - startPos;
        const total = startSizes[0] + startSizes[1];
        const firstCurrentPercent = parseFloat(this.panels[i].getAttribute('ac-resizable-size') || '0');
        const secondCurrentPercent = parseFloat(this.panels[i+1].getAttribute('ac-resizable-size') || '0');
        const currentPanelsTotal = firstCurrentPercent + secondCurrentPercent;
        let firstNewSize = ((startSizes[0] + delta) / total) * currentPanelsTotal;
        let secondNewSize = ((startSizes[1] - delta) / total) * currentPanelsTotal;
        firstNewSize = Math.max(5, Math.min(95, firstNewSize));
        secondNewSize = currentPanelsTotal - firstNewSize;
        this.panels[i].style.flexBasis = `${firstNewSize}%`;
        this.panels[i + 1].style.flexBasis = `${secondNewSize}%`;
        this.panels[i].setAttribute('ac-resizable-size',`${firstNewSize}`);
        this.panels[i + 1].setAttribute('ac-resizable-size',`${secondNewSize}`);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        this.updateAllowed = true;
      };

      handle.addEventListener('mousedown', onMouseDown);
    }
  }

  private setupLayout() {
    this.element.style.display = 'flex';
    this.element.style.flexDirection = this.isHorizontal ? 'row' : 'column';
    this.panels.forEach((panel) => {
      panel.style.flexGrow = '1';
      panel.style.flexShrink = '1';
      panel.style.flexBasis = `${100 / this.panels.length}%`;
      panel.style.overflow = 'auto';
      panel.style.display = 'flex';
      panel.setAttribute('ac-resizable-size',`${100 / this.panels.length}`);
    });
  }

  private updatePanelSizes() {
    if (this.updateAllowed) {
      const isHorizontal = this.direction === 'horizontal';
      const totalSize = this.panels.reduce((acc, panel) => {
        const rect = panel.getBoundingClientRect();
        return acc + (isHorizontal ? rect.width : rect.height);
      }, 0);

      this.panels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const size = isHorizontal ? rect.width : rect.height;
        const percent = (size / totalSize) * 100;
        panel.style.flexBasis = `${percent}%`;
        panel.setAttribute('ac-resizable-size',`${percent}`);
      });
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      this.updateTimeout = setTimeout(() => {
        this.updateTimeout = undefined;
        console.log("Panels updated");
      }, 300);
    }

  }

}
