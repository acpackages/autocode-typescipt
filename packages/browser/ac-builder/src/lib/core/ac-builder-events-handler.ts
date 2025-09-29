/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcBuilderApi } from "./ac-builder-api";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { AC_BUILDER_ELEMENT_ATTRIBUTE } from "../consts/ac-builder-element-attribute.const";
import { AcEnumBuilderEvent } from "../enums/ac-enum-builder-event.enum";
import { IAcBuilderElementEventArgs } from "../interfaces/event-args/ac-builder-element-event-args.interface";
import { AcBuilderElementsManager } from "./ac-builder-elements-manager";

export class AcBuilderEventsHandler {
  builderApi: AcBuilderApi;
  constructor({ builderApi }: { builderApi: AcBuilderApi }) {
    this.builderApi = builderApi;
  }

  getFunctionUseCount({functionName}:{functionName:string}):number{
    let count:number = 0;
    if(this.builderApi.component.elements){
      for(const builderElement of Object.values(this.builderApi.component.elements)){
        for(const fun of Object.values(builderElement.events)){
          if(fun.functionName == functionName){
            count++;
          }
        }
      }
    }
    return count;
  }

  handleElementAdd({ element }: { element: HTMLElement }) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.hasAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)) {
        const elementId: string = element.getAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)!;
        const componentElement = this.builderApi.component.elements![elementId];
        const builderElement = AcBuilderElementsManager.getElement({name:componentElement.name});
        if(builderElement){
          const instance = new builderElement.instanceClass();
          componentElement.instance = instance;
          instance.element = element;
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

  async handleElementRemove({ element }: { element: HTMLElement }) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.hasAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)) {
        if(!this.builderApi.refreshingEditorHtml){
          const elementId: string = element.getAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)!;
          const builderElement = this.builderApi.component.elements![elementId];
          if(builderElement){
            const className = this.builderApi.component.className!;
            await this.builderApi.scriptEditor.helper.removePropertyInClass({className:className,propertyName:builderElement.instanceName});
            for(const fun of Object.values(builderElement.events)){
              const useCount = this.getFunctionUseCount({functionName:fun.functionName!});
              if(useCount <= 1){
                await this.builderApi.scriptEditor.helper.removeFunctionInClass({className:className,functionName:fun.functionName!});
              }
            }
            delete this.builderApi.component.elements![elementId];
          }
        }
      }
    }
  }

  handleElementSelect({ element }: { element: HTMLElement }) {
    if (element.nodeType === Node.ELEMENT_NODE) {
      if (element.hasAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)) {
        const elementId: string = element.getAttribute(AC_BUILDER_ELEMENT_ATTRIBUTE.acBuilderElementInstanceName)!;
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
