import { AcInputBase, AcSelectInput } from "@autocode-ts/ac-browser";
import { AcBuilderApi } from "../../core/ac-builder-api";
import { AcEnumBuilderHook } from "../../enums/ac-enum-builder-hook.enum";

export class AcEventSelectInput extends AcInputBase{
  builderApi:AcBuilderApi;
  override element:HTMLElement;
  private selectInput:AcSelectInput;

  override get value(): any {
    return this.selectInput.value;
  }
  override set value(value: any) {
    console.log(value);
    this.selectInput.value = value;
    this.setValue(value);
  }

  constructor({builderApi}:{builderApi:AcBuilderApi}){
    super();
    this.builderApi = builderApi;
    this.selectInput = new AcSelectInput();
    this.element = this.selectInput.element;
    this.selectInput.init();
    this.setOptions();
    this.builderApi.hooks.subscribe({hook:AcEnumBuilderHook.ScriptFunctionChange,callback:()=>{
      this.setOptions();
    }});
    console.log(this);
  }

  async setOptions(){
    if(this.builderApi.scriptEditor && this.builderApi.page.scriptClassName){
      const functions = await this.builderApi.scriptEditor.helper.getFunctionsInClass({className:this.builderApi.page.scriptClassName});
      this.selectInput.selectOptions = functions;
    }
  }

}
