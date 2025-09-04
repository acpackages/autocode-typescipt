/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { AcInput } from "./ac-input.element";

export class AcTextInput extends AcInput{
  protected override _type: string = AcEnumInputType.Text;
  override get type():string{
    return this._type;
  }
  override set type(value:string){
    this._type = value;
    if(value!=''){
      this.element.setAttribute('type',value);
    }
    else{
      this.element.removeAttribute(value);
    }
  }

  protected _minLength: number = 0;
  get minLength():number{
    return this._minLength;
  }
  set minLength(value:number){
    this._minLength = value;
    if(value > 0){
      this.element.setAttribute('minlength',`${value}`);
    }
    else{
      this.element.removeAttribute('minlength');
    }
  }

  protected _maxLength: number = 0;
  get maxLength():number{
    return this._maxLength;
  }
  set maxLength(value:number){
    this._maxLength = value;
    if(value > 0){
      this.element.setAttribute('maxlength',`${value}`);
    }
    else{
      this.element.removeAttribute('maxlength');
    }
  }

  protected _pattern: string = '';
  get pattern():string{
    return this._pattern;
  }
  set pattern(value:string){
    this._pattern = value;
    if(value != ''){
      this.element.setAttribute('pattern',`${value}`);
    }
    else{
      this.element.removeAttribute('pattern');
    }
  }

  override element: HTMLInputElement = document.createElement('input');

  override init(): void {
    if(this.type == ''){
      this.type = AcEnumInputType.Text;
    }
    super.init();
    acAddClassToElement({class_:AcInputCssClassName.acTextInput,element:this.element});
  }
}
