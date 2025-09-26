/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcEnumInputEvent, AcFilterableElementsAttributeName, AcMessage } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../../core/ac-builder-api";
import { IAcComponentElement } from "../../interfaces/ac-component-element.interface";
import { IAcBuilderElementProperty } from "../../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../../interfaces/ac-builder-element.interface";
import { AcBuilderElementsManager } from "../../core/ac-builder-elements-manager";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
import { AcBuilderPropertyInputsManager } from "../../core/ac-builder-property-inputs-manager";
import { AcBuilderPropertyTextInput } from "../_elements.export";
import { AcBuilderPropertyInput } from "../../core/ac-builder-property-input";
import { IAcBuilderPropertyInputType } from "../../interfaces/ac-builder-property-input-type.interface";
import { AcEnumBuilderHook } from "../../enums/ac-enum-builder-hook.enum";
import { IAcBuilderElementPropertyChangeHookArgs } from "../../interfaces/hook-args/ac-builder-element-property-change-hook-args.interface";
import { AcClassPropertySelectInput } from "../property-inputs/ac-class-property-select-input.element";

export class AcElementPropertyInput {
  builderApi: AcBuilderApi;
  element: HTMLElement = document.createElement('div');
  property: IAcBuilderElementProperty;
  builderElement: IAcBuilderElement;
  componentElement: IAcComponentElement;
  input!: AcBuilderPropertyInput | any;
  valueInput?: AcBuilderPropertyInput;
  referenceInput?: AcClassPropertySelectInput;
  referencePropertyBtn!:HTMLElement;
  valuePropertyBtn!:HTMLElement;
  valueType:'VALUE'|'CLASS_PROPERTY_REFERENCE' = 'VALUE';

  constructor({ builderApi, property, componentElement }: { builderApi: AcBuilderApi, componentElement: IAcComponentElement, property: IAcBuilderElementProperty }) {
    this.builderApi = builderApi;
    this.property = property;
    this.componentElement = componentElement;
    this.builderElement = AcBuilderElementsManager.getElement({ name: componentElement.name })!;
    this.element.setAttribute(AcFilterableElementsAttributeName.acFilterValue, this.property.title);
    acAddClassToElement({ element: this.element, class_: 'gjs-sm-property gjs-sm-color gjs-sm-property__color gjs-sm-property--full' })
    this.element.innerHTML = `
      <div class="gjs-sm-label">
        <span class="gjs-sm-icon ">
          ${property.title}
        </span>
      </div>
      <button type="button" ac-tooltip="Add instance reference in script" class="btn btn-add-property float-end text-secondary ms-1 d-none px-1 pt-0" style="height:25px;width:25px;">
        <ac-svg-icon>${ACI_SVG_SOLID.arrowUpRightFromSquare}</ac-svg-icon>
      </button>
      <button type="button" ac-tooltip="Class property reference" class="btn btn-reference-property float-end text-secondary ms-1 d-none px-1 pt-0" style="height:25px;width:25px;">
        <ac-svg-icon>${ACI_SVG_SOLID.code}</ac-svg-icon>
      </button>
      <button type="button" ac-tooltip="Direct value input" class="btn btn-value-property float-end text-secondary ms-1 d-none px-1 pt-0" style="height:25px;width:25px;">
        <ac-svg-icon>${ACI_SVG_SOLID.deleteLeft}</ac-svg-icon>
      </button>
      <div class="gjs-fields" data-sm-fields="">
        <div class="gjs-field">
          <div class="gjs-input-holder">
          </div>
        </div>
    </div>`;
    this.setInput();
  }

  private async addVariableInScript() {
    await this.builderApi.scriptEditor.addCodeInsideClass({ className: this.builderApi.component.className!, code: `${this.componentElement.instanceName}!:${this.builderElement.instanceClass.name};` });
    AcMessage.show({ message: 'Property added in script!', mode: "toast", type: 'success' });
  }

  private setInput() {
    if (this.property.name == 'instanceName') {
      const addPropertyBtn = this.element.querySelector('.btn-add-property') as HTMLElement | undefined;
      if (addPropertyBtn) {
        addPropertyBtn.classList.remove('d-none');
        addPropertyBtn.addEventListener('click', () => { this.addVariableInScript() });
      }
    }
    else {
      this.referencePropertyBtn = this.element.querySelector('.btn-reference-property') as HTMLElement;
      this.valuePropertyBtn = this.element.querySelector('.btn-value-property') as HTMLElement;

      this.referencePropertyBtn.addEventListener('click', () => {
        this.setReferenceInput()
      });

      this.valuePropertyBtn.addEventListener('click', () => {
          this.setValueInput();
        });
    }
    if (this.property.type == 'propertyReference') {
      this.setReferenceInput();
      this.setInputProperties({input:this.referenceInput});
    }
    else {
      this.setValueInput();
    }
  }

