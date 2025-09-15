/* eslint-disable @typescript-eslint/no-inferrable-types */

import { AC_INPUT_TAG } from "@autocode-ts/ac-browser";
import { IAcBuilderInput } from "../interfaces/ac-builder-input.interface";

export class AcBuilderInputsManager {
  private static builtInInputsRegistered:boolean = false;
  private static inputs: Record<string, IAcBuilderInput> = {};

  static getInput({type}:{type:string}):IAcBuilderInput|undefined {
    return this.inputs[type];
  }

  static getInputs():IAcBuilderInput[] {
    return Object.values(this.inputs);
  }

  static hasType({type}:{type:string}):boolean {
    return this.inputs[type] != undefined;
  }

  static init(){
    this.registerBuiltInExtensions();
  }

  static register({input}:{input: IAcBuilderInput}): void {
    if (this.inputs[input.type]) {
      console.warn(`Input ${input.type} is already registered. Overwriting.`);
    }
    this.inputs[input.type] = input;
  }

  static registerBuiltInExtensions(){
    if(!this.builtInInputsRegistered){
      this.register({input:{tag:AC_INPUT_TAG.textInput,type:'string'}});
      this.register({input:{tag:AC_INPUT_TAG.numberInput,type:'number'}});
      this.register({input:{tag:AC_INPUT_TAG.selectInput,type:'select'}});
      this.register({input:{tag:AC_INPUT_TAG.selectInput,type:'boolean',properties:{selectOptions:[{'label':'True','value':true},{'label':'False','value':false}]}}});
      this.builtInInputsRegistered = true;
    }
  }
}
