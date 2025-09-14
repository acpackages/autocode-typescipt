/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcEnumInputEvent, AcFilterableElementsAttributeName,AC_INPUT_TAG, AcTextInputElement } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../../core/ac-builder-api";
import { IAcComponentElement } from "../../interfaces/ac-component-element.interface";
import { IAcBuilderElementProperty } from "../../interfaces/ac-builder-element-property.interface";
import { AcBuilderAttributeName } from "../../consts/ac-builder-attribute-name.const";

export class AcElementPropertyInput {
  builderApi: AcBuilderApi;
  element: HTMLElement = document.createElement('div');
  property: IAcBuilderElementProperty;
  componentElement: IAcComponentElement;
  input!: any;

  constructor({ builderApi, property, componentElement }: { builderApi: AcBuilderApi, componentElement: IAcComponentElement, property: IAcBuilderElementProperty }) {
    this.builderApi = builderApi;
    this.property = property;
    this.componentElement = componentElement;
    this.element.setAttribute(AcFilterableElementsAttributeName.acFilterValue, this.property.title);
    acAddClassToElement({ element: this.element, class_: 'gjs-sm-property gjs-sm-color gjs-sm-property__color gjs-sm-property--full' })
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

  private setInput() {
    if (this.property.type == 'string') {
      this.input = document.createElement(AC_INPUT_TAG.textInput);
    }
    else if (this.property.type == 'number') {
      this.input = document.createElement(AC_INPUT_TAG.numberInput);
    }
    else if (this.property.type == 'select') {
      this.input = document.createElement(AC_INPUT_TAG.selectInput);
      if(this.property.inputProperties){
        if(this.property.inputProperties['selectOptions']){
          this.input.selectOptions = this.property.inputProperties['selectOptions'];
        }
      }
    }
    else if (this.property.type == 'boolean') {
      this.input = document.createElement(AC_INPUT_TAG.selectInput);
      this.input.selectOptions = [{'label':'True','value':true},{'label':'False','value':false}];
    }
    if (this.input) {
      // this.input.init();
      (this.element.querySelector('.gjs-input-holder') as HTMLInputElement).append(this.input.element);
      if (this.componentElement && this.componentElement.properties) {
        if (this.componentElement.properties[this.property.name]) {
          this.input.value = this.componentElement.properties[this.property.name].value;
        }
      }
      this.input.on({
        event: AcEnumInputEvent.ValueChange, callback: () => {
          this.componentElement.properties[this.property.name] = {
            name: this.property.name,
            value: this.input.value
          };
          if (this.property.name == 'instanceName') {
            delete this.builderApi.component.elements![this.componentElement.instanceName];
            this.builderApi.component.elements![this.input.value] = this.componentElement;
            this.componentElement.instanceName = this.input.value;
            if (this.componentElement) {
              this.componentElement.instance.element!.setAttribute(AcBuilderAttributeName.acBuilderElementInstanceName, this.input.value);
            }
          }
        }
      });
    }

  }

}
