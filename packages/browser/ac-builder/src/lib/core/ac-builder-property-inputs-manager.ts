/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBuilderPropertyInput } from "./ac-builder-property-input";
import { AcBuilderPropertyTextInput } from "../elements/property-inputs/ac-builder-property-text-input.element";
import { IAcBuilderPropertyInputType } from "../interfaces/ac-builder-property-input-type.interface";
import { AcBuilderPropertyNumberInput } from "../elements/property-inputs/ac-builder-property-number-input.element";
import { AcBuilderPropertySelectInput } from "../elements/property-inputs/ac-builder-property-select-input.element";

export class AcBuilderPropertyInputsManager {
  private static builtInInputsRegistered:boolean = false;
  private static inputs: Record<string, IAcBuilderPropertyInputType> = {};

  static getInput({type}:{type:string}):IAcBuilderPropertyInputType|undefined {
    return this.inputs[type];
  }

  static getInputs():IAcBuilderPropertyInputType[] {
    return Object.values(this.inputs);
  }

  static hasType({type}:{type:string}):boolean {
    return this.inputs[type] != undefined;
  }

  static init(){
    this.registerBuiltInExtensions();
  }

  static register<T extends AcBuilderPropertyInput>({input}:{input: IAcBuilderPropertyInputType<T>}): void {
    this.inputs[input.type] = input;
  }

  static registerBuiltInExtensions(){
    if(!this.builtInInputsRegistered){
      this.register({input:{inputClass:AcBuilderPropertyTextInput,type:'string'}});
      this.register({input:{inputClass:AcBuilderPropertyNumberInput,type:'number'}});
      this.register({input:{inputClass:AcBuilderPropertySelectInput,type:'select'}});
      this.register({input:{inputClass:AcBuilderPropertySelectInput,type:'boolean',properties:{selectOptions:[{'label':'True','value':true},{'label':'False','value':false}]}}});
      this.builtInInputsRegistered = true;
    }
  }
}

