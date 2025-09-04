/* eslint-disable @typescript-eslint/no-inferrable-types */
import { DateTime } from "luxon";
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { AcInput } from "./ac-input.element";
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";

export class AcDateTimeInput extends AcInput{
  protected override _type: AcEnumInputType.DatetimeLocal | AcEnumInputType.Date | AcEnumInputType.Time | AcEnumInputType.Month | AcEnumInputType.Week = AcEnumInputType.DatetimeLocal;
  override get type():AcEnumInputType.DatetimeLocal | AcEnumInputType.Date | AcEnumInputType.Time | AcEnumInputType.Month | AcEnumInputType.Week{
    return this._type;
  }
  override set type(value:AcEnumInputType.DatetimeLocal | AcEnumInputType.Date | AcEnumInputType.Time | AcEnumInputType.Month | AcEnumInputType.Week){
    this._type = value;
    this.element.setAttribute('type',value);
  }

  protected _minValue?: DateTime;
  get minValue():DateTime|undefined{
    return this._minValue;
  }
  set minValue(value:DateTime){
    this._minValue = value;
    if(value){
      this.element.setAttribute('min',`${value}`);
    }
    else{
      this.element.removeAttribute('min');
    }
  }

  protected _maxValue?: DateTime;
  get maxValue():DateTime|undefined{
    return this._maxValue;
  }
  set maxValue(value:DateTime){
    this._maxValue = value;
    if(value){
      this.element.setAttribute('max',`${value}`);
    }
    else{
      this.element.removeAttribute('max');
    }
  }

  override element: HTMLInputElement = document.createElement('input');

  override init(): void {
    this.type = this._type;
    super.init();
    acAddClassToElement({class_:AcInputCssClassName.acDatetimeInput,element:this.element});
  }
}
