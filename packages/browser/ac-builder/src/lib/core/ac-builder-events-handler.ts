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
      if (element.hasAttribute(AcBuilderAttributeName.acBuilderElementInstanceName)) {
        const elementId: string = element.getAttribute(AcBuilderAttributeName.acBuilderElementInstanceName)!;
        const componentElement = this.builderApi.component.elements![elementId];
        const builderElement = AcBuilderElementsManager.getElement({name:componentElement.name});
        if(builderElement){
          const instance = new builderElement.instanceClass();
          componentElement.instance = instance;
          instance.element = element;
          this.builderApi.scriptEditor.addCodeInsideClass({className:this.builderApi.component.className!,code:`${componentElement.instanceName}!:${builderElement.instanceClass.name};`});
          if (componentElement) {
            const eventArgs: IAcBuilderElementEventArgs = {
              componentElement: componentElement
            };
            this.builderApi.hooks.execute({ hook: AcEnumBuilderHook.ElementAdd, args: eventArgs });
            this.builderApi.events.execute({ event: AcEnumBuilderEvent.ElementAdd, args: eventArgs });
          }
          instance.init({args:{element:element}});
          if(this.builderApi.runtime){
            // this.builderApi.runtime.builderApi({element:componentElement});
          }
        }
      }
    }

  }

  handleElementSelect({ element }: { element: HTMLElement }) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.hasAttribute(AcBuilderAttributeName.acBuilderElementInstanceName)) {
        const elementId: string = element.getAttribute(AcBuilderAttributeName.acBuilderElementInstanceName)!;
        if (this.builderApi.component.elements && this.builderApi.component.elements[elementId]) {
          const componentElement = this.builderApi.component.elements[elementId];
          this.builderApi.selectedElement = componentElement;
          if (componentElement) {
            const eventArgs: IAcBuilderElementEventArgs = {
              componentElement: componentElement
            };
            this.builderApi.hooks.execute({ hook: AcEnumBuilderHook.ElementSelect, args: eventArgs });
            this.builderApi.events.execute({ event: AcEnumBuilderEvent.ElementSelect, args: eventArgs });
          }
        }
      }
    }
  }

}
