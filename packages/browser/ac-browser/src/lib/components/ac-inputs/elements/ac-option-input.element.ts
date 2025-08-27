/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { arrayRemove } from "@autocode-ts/ac-extensions";
import { Autocode } from "@autocode-ts/autocode";
import { AcInputBase } from "../core/ac-input-base";
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { AcEnumReactiveValueProxyEvent, IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";

export class AcOptionInput extends AcInputBase {
  private _isArray: boolean = false;
  get isArray(): boolean {
    return this._isArray;
  }
  set isArray(value: boolean) {
    this._isArray = value;
  }

  private _checked: boolean = false;
  get checked(): boolean {
    return this._checked;
  }
  set checked(value: boolean) {
    if (this._checked != value) {
      this._checked = value;
      this.element.checked = value;
      if (value) {
        this.value = this.valueWhenChecked;
      }
      else if (!value) {
        this.value = this.valueWhenUnchecked;
      }
    }
  }

  private _labelElement: HTMLElement | undefined;
  get labelElement(): HTMLElement | undefined {
    return this._labelElement;
  }
  set labelElement(value: HTMLElement) {
    this._labelElement = value;
    this._labelElement.addEventListener('click', (event: MouseEvent) => {
      this.checked = !this._checked;
    })
  }

  protected _type: AcEnumInputType.Checkbox | AcEnumInputType.Radio = AcEnumInputType.Checkbox;
  get type(): AcEnumInputType.Checkbox | AcEnumInputType.Radio {
    return this._type;
  }
  set type(value: AcEnumInputType.Checkbox | AcEnumInputType.Radio) {
    this._type = value;
    this.element.setAttribute('type', value);
  }

  private _valueWhenChecked: any;
  get valueWhenChecked(): any {
    return this._valueWhenChecked;
  }
  set valueWhenChecked(value: any) {
    this._valueWhenChecked = value;
  }

  private _valueWhenUnchecked: any;
  get valueWhenUnchecked(): any {
    return this._valueWhenUnchecked;
  }
  set valueWhenUnchecked(value: any) {
    this._valueWhenUnchecked = value;
  }

  override element: HTMLInputElement = document.createElement('input');

  constructor() {
    super();
    acAddClassToElement({cssClass:AcInputCssClassName.acOptionInput,element:this.element});
    if (this.isArray == undefined || this.isArray == null) {
      if (this.type == AcEnumInputType.Checkbox) {
        this.isArray = true;
      }
      else {
        this.isArray = false;
      }
    }
    if (this.isArray == undefined) {
      this.isArray = false;
    }
    this.element.setAttribute('type', this.type);
    this.element.addEventListener('change', () => {
      this.checked = this.element.checked;
    });
  }

  setIsChecked(): void {
    const object = this;
    if (object.isArray) {
      if (Array.isArray(object.value) && object.value.includes(object.value)) {
        object.checked = true;
      }
      else {
        object.checked = false;
      }
    }
    else {
      if (object.value == object.value) {
        object.checked = true;
      }
      else {
        object.checked = false;
      }
    }
  }

  protected override setValueFromReactiveValueProxy() {
    if (this.bindKey && this.bindToReactiveValueProxy) {
      const currentValues = this.bindToReactiveValueProxy.valueProxy[this.bindKey];
      if (currentValues.includes(this.valueWhenChecked)) {
        this.checked = true;
      }
      else if (currentValues.includes(this.valueWhenUnchecked)) {
        this.checked = false;
      }
      this.bindToReactiveValueProxy.on(AcEnumReactiveValueProxyEvent.Change, (args: IAcReactiveValueProxyEvent) => {
        if (args.property == this.bindKey) {
          if ((this.valueWhenChecked && !this.checked && args.value.includes(this.valueWhenChecked))||(this.valueWhenUnchecked && !this.checked && !args.value.includes(this.valueWhenUnchecked))) {
            this.checked = true;
          }
          else if ((this.checked && this.valueWhenUnchecked && args.value.includes(this.valueWhenUnchecked))||(this.checked && this.valueWhenChecked && !args.value.includes(this.valueWhenChecked))) {
            this.checked = false;
          }
        }
      });
    }
  }

  override setValue(value: any): void {
    const object = this;
    if (this.checked) {
      this._value = this.valueWhenChecked;
    }
    else {
      this._value = this.valueWhenUnchecked;
    }
    if (this.bindKey && this.bindToReactiveValueProxy) {
      this.updateReactiveProxyValue(this.checked);
    }
  }

  updateReactiveProxyValue(isChecked: boolean, triggerEvent: boolean = true) {
    const object = this;
    if (this.bindToReactiveValueProxy) {
      if(object.isArray){
        let valueArray = this.bindToReactiveValueProxy.valueProxy[this.bindKey];
        let valueModified: boolean = false;
        if (!Array.isArray(valueArray)) {
          valueArray = [];
          valueModified = true;
        }
        if (isChecked) {
          if (this.valueWhenUnchecked && valueArray.includes(object.valueWhenUnchecked)) {
            arrayRemove(valueArray, object.valueWhenUnchecked);
            valueModified = true;
          }
          if (this.valueWhenChecked && !valueArray.includes(object.valueWhenChecked)) {
            valueArray.push(object.valueWhenChecked);
            valueModified = true;
          }
        }
        else {
          if (this.valueWhenChecked && valueArray.includes(object.valueWhenChecked)) {
            arrayRemove(valueArray, object.valueWhenChecked);
            valueModified = true;
          }
          if (this.valueWhenUnchecked && Autocode.validValue(object.valueWhenUnchecked)) {
            if (this.valueWhenUnchecked && !valueArray.includes(object.valueWhenUnchecked)) {
              valueArray.push(object.valueWhenUnchecked);
              valueModified = true;
            }
          }
        }
        if (valueModified) {
          this.bindToReactiveValueProxy.valueProxy[this.bindKey] = valueArray;
        }
      }
      else{
        if(isChecked){
          if(this.valueWhenChecked && this.bindToReactiveValueProxy.value[this.bindKey] != this.valueWhenChecked){
            this.bindToReactiveValueProxy.value[this.bindKey] = this.valueWhenChecked;
          }
        }
        else{
          if(this.valueWhenUnchecked && this.bindToReactiveValueProxy.value[this.bindKey] != this.valueWhenUnchecked){
            this.bindToReactiveValueProxy.value[this.bindKey] = this.valueWhenUnchecked;
          }
        }
      }

    }
  }
}
