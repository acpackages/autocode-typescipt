/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcEnumInputEvent, AcFilterableElementsAttributeName, AcInput, AcTextInput } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../core/ac-builder-api";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcPageElement } from "../interfaces/ac-page-element.interface";
import { AcBuilderAttributeName } from "../consts/ac-builder-attribute-name.const";

export class AcElementPropertyInput {
  builderApi: AcBuilderApi;
  element: HTMLElement = document.createElement('div');
  property: IAcBuilderElementProperty;
  pageElement: IAcPageElement;
  input!:AcInput;

  constructor({ builderApi, property, pageElement }: { builderApi: AcBuilderApi, pageElement: IAcPageElement, property: IAcBuilderElementProperty }) {
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
          </div>
        </div>
    </div>`;
    this.setInput();
  }

  private setInput(){
    this.input = new AcTextInput();
    this.input.init();
    (this.element.querySelector('.gjs-input-holder') as HTMLInputElement).append(this.input.element);
    if(this.pageElement && this.pageElement.properties){
      if(this.pageElement.properties[this.property.name]){
        this.input.value = this.pageElement.properties[this.property.name].value;
      }
    }
    this.input.on({event:AcEnumInputEvent.ValueChange,callback:()=>{
      this.pageElement.properties[this.property.name] = {
        name:this.property.name,
        value:this.input.value
      };
      if(this.property.name == 'instanceName'){
        delete this.builderApi.page.elements![this.pageElement.id];
        this.builderApi.page.elements![this.input.value] = this.pageElement;
        this.pageElement.id = this.input.value;
        if(this.pageElement){
          this.pageElement.element!.setAttribute(AcBuilderAttributeName.acBuilderElementId,this.input.value);
        }
      }
    }});
    console.log(this);
  }

}
