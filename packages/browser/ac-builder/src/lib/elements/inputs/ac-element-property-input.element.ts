/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acAddClassToElement, AcEnumInputEvent, AcFilterableElementsAttributeName, AcMessage } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../../core/ac-builder-api";
import { IAcComponentElement } from "../../interfaces/ac-component-element.interface";
import { IAcBuilderElementProperty } from "../../interfaces/ac-builder-element-property.interface";
import { AcBuilderAttributeName } from "../../consts/ac-builder-attribute-name.const";
import { IAcBuilderElement } from "../../interfaces/ac-builder-element.interface";
import { AcBuilderElementsManager } from "../../core/ac-builder-elements-manager";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
import { AcBuilderPropertyInputsManager } from "../../core/ac-builder-property-inputs-manager";
import { AcBuilderPropertyTextInput } from "../_elements.export";
import { AcBuilderPropertyInput } from "../../core/ac-builder-property-input";
import { IAcBuilderPropertyInputType } from "../../interfaces/ac-builder-property-input-type.interface";
import { AcEnumBuilderHook } from "../../enums/ac-enum-builder-hook.enum";
import { IAcBuilderElementPropertyChangeHookArgs } from "../../interfaces/hook-args/ac-builder-element-property-change-hook-args.interface";

export class AcElementPropertyInput {
  builderApi: AcBuilderApi;
  element: HTMLElement = document.createElement('div');
  property: IAcBuilderElementProperty;
  builderElement: IAcBuilderElement;
  componentElement: IAcComponentElement;
  input!: AcBuilderPropertyInput|any;

  constructor({ builderApi, property, componentElement }: { builderApi: AcBuilderApi, componentElement: IAcComponentElement, property: IAcBuilderElementProperty }) {
    this.builderApi = builderApi;
    this.property = property;
    this.componentElement = componentElement;
    this.builderElement = AcBuilderElementsManager.getElement({name:componentElement.name})!;
    this.element.setAttribute(AcFilterableElementsAttributeName.acFilterValue, this.property.title);
    acAddClassToElement({ element: this.element, class_: 'gjs-sm-property gjs-sm-color gjs-sm-property__color gjs-sm-property--full' })
    this.element.innerHTML = `
      <div class="gjs-sm-label">
        <span class="gjs-sm-icon ">
          ${property.title}
        </span>
      </div>
      <button type="button" ac-tooltip="Add property in Script" class="btn btn-add-property float-end text-secondary ms-1 d-none px-1 pt-0" style="height:25px;width:25px;"><ac-svg-icon>${ACI_SVG_SOLID.arrowUpRightFromSquare}</ac-svg-icon></button>
      <div class="gjs-fields" data-sm-fields="">
        <div class="gjs-field">
          <div class="gjs-input-holder">
          </div>
        </div>
    </div>`;
    this.setInput();
  }

  private async addVariableInScript(){
    await this.builderApi.scriptEditor.addCodeInsideClass({className:this.builderApi.component.className!,code:`${this.componentElement.instanceName}!:${this.builderElement.instanceClass.name};`});
    AcMessage.show({message:'Property added in script!',mode:"toast",type:'success'});
  }

  private setInput() {
    const inputContainer: HTMLElement = (this.element.querySelector('.gjs-input-holder') as HTMLInputElement);
    if (AcBuilderPropertyInputsManager.hasType({ type: this.property.type })) {
      const inputType:IAcBuilderPropertyInputType = AcBuilderPropertyInputsManager.getInput({ type: this.property.type })!;
      this.input = new inputType.inputClass();
      if (inputType.properties) {
        for (const key of Object.keys(inputType.properties)) {
          this.input[key] = inputType.properties[key];
        }
      }
    }
    if(this.input == undefined){
      this.input = new AcBuilderPropertyTextInput();
    }
    this.input.componentElement = this.componentElement;
    this.input.builderElement = this.builderElement;
    this.input.builderApi = this.builderApi;
    inputContainer.innerHTML = ``;
    inputContainer.append(this.input);
    if (this.property.inputProperties) {
      if (this.property.inputProperties['selectOptions']) {
        this.input.selectOptions = this.property.inputProperties['selectOptions'];
      }
    }
    if (this.componentElement && this.componentElement.properties) {
        if (this.componentElement.properties[this.property.name]) {
          this.input.value = this.componentElement.properties[this.property.name].value;
        }
      }
      this.input.on({
          event: AcEnumInputEvent.ValueChange, callback: (args:any) => {
            this.componentElement.properties[this.property.name] = {
              name: this.property.name,
              value: this.input.value
            };
            if (this.property.name == 'instanceName' && this.input.value) {
              const newValue = this.input.value.toString().trim();
              if(newValue){
                const oldName = this.componentElement.instanceName;
                delete this.builderApi.component.elements![this.componentElement.instanceName];
                this.builderApi.component.elements![this.input.value] = this.componentElement;
                this.componentElement.instanceName = this.input.value;
                this.builderApi.scriptEditor.helper.renamePropertyInClass({className:this.builderApi.component.className!,oldName:oldName!,newName:this.componentElement.instanceName});
              }
            }
            if (this.componentElement && this.componentElement.instance) {
              console.log(this.property.name,this.input.value);
                this.componentElement.instance[this.property.name]= this.input.value;
                console.log(this.componentElement.instance[this.property.name]);
                console.log(this.componentElement);
              }
            const hookArgs:IAcBuilderElementPropertyChangeHookArgs = {
              builderElement:this.builderElement,
              componentElement:this.componentElement,
              instanceName:this.componentElement.instanceName,
              propertyName:this.property.name,
              property:this.property,
              newValue:this.input.value,
              oldValue:args.oldValue
            };
            this.builderApi.hooks.execute({hook:AcEnumBuilderHook.ElementPropertyChange,args:hookArgs})
          }
        });
      if (this.property.name == 'instanceName') {
        const addPropertyBtn = this.element.querySelector('.btn-add-property') as HTMLElement|undefined;
        if(addPropertyBtn){
          addPropertyBtn.classList.remove('d-none');
          addPropertyBtn.addEventListener('click',()=>{this.addVariableInScript()});
        }
      }
  }

}
;
