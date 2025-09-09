/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcInputCssClassName } from "../consts/ac-input-css-class-name.const";
import { AcInputElement } from "./ac-input-element.element";

export class AcOptionInputElement extends AcInputElement {
  static override get observedAttributes() {
    return [... super.observedAttributes, 'is-array','checked','label-element','value-checked','value-unchecked'];
  }

  get isArray(): boolean {
    return this.getAttribute('is-array') == 'true';
  }
  set isArray(value: boolean) {
    this.setAttribute('is-array',`${value}`)
  }


  get checked(): boolean {
    return this.getAttribute('checked') == 'true';
  }
  set checked(value: boolean) {
    const currentChecked = this.checked;
    if (currentChecked != value) {
      this.inputElement.checked = value;
      if (value) {
        this.value = this.valueChecked;
        this.setAttribute('checked','true');
        this.inputElement.setAttribute('checked','true');
      }
      else if (!value) {
        this.value = this.valueUnchecked;
        this.removeAttribute('checked');
        this.inputElement.removeAttribute('checked');
      }
    }
  }

  private _labelElements:HTMLElement[] = [];
  get labelElement(): string | null {
    return this.getAttribute('label-element');
  }
  set labelElement(value: HTMLElement|string) {
    if(this._labelElements.length > 0){
      for(const labelElement of this._labelElements){
        labelElement.removeEventListener('click',this.handleLabelClick);
      }
    }
    const elements:HTMLElement[] = [];
    if(typeof value =='string' ){
      for(const element of Array.from(document.querySelectorAll(value))){
        elements.push(element as HTMLElement);
      }
    }
    else{
      elements.push(value);
    }
    for(const label of elements){
      label.addEventListener('click',this.handleLabelClick);
      this._labelElements.push(label);
    }
  }

  get valueChecked(): any {
    let result;
    if(this.hasAttribute('value-checked')){
      result = JSON.parse(this.getAttribute('value-checked')!);
    }
    return result;
  }
  set valueChecked(value: any) {
    this.setAttribute('value-checked',JSON.stringify(value));
  }

  get valueUnchecked(): any {
    let result;
    if(this.hasAttribute('value-unchecked')){
      result = JSON.parse(this.getAttribute('value-unchecked')!);
    }
    return result;
  }
  set valueUnchecked(value: any) {
    this.setAttribute('value-unchecked',JSON.stringify(value));
  }

  constructor() {
    super();
    acAddClassToElement({class_:AcInputCssClassName.acOptionInput,element:this});
    this.type = AcEnumInputType.Checkbox;
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
    this.inputElement.addEventListener('change', () => {
      this.checked = this.inputElement.checked;
    });
  }

  handleLabelClick(event:any){
    this.checked = !this.checked;
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'is-array') {
      this.isArray = newValue;
    }
    else if (name == 'label-element') {
      this.labelElement = newValue;
    }
    else if (name == 'checked') {
      this.checked = newValue;
    }
    else if (name == 'value-checked') {
      this.valueChecked = newValue;
    }
    else if (name == 'value-unchecked') {
      this.valueUnchecked = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
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

  // protected override setValueFromReactiveValueProxy() {
  //   if (this.bindKey && this.bindToReactiveValueProxy) {
  //     const currentValues = this.bindToReactiveValueProxy.valueProxy[this.bindKey];
  //     if (currentValues.includes(this.valueWhenChecked)) {
  //       this.checked = true;
  //     }
  //     else if (currentValues.includes(this.valueWhenUnchecked)) {
  //       this.checked = false;
  //     }
  //     this.bindToReactiveValueProxy.on(AcEnumReactiveValueProxyEvent.Change, (args: IAcReactiveValueProxyEvent) => {
  //       if (args.property == this.bindKey) {
  //         if ((this.valueWhenChecked && !this.checked && args.value.includes(this.valueWhenChecked))||(this.valueWhenUnchecked && !this.checked && !args.value.includes(this.valueWhenUnchecked))) {
  //           this.checked = true;
  //         }
  //         else if ((this.checked && this.valueWhenUnchecked && args.value.includes(this.valueWhenUnchecked))||(this.checked && this.valueWhenChecked && !args.value.includes(this.valueWhenChecked))) {
  //           this.checked = false;
  //         }
  //       }
  //     });
  //   }
  // }

  override setValue(value: any): void {
    const object = this;
    if (this.checked) {
      this._value = this.valueChecked;
    }
    else {
      this._value = this.valueUnchecked;
    }
    // if (this.bindKey && this.bindToReactiveValueProxy) {
    //   this.updateReactiveProxyValue(this.checked);
    // }
  }

  // updateReactiveProxyValue(isChecked: boolean, triggerEvent: boolean = true) {
  //   const object = this;
  //   if (this.bindToReactiveValueProxy) {
  //     if(object.isArray){
  //       let valueArray = this.bindToReactiveValueProxy.valueProxy[this.bindKey];
  //       let valueModified: boolean = false;
  //       if (!Array.isArray(valueArray)) {
  //         valueArray = [];
  //         valueModified = true;
  //       }
  //       if (isChecked) {
  //         if (this.valueWhenUnchecked && valueArray.includes(object.valueWhenUnchecked)) {
  //           arrayRemove(valueArray, object.valueWhenUnchecked);
  //           valueModified = true;
  //         }
  //         if (this.valueWhenChecked && !valueArray.includes(object.valueWhenChecked)) {
  //           valueArray.push(object.valueWhenChecked);
  //           valueModified = true;
  //         }
  //       }
  //       else {
  //         if (this.valueWhenChecked && valueArray.includes(object.valueWhenChecked)) {
  //           arrayRemove(valueArray, object.valueWhenChecked);
  //           valueModified = true;
  //         }
  //         if (this.valueWhenUnchecked && Autocode.validValue(object.valueWhenUnchecked)) {
  //           if (this.valueWhenUnchecked && !valueArray.includes(object.valueWhenUnchecked)) {
  //             valueArray.push(object.valueWhenUnchecked);
  //             valueModified = true;
  //           }
  //         }
  //       }
  //       if (valueModified) {
  //         this.bindToReactiveValueProxy.valueProxy[this.bindKey] = valueArray;
  //       }
  //     }
  //     else{
  //       if(isChecked){
  //         if(this.valueWhenChecked && this.bindToReactiveValueProxy.value[this.bindKey] != this.valueWhenChecked){
  //           this.bindToReactiveValueProxy.value[this.bindKey] = this.valueWhenChecked;
  //         }
  //       }
  //       else{
  //         if(this.valueWhenUnchecked && this.bindToReactiveValueProxy.value[this.bindKey] != this.valueWhenUnchecked){
  //           this.bindToReactiveValueProxy.value[this.bindKey] = this.valueWhenUnchecked;
  //         }
  //       }
  //     }

  //   }
  // }
}

customElements.define('ac-option-input', AcOptionInputElement);
