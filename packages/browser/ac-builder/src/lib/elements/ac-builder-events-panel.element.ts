import { acAddClassToElement, AcCollapse, AcCollapseAttributeName, AcEnumCollapseEvent, AcFilterableElements, AcFilterableElementsAttributeName } from "@autocode-ts/ac-browser";
import { AcBuilderCssClassName } from "../consts/ac-builder-css-class-name.const";
import { AcBuilderApi } from "../core/ac-builder-api";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { IAcBuilderElementEvent } from "../interfaces/ac-builder-element-event.interface";
import { AcElementEventInput } from "./ac-element-event-input.element";

export class AcBuilderEventsPanel {
  builderApi: AcBuilderApi;
  element: HTMLElement = document.createElement('div');
  elementEvents: IAcBuilderElementEvent[] = [];
  inputsContainer: HTMLElement;
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
    this.element.innerHTML = `<div class="ac-builder-events-tab-container ">
        <div class="p-2">
          <input type="text" class="${AcBuilderCssClassName.acBuilderSidebarInput} ac-events-filter-input" placeholder="Search..." ac-filter-input>
        </div>
        <div class="ac-builder-events-panel ac-builder-scrollable-element" >
        </div>
      </div>`;
    this.inputsContainer = this.element.querySelector('.ac-builder-events-panel') as HTMLElement;
    this.builderApi.hooks.subscribe({
      hook: AcEnumBuilderHook.ElementSelect, callback: (args: any) => {
        this.setElementProperties();
      }
    });
    new AcFilterableElements({ element: this.element });
  }

  private getCategoryElement({ categoryName }: { categoryName: string }) {
    let categoryContainer = this.inputsContainer.querySelector(`[ac-data-category=${categoryName}]`);
    if (categoryContainer == undefined) {
      categoryContainer = document.createElement('div');
      categoryContainer.setAttribute(AcFilterableElementsAttributeName.acFilterElementGroup, 'true');
      categoryContainer.setAttribute('ac-data-category', categoryName);
      acAddClassToElement({ element: categoryContainer, cssClass: 'gjs-block-category gjs-open' });
      categoryContainer.innerHTML = `<div class="gjs-title" data-title="" ${AcCollapseAttributeName.acCollapseToggle}>
          <i class="gjs-caret-icon fa fa-caret-down"></i> ${categoryName}
        </div>
        <div class="gjs-blocks-c category-inputs-container gjs-sm-properties p-1" ${AcCollapseAttributeName.acCollapseContent} ${AcCollapseAttributeName.acCollapseOpen}></div>
        `;
      this.inputsContainer.append(categoryContainer);
      const collapse = new AcCollapse({ element: categoryContainer as HTMLElement });
      collapse.on({event:AcEnumCollapseEvent.Open,callback:()=>{
        categoryContainer?.querySelector('.gjs-caret-icon')?.classList.add('fa-caret-down');
        categoryContainer?.querySelector('.gjs-caret-icon')?.classList.remove('fa-caret-right');
      }});
      collapse.on({event:AcEnumCollapseEvent.Close,callback:()=>{
        categoryContainer?.querySelector('.gjs-caret-icon')?.classList.remove('fa-caret-down');
        categoryContainer?.querySelector('.gjs-caret-icon')?.classList.add('fa-caret-right');
      }});
    }
    return categoryContainer;
  }

  renderInputs() {
    for (const event of this.elementEvents) {
      const propertyInput = new AcElementEventInput({ builderApi: this.builderApi, event: event, pageElement: this.builderApi.selectedElement! });
      const categoryElement = this.getCategoryElement({ categoryName: event.category });
      (categoryElement.querySelector('.category-inputs-container') as HTMLElement).append(propertyInput.element);
    }
  }

  setElementProperties() {
    this.inputsContainer.innerHTML = "";
    this.elementEvents = [];
    if (this.builderApi.selectedElement) {
      const elementName = this.builderApi.selectedElement.name;
      const element = this.builderApi.elements[elementName];
      if (element && element.events) {
        this.elementEvents = element.events;
      }
    }
    this.renderInputs();
  }
}
