/* eslint-disable no-self-assign */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumResizableEvent } from "../enums/ac-enum-resizable-event.enum";
import { IAcResizablePanelResizeEvent } from "../interfaces/ac-resizable-panel-resize-event.interface";
import { IAcResizablePanelSize } from "../interfaces/ac-resizable-panel-size.interface";
import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_RESIZABLE_TAG } from "../consts/ac-resizable-tag.const";
import { AcResizablePanel } from "./ac-resizable-panel.element";

export class AcResizablePanels extends AcElementBase {
  get direction(): 'horizontal' | 'vertical' {
    return this.getAttribute('direction') ?? 'horizontal' as any;
  }
  set direction(value: 'horizontal' | 'vertical') {
    this.setAttribute('direction', value);
    this.style.flexDirection = value=="horizontal"?"row":"column";
  }
  panels: AcResizablePanel[] = [];
  private updateTimeout: any;
  updateAllowed: boolean = false;

  get isHorizontal(): boolean {
    return this.direction == 'horizontal';
  }

  constructor() {
    super();
    this.style.display = 'flex';
    this.style.height = '100%';
    this.style.width = '100%';
    this.style.overflow = "hidden";
  }

  override init(): void {
    this.direction = this.direction;
    setTimeout(() => {
      this.updateAllowed = true;
    }, 500);
  }


  identifyResizablePanels() {
    this.panels = [];
    const elements = Array.from(this.querySelectorAll(`${AC_RESIZABLE_TAG.resizablePanel}`)) as AcResizablePanel[];
    for (const panelElement of elements) {
      if (panelElement.resizablePanels == this) {
        const index: number = this.panels.length;
        panelElement.index = index;
        panelElement.size = 100 / elements.length;
        panelElement.isLast = index == elements.length - 1;
        this.panels.push(panelElement);
      }
    }
  }

  getPanelSizes() {
    const panelSizes: IAcResizablePanelSize[] = [];
    for (const panel of this.panels) {
      panelSizes.push({ index: panel.index, size: panel.size });
    }
    return panelSizes;
  }

  registerResizablePanel(panel: AcResizablePanel) {
    this.identifyResizablePanels();
    panel.on({
      event: 'panelresize', callback: (args:any) => {
        this.updatePanelSizes();
      }
    });
    panel.on({
      event: 'resize', callback: (args:any) => {
        // this.updatePanelSizes();
      }
    });
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
      panel.size = size;
    }

    setTimeout(() => {
      this.updateAllowed = true;
      for (const panelSize of newPanelSizes) {
        const size = panelSize.size;
        const index = panelSize.index;
        this.panels[index].size = size;
      }
    }, 400);

  }


  private updatePanelSizes() {
      const isHorizontal = this.direction === 'horizontal';
      const totalSize = this.panels.reduce((acc, panel) => {
        const rect = panel.getBoundingClientRect();
        return acc + (isHorizontal ? rect.width : rect.height);
      }, 0);

      let index: number = 0;
      this.panels.forEach((panel) => {
        const rect = panel.getBoundingClientRect();
        const size = isHorizontal ? rect.width : rect.height;
        const percent = (size / totalSize) * 100;
        panel.style.flexBasis = `${percent}%`;
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
          panelSizes: this.getPanelSizes(),
          resizableInstance: this
        }
        this.events.execute({ event: AcEnumResizableEvent.resize, args: event });
      }, 300);
  }

}

acRegisterCustomElement({ tag: AC_RESIZABLE_TAG.resizablePanels, type: AcResizablePanels });
