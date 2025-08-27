/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { AcResizableAttributeName } from "../consts/ac-resizable-attribute-name.const";
import { AcEnumResizePanelDirection } from "../enums/ac-enum-resize-panel-direction.enum";
import { AcEnumResizableEvent } from "../enums/ac-enum-resizable-event.enum";
import { IAcResizablePanel } from "../interfaces/ac-resizable-panel.interface";
import { IAcResizablePanelResizeEvent } from "../interfaces/ac-resizable-panel-resize-event.interface";
import { IAcResizablePanelSize } from "../interfaces/ac-resizable-panel-size.interface";

export class AcResizablePanels {
  private element: HTMLElement;
  private direction: AcEnumResizePanelDirection;
  private panels: IAcResizablePanel[] = [];
  private resizeObserver!: ResizeObserver;
  private updateTimeout: any;
  private updateAllowed: boolean = false;
  events: AcEvents = new AcEvents();

  get isHorizontal(): boolean {
    return this.direction == AcEnumResizePanelDirection.Horizontal;
  }

  constructor({ element, direction = AcEnumResizePanelDirection.Vertical }: { element: HTMLElement, direction?: AcEnumResizePanelDirection }) {
    this.element = element;
    this.direction = direction;
    if(element.hasAttribute(AcResizableAttributeName.acResizablePanelsDirection)){
        this.direction = element.getAttribute(AcResizableAttributeName.acResizablePanelsDirection) as AcEnumResizePanelDirection;
      }
      else{
        element.setAttribute(AcResizableAttributeName.acResizablePanelsDirection,this.direction);
      }
    for (const panelsContainer of Array.from(this.element.querySelectorAll(`[${AcResizableAttributeName.acResizablePanels}]`)) as HTMLElement[]) {
      let subPanelsDirection:any = this.direction;
      if(panelsContainer.hasAttribute(AcResizableAttributeName.acResizablePanelsDirection)){
        subPanelsDirection = panelsContainer.getAttribute(AcResizableAttributeName.acResizablePanelsDirection);
      }
      new AcResizablePanels({element:panelsContainer,direction:subPanelsDirection});
    }
    for (const panelElement of Array.from(this.element.querySelectorAll(`[${AcResizableAttributeName.acResizablePanel}]`)) as HTMLElement[]) {
      if(!panelElement.hasAttribute(AcResizableAttributeName.acResizablePanelIndex)){
        const index: number = this.panels.length;
        this.panels.push({ index: index, element: panelElement, size: 0 });
        panelElement.setAttribute(AcResizableAttributeName.acResizablePanelIndex,`${index}`);
      }
    }
    this.setupLayout();
    this.setupHandles();
    this.observePanelSizes();
  }

  destroy() {
    this.resizeObserver.disconnect();
  }

  getPanelSizes() {
    const panelSizes:IAcResizablePanelSize[] = [];
    for(const panel of this.panels){
      panelSizes.push({index:panel.index,size:panel.size});
    }
    return panelSizes;
  }

  private observePanelSizes() {
    this.resizeObserver = new ResizeObserver(() => {
      this.updatePanelSizes();
    });
    this.panels.forEach((panel) => {
      this.resizeObserver.observe(panel.element);
    });
    setTimeout(() => {
      this.updateAllowed = true;
    }, 500);
  }

  on({ event, callback }: { event: string, callback: Function }): string {
    return this.events.subscribe({ event: event, callback: callback });
  }

  setPanelSize({ index, size }: { index: number, size: number }) {
    this.panels[index].size = size;
    // this.updateAllowed = false;
    const panel = this.panels[index];
    panel.element.style.flexGrow = "0";
    panel.element.style.flexShrink = "0";
    panel.element.style.transition = "flex-basis 0.3s ease";
    panel.element.style.flexBasis = `${size}%`;
    this.panels[index].element.setAttribute(AcResizableAttributeName.acResizableSize,`${size}`);
    setTimeout(() => {
      if (this.isHorizontal) {
        this.panels[index].element.style.minWidth = `${size}%`;
        this.panels[index].element.style.maxWidth = `${size}%`;
        setTimeout(() => {
          this.updateAllowed = false;
          this.panels[index].element.style.minWidth = ``;
          this.panels[index].element.style.maxWidth = ``;
          setTimeout(() => {
            this.updateAllowed = true;
          }, 100);
        }, 500);
      }
      else {
        this.panels[index].element.style.minHeight = `${size}%`;
        this.panels[index].element.style.maxHeight = `${size}%`;
        setTimeout(() => {
          this.updateAllowed = false;
          this.panels[index].element.style.minHeight = ``;
          this.panels[index].element.style.maxHeight = ``;
          setTimeout(() => {
            this.updateAllowed = true;
          }, 100);
        }, 100);
      }
    }, 300);
  }

