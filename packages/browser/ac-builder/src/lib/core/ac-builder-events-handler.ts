/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcBuilderApi } from "./ac-builder-api";
import { AcEnumBuilderHook } from "../enums/ac-enum-builder-hook.enum";
import { AcBuilderAttributeName } from "../consts/ac-builder-attribute-name.const";
import { AcEnumBuilderEvent } from "../enums/ac-enum-builder-event.enum";
import { IAcBuilderElementEventArgs } from "../interfaces/event-args/ac-builder-element-event-args.interface";

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
        if (pageElement) {
          const eventArgs: IAcBuilderElementEventArgs = {
            pageElement: pageElement
          };
          this.builderApi.hooks.execute({ hook: AcEnumBuilderHook.ElementAdd, args: eventArgs });
          this.builderApi.events.execute({ event: AcEnumBuilderEvent.ElementAdd, args: eventArgs });
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
