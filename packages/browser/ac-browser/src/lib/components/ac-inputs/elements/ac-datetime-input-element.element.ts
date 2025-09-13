/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { AcInputElement } from "./ac-input-element.element";

export class AcDatetimeInputElement extends AcInputElement{
  static override get observedAttributes() {
    return [... super.observedAttributes, 'type','min','max'];
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

  constructor(){
    super();
    this.type = AcEnumInputType.DatetimeLocal;
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
}

customElements.define('ac-datetime-input', AcDatetimeInputElement);
