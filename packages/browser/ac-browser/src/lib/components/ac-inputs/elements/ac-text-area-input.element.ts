/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";
import { AcInputBase } from "../core/ac-input-base";
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";

export class AcTextAreaInput extends AcInputBase{
  protected _type:string = AcEnumInputType.Textarea;

  protected _cols: number = 0;
  get cols():number{
    return this._cols;
  }
  set cols(value:number){
    this._cols = value;
    if(value > 0){
      this.element.setAttribute('cols',`${value}`);
    }
    else{
      this.element.removeAttribute('cols');
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

  protected _rows: number = 0;
  get rows():number{
    return this._rows;
  }
  set rows(value:number){
    this._rows = value;
    if(value > 0){
      this.element.setAttribute('rows',`${value}`);
    }
    else{
      this.element.removeAttribute('rows');
    }
  }

  override element: HTMLTextAreaElement = document.createElement('textarea');

  override init(): void {
    super.init();
    acAddClassToElement({cssClass:AcInputCssClassName.acTextAreaInput,element:this.element});
  }
}
