/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcEnumInputEvent, AcFilterableElementsAttributeName, AC_INPUT_TAG, AcTextInputElement, AcNumberInputElement, AcSelectInputElement } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../../core/ac-builder-api";
import { IAcComponentElement } from "../../interfaces/ac-component-element.interface";
import { IAcBuilderElementProperty } from "../../interfaces/ac-builder-element-property.interface";
import { AcBuilderAttributeName } from "../../consts/ac-builder-attribute-name.const";
import { AcBuilderInputsManager } from "../../core/ac-builder-inputs-manager";
import { IAcBuilderInput } from "../../interfaces/ac-builder-input.interface";

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
    const inputContainer: HTMLElement = (this.element.querySelector('.gjs-input-holder') as HTMLInputElement);
    let tag: string = AC_INPUT_TAG.textInput;
    let input: IAcBuilderInput | undefined;
    if (AcBuilderInputsManager.hasType({ type: this.property.type })) {
      input = AcBuilderInputsManager.getInput({ type: this.property.type });
      tag = input!.tag;
    }
    inputContainer.innerHTML = `<${tag} class="ac-builder-property-input"/>`;
    this.input = inputContainer.querySelector('.ac-builder-property-input');
    if (input && input.properties) {
      for (const key of Object.keys(input.properties)) {
        this.input[key] = input.properties[key];
      }
    }
    if (this.property.inputProperties) {
      if (this.property.inputProperties['selectOptions']) {
        this.input.selectOptions = this.property.inputProperties['selectOptions'];
      }
    }
    if (this.input) {
      if (this.componentElement && this.componentElement.properties) {
        if (this.componentElement.properties[this.property.name]) {
          this.input.value = this.componentElement.properties[this.property.name].value;
        }
      }
      if (this.input.on) {
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

}
