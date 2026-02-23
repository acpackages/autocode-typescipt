/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acRegisterCustomElement, AcSelectInputElement } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../../core/ac-builder-api";
import { AcEnumBuilderHook } from "../../enums/ac-enum-builder-hook.enum";
import { AcBuilderPropertyInput } from "../../core/ac-builder-property-input";

export class AcClassPropertySelectInput extends AcBuilderPropertyInput{
  override inputElement:AcSelectInputElement = new AcSelectInputElement();

  override get builderApi():AcBuilderApi|any{
    return super.builderApi;
  }
  override set builderApi(value:AcBuilderApi){
    super.builderApi = value;
    this.builderApi.hooks.subscribe({hook:AcEnumBuilderHook.ScriptPropertyChange,callback:()=>{
      this.setOptions();
    }});
  }

  override get value(): any {
    return this.inputElement.value;
  }
  override set value(value: any) {
    this.inputElement.value = value;
    this.setValue(value);
  }

  constructor(){
    super();
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.inputElement.placeholder = "Select property...";
    this.setOptions();
  }

  async setOptions(){
    if(this.builderApi!.scriptEditor && this.builderApi!.component.className){
      const functions = await this.builderApi!.scriptEditor.helper.getPropertiesInClass({className:this.builderApi!.component.className});
      this.inputElement.options = functions;
    }
  }

}

acRegisterCustomElement({tag:'ac-class-property-select-input',type:AcClassPropertySelectInput});
