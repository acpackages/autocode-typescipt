/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { AcInputElement } from "./ac-input-element.element";

export class AcNumberInputElement extends AcInputElement{

  protected _minValue: number = 0;
  get minValue():number{
    return this._minValue;
  }
  set minValue(value:number){
    this._minValue = value;
    if(value > 0){
      this.element.setAttribute('min',`${value}`);
    }
    else{
      this.element.removeAttribute('min');
    }
  }

  protected _maxValue: number = 0;
  get maxValue():number{
    return this._maxValue;
  }
  set maxValue(value:number){
    this._maxValue = value;
    if(value > 0){
      this.element.setAttribute('max',`${value}`);
    }
    else{
      this.element.removeAttribute('max');
    }
  }

  protected _step: number = 0;
  get step():number{
    return this._step;
  }
  set step(value:number){
    this._step = value;
    if(value > 0){
      this.element.setAttribute('step',`${value}`);
    }
    else{
      this.element.removeAttribute('step');
    }
  }

  override init(): void {
    if(this.type == ''){
      this.type = AcEnumInputType.Number;
    }
    super.init();
  }

  override element: HTMLInputElement = document.createElement('input');
}
