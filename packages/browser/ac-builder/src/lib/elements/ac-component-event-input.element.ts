import { acAddClassToElement, AcFilterableElementsAttributeName } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../core/ac-builder-api";
import { IAcBuilderElementEvent } from "../interfaces/ac-builder-element-event.interface";
import { IAcPageElement } from "../interfaces/ac-page-element.interface";

export class AcElementEventInput{
  builderApi: AcBuilderApi;
    element: HTMLElement = document.createElement('div');
    property: IAcBuilderElementEvent;
    pageElement: IAcPageElement;
    constructor({ builderApi, property, pageElement }: { builderApi: AcBuilderApi, pageElement: IAcPageElement, property: IAcBuilderElementEvent }) {
      this.builderApi = builderApi;
      this.property = property;
      this.pageElement = pageElement;
      this.element.setAttribute(AcFilterableElementsAttributeName.acFilterValue,this.property.title);
      acAddClassToElement({ element: this.element, cssClass: 'gjs-sm-property gjs-sm-color gjs-sm-property__color gjs-sm-property--full' })
      this.element.innerHTML = `
        <div class="gjs-sm-label">
        <span class="gjs-sm-icon ">
          ${property.title}
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
      });
    }
}
