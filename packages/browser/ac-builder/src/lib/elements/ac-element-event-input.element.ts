/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcFilterableElementsAttributeName } from "@autocode-ts/ac-browser";
import { stringToCamelCase } from "@autocode-ts/ac-extensions";
import { AcBuilderApi } from "../core/ac-builder-api";
import { IAcBuilderElementEvent } from "../interfaces/ac-builder-element-event.interface";
import { IAcPageElement } from "../interfaces/ac-page-element.interface";

export class AcElementEventInput{
  builderApi: AcBuilderApi;
    element: HTMLElement = document.createElement('div');
    event: IAcBuilderElementEvent;
    pageElement: IAcPageElement;
    constructor({ builderApi, event, pageElement }: { builderApi: AcBuilderApi, pageElement: IAcPageElement, event: IAcBuilderElementEvent }) {
      this.builderApi = builderApi;
      this.event = event;
      this.pageElement = pageElement;
      this.element.setAttribute(AcFilterableElementsAttributeName.acFilterValue,this.event.title);
      acAddClassToElement({ element: this.element, cssClass: 'gjs-sm-property gjs-sm-color gjs-sm-property__color gjs-sm-property--full' })
      this.element.innerHTML = `
        <div class="gjs-sm-label">
        <span class="gjs-sm-icon ">
          ${event.title}
        </span>
      </div>
        <div class="gjs-fields" data-sm-fields="">
          <div class="gjs-field">
            <div class="gjs-input-holder">
              <input type="text" placeholder="">
            </div>
          </div>
      </div>`;
      this.element.addEventListener('click',()=>{
        this.builderApi.toggleScriptEditor();
        const functionName = stringToCamelCase(`handle_${this.pageElement.id}_${event.name}`);
        this.builderApi.scriptEditor?.addCodeInsideClass({className:this.builderApi.page.scriptClassName!,code:`${functionName}{\n\t}`});
      });
    }
}
