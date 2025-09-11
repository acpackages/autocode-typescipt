/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcBuilderApi } from "./ac-builder-api";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { AcBuilderAttributeName } from "../consts/ac-builder-attribute-name.const";
import { AcEnumBuilderEvent } from "../enums/ac-enum-builder-event.enum";
import { IAcBuilderElementEventArgs } from "../interfaces/event-args/ac-builder-element-event-args.interface";
import { AcBuilderElementsManager } from "./ac-builder-elements-manager";

export class AcBuilderEventsHandler {
  builderApi: AcBuilderApi;
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
  }

  handleElementAdd({ element }: { element: HTMLElement }) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.hasAttribute(AcBuilderAttributeName.acBuilderElementId)) {
        const elementId: string = element.getAttribute(AcBuilderAttributeName.acBuilderElementId)!;
        const pageElement = this.builderApi.page.elements![elementId];
        const builderElement = AcBuilderElementsManager.getElement({name:pageElement.name});
        if(builderElement){
          const instance = new builderElement.instanceClass();
          pageElement.instance = instance;
          instance.element = element;
          this.builderApi.scriptEditor.addCodeInsideClass({className:this.builderApi.page.className!,code:`${pageElement.id}!:${builderElement.instanceClass.name};`});
          if (pageElement) {
            const eventArgs: IAcBuilderElementEventArgs = {
              pageElement: pageElement
            };
            this.builderApi.hooks.execute({ hook: AcEnumBuilderHook.ElementAdd, args: eventArgs });
            this.builderApi.events.execute({ event: AcEnumBuilderEvent.ElementAdd, args: eventArgs });
          }
          instance.init({args:{element:element}});
          if(this.builderApi.runtime){
            // this.builderApi.runtime.builderApi({element:pageElement});
          }
        }
      }
    }

  }

  handleElementSelect({ element }: { element: HTMLElement }) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.hasAttribute(AcBuilderAttributeName.acBuilderElementId)) {
        const elementId: string = element.getAttribute(AcBuilderAttributeName.acBuilderElementId)!;
        if (this.builderApi.page.elements && this.builderApi.page.elements[elementId]) {
          const pageElement = this.builderApi.page.elements[elementId];
          this.builderApi.selectedElement = pageElement;
          if (pageElement) {
            const eventArgs: IAcBuilderElementEventArgs = {
              pageElement: pageElement
            };
            this.builderApi.hooks.execute({ hook: AcEnumBuilderHook.ElementSelect, args: eventArgs });
            this.builderApi.events.execute({ event: AcEnumBuilderEvent.ElementSelect, args: eventArgs });
          }
        }
      }
    }
  }

}
