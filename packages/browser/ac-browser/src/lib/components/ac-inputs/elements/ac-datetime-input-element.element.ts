/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { AcInput } from "./ac-input-element.element";

export class AcDatetimeInput extends AcInput{
  static override get observedAttributes() {
    return [... super.observedAttributes, 'type','min','max'];
  }

  override get inputReflectedAttributes(){
    return [... super.inputReflectedAttributes,'type','min', 'max'];
  }

  override get type():string{
    return this.getAttribute('type')!;
  }
  override set type(value:AcEnumInputType.DatetimeLocal | AcEnumInputType.Date | AcEnumInputType.Time | AcEnumInputType.Month | AcEnumInputType.Week){
    this.setAttribute('type',value);
    this.inputElement.setAttribute('type',value);
  }

  get min():any{
    return this.getAttribute('min');
  }
  set min(value:any){
    if(value){
      this.setAttribute('min',`${value}`);
      this.inputElement.setAttribute('min',`${value}`);
    }
    else{
      this.removeAttribute('min');
      this.inputElement.removeAttribute('min');
    }
  }

  get max():any|undefined{
    return this.getAttribute('max');
  }
  set max(value:any){
    if(value){
      this.setAttribute('max',`${value}`);
      this.inputElement.setAttribute('max',`${value}`);
    }
    else{
      this.removeAttribute('max');
      this.inputElement.removeAttribute('max');
    }
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'type') {
      this.type = newValue;
    }
    else if (name == 'min') {
      this.min = newValue;
    }
    else if (name == 'max') {
      this.max = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }

  override init(): void {
    if(!this.hasAttribute("type")){
      this.type = AcEnumInputType.DatetimeLocal;
    }
    super.init();
  }
}

acRegisterCustomElement({tag:AC_INPUT_TAG.dateTimeInput,type:AcDatetimeInput});
