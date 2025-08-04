/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcInputBase } from "../core/ac-input-base";

export class AcInputElement extends AcInputBase{
  protected _type:string = '';
  get type():string{
    return this._type;
  }
  set type(value:string){
    this._type = value;
    if(value!=''){
      this.element.setAttribute('type',value);
    }
    else{
      this.element.removeAttribute(value);
    }
  }

  override element: HTMLInputElement = document.createElement('input');
}
