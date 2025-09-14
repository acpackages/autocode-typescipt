import { AC_INPUT_TAG, AcInputBase, acRegisterCustomElement, AcSelectInputElement } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../../core/ac-builder-api";
import { AcEnumBuilderHook } from "../../enums/ac-enum-builder-hook.enum";

export class AcEventSelectInput extends AcInputBase{
  builderApi:AcBuilderApi;
  override inputElement:AcSelectInputElement = new AcSelectInputElement();
  selectInput:AcSelectInputElement;

  override get value(): any {
    return this.selectInput.value;
  }
  override set value(value: any) {
    this.selectInput.value = value;
    this.setValue(value);
  }

  constructor({builderApi}:{builderApi:AcBuilderApi}){
    super();
    this.builderApi = builderApi;
    this.selectInput = new AcSelectInputElement();
    this.setOptions();
    this.builderApi.hooks.subscribe({hook:AcEnumBuilderHook.ScriptFunctionChange,callback:()=>{
      this.setOptions();
    }});
  }

  async setOptions(){
    if(this.builderApi.scriptEditor && this.builderApi.component.className){
      const functions = await this.builderApi.scriptEditor.helper.getFunctionsInClass({className:this.builderApi.component.className});
      this.selectInput.selectOptions = functions;
      console.log(functions);
    }
  }

}

acRegisterCustomElement({tag:'ac-builder-event-select-input',type:AcEventSelectInput});
