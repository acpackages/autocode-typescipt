/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcContext, AcEnumContextEvent } from "@autocode-ts/autocode";
import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement, acSwapElementsWithAnimation } from "../../../utils/ac-element-functions";
import { AcDraggableApi } from "../../ac-draggable/core/ac-draggable-api";
import { AcSortable } from "../../ac-draggable/elements/ac-sortable.element";
import { AcEnumDraggableEvent } from "../../ac-draggable/enums/ac-enum-draggable-event.enum";
import { IAcDraggableDragDropEvent } from "../../ac-draggable/interfaces/ac-draggable-drag-drop-event.interface";

export interface IAcWindowTab {
  id: string;
  title: string;
  closeable?: boolean;
  icon?: string;
  element?:HTMLElement
}

export class AcWindowTabs extends AcElementBase {
  public static observedAttributes = [];
  private activeId: string | null = null;
  tabs:AcContext|any = new AcContext({value:{}});

  constructor(){
    super();
    this.tabs.on({event:AcEnumContextEvent.Change,callback:()=>{
      this.renderTabs();
    }});
  }

  public addTab({ tab }: { tab: IAcWindowTab }): void {
    const tabContainer = this.querySelector('.ac-window-tabs-container');
    if (tabContainer) {
      const windowTab = {...tab};
      const tabElement = this.ownerDocument.createElement('div');
      tabElement.className = `ac-window-tab-item`;
      tabElement.setAttribute('ac-draggable-lock-x-axis', '');
      tabElement.setAttribute('ac-draggable-element', '');
      tabElement.setAttribute('ac-draggable-target', '');
      tabElement.setAttribute('data-id', tab.id);
      tabElement.innerHTML = `${tab.icon ? `<div class="ac-window-tab-icon">${tab.icon}</div>` : ''}<div class="ac-window-tab-title">${tab.title}</div>${tab.closeable ? '<div class="ac-window-tab-close">×</div>' : ''}`;
      tabContainer.appendChild(tabElement);
      tabElement.addEventListener('click', (e) => {
        if ((e.target as HTMLElement).classList.contains('ac-window-tab-close')) {
          this.removeTab({ id: tab.id });
        } else {
          this.selectTab({ id: tab.id });
        }
      });
      windowTab.element = tabElement;
      this.tabs[tab.id] = windowTab;
    }
  }

  public getTabs(): IAcWindowTab[] {
    const tabs: IAcWindowTab[] = [];
    this.querySelectorAll('.ac-window-tab-item').forEach(tab => {
      const id = tab.getAttribute('data-id')!;
      const title = tab.childNodes[0].textContent || tab.textContent!.split('×')[0].trim();
      const closeable = !!tab.querySelector('.ac-window-tab-close');
      const icon = tab.querySelector('.ac-window-tab-icon')?.textContent || undefined;
      tabs.push({ id, title, closeable, icon });
    });
    return tabs;
  }

  override async init() {
    super.init();
    this.innerHTML = `<div class="ac-window-tabs-container"></div><button type="button" class="ac-window-tab-add-button">+</button>`;
    const addButton = this.querySelector('.ac-window-tab-add-button');
    addButton?.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('addNewClick'));
    });
    // const acDraggable = new AcSortable({ element: this.querySelector('.ac-window-tabs-container')! });
    const acDraggable = new AcSortable();
    const draggableApi: AcDraggableApi = acDraggable.draggableApi;
    draggableApi.on({
      event: AcEnumDraggableEvent.DragDrop,
      callback: (args: IAcDraggableDragDropEvent) => {
        if (!args.elementInstance || !args.targetInstance) return;
        acSwapElementsWithAnimation({
          element1: args.elementInstance.element,
          element2: args.targetInstance.element,
          duration: 200
        });
        const tabs = this.getTabs();
        this.dispatchEvent(new CustomEvent('tabs-reordered', { detail: { tabs } }));
      },
    });
    draggableApi.on({
      event: AcEnumDraggableEvent.DragStart,
      callback: (args: IAcDraggableDragDropEvent) => {
        if (args.elementInstance) {
          args.elementInstance.element.classList.add('dragging');
        }
      }
    });
    draggableApi.on({
      event: AcEnumDraggableEvent.DragEnd,
      callback: (args: IAcDraggableDragDropEvent) => {
        if (args.elementInstance) {
          args.elementInstance.element.classList.remove('dragging');
        }
      }
    });
  }

  public renderTabs(): void {
    for(const tab of Object.values(this.tabs.toJson()) as IAcWindowTab[]){
      const iconElement:HTMLElement = tab.element!.querySelector('.ac-window-tab-icon') as HTMLElement;
      const titleElement:HTMLElement = tab.element!.querySelector('.ac-window-tab-title') as HTMLElement;
      if(iconElement && tab.icon){
        iconElement.innerHTML = tab.icon;
      }
      if(titleElement && tab.title){
        titleElement.innerHTML = tab.title;
      }
    }
  }

  public removeTab({ id }: { id: string }): void {
    const tab = this.querySelector(`.ac-window-tab-item[data-id="${id}"]`);
    if (tab) {
      const wasActive = tab.classList.contains('active');
      tab.remove();
      this.dispatchEvent(new CustomEvent('remove', { detail: { id: id } }));
      if (wasActive) {
        const remainingTabs = this.querySelectorAll('.ac-window-tab-item');
        if (remainingTabs.length > 0) {
          const newActiveId = remainingTabs[0].getAttribute('data-id')!;
          this.selectTab({ id: newActiveId });
        } else {
          this.activeId = null;

        }
      }
    }
  }

  public selectTab({ id }: { id: string }): void {
    if (this.activeId != id) {
      this.querySelectorAll('.ac-window-tab-item').forEach(t => t.classList.remove('active'));
      const tab = this.querySelector(`.ac-window-tab-item[data-id="${id}"]`);
      if (tab) {
        tab.classList.add('active');
        this.activeId = id;
        const event = new CustomEvent('activeChange', { detail: { id: id } });
        this.dispatchEvent(event);
      }
    }

  }

  public setTabs({ tabs }: { tabs: IAcWindowTab[] }): void {
    const tabContainer = this.querySelector('.ac-window-tabs-container');
    if (tabContainer) {
      tabContainer.innerHTML = '';
      tabs.forEach((tab, index) => {
        this.addTab({ tab });
      });
      this.activeId = tabs[0]?.id || null;
      if (tabs[0]) {
        const event = new CustomEvent('activeChange', { detail: { id: tabs[0].id } });
        this.dispatchEvent(event);
      }
    }
  }
}

acRegisterCustomElement({ tag: 'ac-window-tabs', type: AcWindowTabs });