  setPanelSizes({ panelSizes }: { panelSizes: IAcResizablePanelSize[] }) {
    this.updateAllowed = false;
    const newPanelSizes: IAcResizablePanelSize[] = [...panelSizes];
    if (this.panels.length != panelSizes.length) {
      const missingPanelSizes: IAcResizablePanelSize[] = [];
      let currentSizeTotal: number = 0;
      for (const panel of this.panels) {
        const index = panelSizes.findIndex((item) => { return panel.index == item.index });
        if (index == -1) {
          missingPanelSizes.push({ index: panel.index, size: 0 });
        }
        else {
          currentSizeTotal += panelSizes[index].size;
        }
      }
      let adjustSize = ((100 - currentSizeTotal) / missingPanelSizes.length);
      if (adjustSize < 0) {
        adjustSize = 0;
      }
      for (const missingPanel of missingPanelSizes) {
        newPanelSizes.push({ size: adjustSize, index: missingPanel.index });
      }
    }
    for (const { index, size } of newPanelSizes) {
      const panel = this.panels[index];
      panel.element.style.flexGrow = "0";
      panel.element.style.flexShrink = "0";
      panel.element.style.transition = "flex-basis 0.3s ease";
      panel.element.style.flexBasis = `${size}%`;
    }

    setTimeout(() => {
      this.updateAllowed = true;
      for (const panelSize of newPanelSizes) {
        const size = panelSize.size;
        const index = panelSize.index;
        this.panels[index].element.style.transition = "";
        this.panels[index].size = size;
        this.panels[index].element.setAttribute(AcResizableAttributeName.acResizableSize, `${size}`);
      }
    }, 400);
  }

  private setupHandles() {
    for (let i = 0; i < this.panels.length - 1; i++) {
      const handle = document.createElement('div');
      handle.classList.add(AcResizableAttributeName.acResizeHandle);
      handle.style.cursor = this.isHorizontal ? 'col-resize' : 'row-resize';
      handle.style.background = '#ccc';
      handle.style.zIndex = '10';
      handle.style.position = 'relative';
      if (this.isHorizontal) {
        handle.style.width = '2px';
        handle.style.minWidth = '2px';
        handle.style.marginLeft = '-1px';
        handle.style.marginRight = '-1px';
        handle.style.height = '100%';
      }
      else {
        handle.style.height = '2px';
        handle.style.minHeight = '2px';
        handle.style.marginTop = '-1px';
        handle.style.marginBottom = '-1px';
        handle.style.width = '100%';
      }

      this.panels[i].element.insertAdjacentElement('afterend', handle);

      let startPos = 0;
      let startSizes: number[] = [];

      const onMouseDown = (e: MouseEvent) => {
        startPos = this.isHorizontal ? e.clientX : e.clientY;
        startSizes = [this.panels[i].element.getBoundingClientRect()[this.isHorizontal ? 'width' : 'height'],
        this.panels[i + 1].element.getBoundingClientRect()[this.isHorizontal ? 'width' : 'height']];
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        this.element.style.userSelect = 'none';
      };

      const onMouseMove = (e: MouseEvent) => {
        const delta = (this.isHorizontal ? e.clientX : e.clientY) - startPos;
        const total = startSizes[0] + startSizes[1];
        const firstCurrentPercent = parseFloat(this.panels[i].element.getAttribute(AcResizableAttributeName.acResizableSize) || '0');
        const secondCurrentPercent = parseFloat(this.panels[i + 1].element.getAttribute(AcResizableAttributeName.acResizableSize) || '0');
        const currentPanelsTotal = firstCurrentPercent + secondCurrentPercent;
        let firstNewSize = ((startSizes[0] + delta) / total) * currentPanelsTotal;
        let secondNewSize = ((startSizes[1] - delta) / total) * currentPanelsTotal;
        firstNewSize = Math.max(5, Math.min(95, firstNewSize));
        secondNewSize = currentPanelsTotal - firstNewSize;
        this.panels[i].size = firstNewSize;
        this.panels[i + 1].size = secondNewSize;
        this.panels[i].element.style.flexBasis = `${firstNewSize}%`;
        this.panels[i + 1].element.style.flexBasis = `${secondNewSize}%`;
        this.panels[i].element.setAttribute(AcResizableAttributeName.acResizableSize, `${firstNewSize}`);
        this.panels[i + 1].element.setAttribute(AcResizableAttributeName.acResizableSize, `${secondNewSize}`);
      };

      const onMouseUp = () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        this.element.style.userSelect = ' ';
      };

      handle.addEventListener('mousedown', onMouseDown);
    }
  }

  private setupLayout() {
    this.element.style.display = 'flex';
    this.element.style.flexDirection = this.isHorizontal ? 'row' : 'column';
    this.panels.forEach((panel) => {
      const size = 100 / this.panels.length;
      panel.size = size;
      panel.element.style.flexGrow = '1';
      panel.element.style.flexShrink = '1';
      panel.element.style.flexBasis = `${size}%`;
      panel.element.style.overflow = 'auto';
      panel.element.style.display = 'flex';
      panel.element.setAttribute(AcResizableAttributeName.acResizableSize, `${size}`);
    });
  }

  private updatePanelSizes() {
    if (this.updateAllowed) {
      const isHorizontal = this.direction === 'horizontal';
      const totalSize = this.panels.reduce((acc, panel) => {
        const rect = panel.element.getBoundingClientRect();
        return acc + (isHorizontal ? rect.width : rect.height);
      }, 0);

      let index: number = 0;
      this.panels.forEach((panel) => {
        const rect = panel.element.getBoundingClientRect();
        const size = isHorizontal ? rect.width : rect.height;
        const percent = (size / totalSize) * 100;
        panel.element.style.flexBasis = `${percent}%`;
        panel.element.setAttribute(AcResizableAttributeName.acResizableSize, `${percent}`);
        panel.size = percent;
        index++;
      });
      if (this.updateTimeout) {
        clearTimeout(this.updateTimeout);
      }
      this.updateTimeout = setTimeout(() => {
        this.updateTimeout = undefined;
        const event: IAcResizablePanelResizeEvent = {
          panels: this.panels,
          panelSizes:this.getPanelSizes(),
          resizableInstance: this
        }
        this.events.execute({ event: AcEnumResizableEvent.resize, args: event });
      }, 300);
    }

  }

}