  setInputEventListener({input}:{input:AcBuilderPropertyInput|any}) {
    input.on({
      event: AcEnumInputEvent.ValueChange, callback: (args: any) => {
        this.setPropertyValue()
        // this.componentElement.properties[this.property.name] = {
        //   name: this.property.name,
        //   value: this.input.value,
        // };
        if (this.property.name == 'instanceName' && this.input.value) {
          const newValue = this.input.value.toString().trim();
          if (newValue) {
            const oldName = this.componentElement.instanceName;
            delete this.builderApi.component.elements![this.componentElement.instanceName];
            this.builderApi.component.elements![this.input.value] = this.componentElement;
            this.componentElement.instanceName = this.input.value;
            this.builderApi.scriptEditor.helper.renamePropertyInClass({ className: this.builderApi.component.className!, oldName: oldName!, newName: this.componentElement.instanceName });
          }
        }

        const hookArgs: IAcBuilderElementPropertyChangeHookArgs = {
          builderElement: this.builderElement,
          componentElement: this.componentElement,
          instanceName: this.componentElement.instanceName,
          propertyName: this.property.name,
          property: this.property,
          newValue: this.input.value,
          oldValue: args.oldValue
        };
        this.builderApi.hooks.execute({ hook: AcEnumBuilderHook.ElementPropertyChange, args: hookArgs })
      }
    });
  }

  setInputProperties({input}:{input:AcBuilderPropertyInput|any}) {
    if (this.property.inputProperties) {
      for (const key of Object.keys(this.property.inputProperties)) {
        input[key] = this.property.inputProperties[key];
      }
    }
  }

  setPropertyValue(){
    const value = this.input.value;
    if(value != undefined && value !=null){
      this.componentElement.properties[this.property.name] = {
        name:this.property.name,
        value: this.input.value,
        valueType:this.valueType
      };
      if (this.componentElement && this.componentElement.instance) {
        if(this.valueType == 'CLASS_PROPERTY_REFERENCE' && this.builderApi.runtime && this.builderApi.runtime.runtimeComponent){
          this.componentElement.instance[this.property.name] = this.builderApi.runtime.runtimeComponent.componentInstance[value];
        }
        else{
          this.componentElement.instance[this.property.name] = this.input.value;
        }
      }
    }
    else{
      delete this.componentElement.properties[this.property.name];
    }

  }

  setReferenceInput() {
    const inputContainer: HTMLElement = (this.element.querySelector('.gjs-input-holder') as HTMLInputElement);
    if (this.referenceInput == undefined) {
      this.referenceInput = new AcClassPropertySelectInput();
      this.referenceInput.builderApi = this.builderApi;
      inputContainer.append(this.referenceInput);
      this.setInputEventListener({input:this.referenceInput});
    }
    this.input = this.referenceInput;
    inputContainer.innerHTML = ``;
    inputContainer.append(this.input);
    this.setValueFromElement();
    if(this.valuePropertyBtn && this.referencePropertyBtn){
      this.valuePropertyBtn.classList.remove('d-none');
      this.referencePropertyBtn.classList.add('d-none');
    }
    this.valueType = 'CLASS_PROPERTY_REFERENCE';
    this.setPropertyValue();
  }

  setValueFromElement() {
    if (this.componentElement && this.componentElement.properties) {
      if (this.componentElement.properties[this.property.name]) {
        this.input.value = this.componentElement.properties[this.property.name].value;
      }
    }
  }

  setValueInput() {
    const inputContainer: HTMLElement = (this.element.querySelector('.gjs-input-holder') as HTMLInputElement);
    if (this.valueInput == undefined) {
      if (AcBuilderPropertyInputsManager.hasType({ type: this.property.type })) {
        const inputType: IAcBuilderPropertyInputType = AcBuilderPropertyInputsManager.getInput({ type: this.property.type })!;
        this.valueInput = new inputType.inputClass();
      }
      if (this.valueInput == undefined) {
        this.valueInput = new AcBuilderPropertyTextInput();
      }
      this.valueInput.componentElement = this.componentElement;
      this.valueInput.builderElement = this.builderElement;
      this.valueInput.builderApi = this.builderApi;
      this.setInputProperties({input:this.valueInput});
      this.setInputEventListener({input:this.valueInput});
    }
    this.input = this.valueInput;
    inputContainer.innerHTML = ``;
    inputContainer.append(this.input);
    this.setValueFromElement();
    if(this.valuePropertyBtn && this.referencePropertyBtn){
      this.valuePropertyBtn.classList.add('d-none');
      this.referencePropertyBtn.classList.remove('d-none');
    }
    this.valueType = 'VALUE';
    this.setPropertyValue();
  }

}
