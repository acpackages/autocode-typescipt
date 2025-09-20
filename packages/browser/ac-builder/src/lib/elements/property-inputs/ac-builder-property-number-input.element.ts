/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderPropertyInput } from "../../core/ac-builder-property-input";

export class AcBuilderPropertyNumberInput extends AcBuilderPropertyInput{

  static override get observedAttributes() {
    return [... super.observedAttributes, 'min','max','step','type'];
  }

  get min():number{
    let result:number = 0;
    if(this.hasAttribute("min")){
      result = parseInt(this.getAttribute('min')!);
    }
    return result;
  }
  set min(value:number){
    if(value > 0){
      this.setAttribute('min',`${value}`);
      this.inputElement.setAttribute('min',`${value}`);
    }
    else{
      this.removeAttribute('min');
      this.inputElement.removeAttribute('min');
    }
  }

  get max():number{
    let result:number = 0;
    if(this.hasAttribute("max")){
      result = parseInt(this.getAttribute('max')!);
    }
    return result;
  }
  set max(value:number){
    if(value > 0){
      this.setAttribute('max',`${value}`);
      this.inputElement.setAttribute('max',`${value}`);
    }
    else{
      this.removeAttribute('max');
      this.inputElement.removeAttribute('max');
    }
  }

  get step():number{
    let result:number = 0;
    if(this.hasAttribute("step")){
      result = parseInt(this.getAttribute('step')!);
    }
    return result;
  }

  set step(value:number){
    if(value > 0){
      this.setAttribute('step',`${value}`);
      this.inputElement.setAttribute('step',`${value}`);
    }
    else{
      this.removeAttribute('step');
      this.inputElement.removeAttribute('step');
    }
  }

  get type(): string {
    return this.getAttribute('type')!;
  }
  set type(value: string) {
    if (value == '') {
      value = 'text';
    }
    this.setAttribute('type', value);
    this.inputElement.setAttribute('type', value);
  }

  constructor() {
    super();
    this.type = 'number';
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
    else if (name == 'step') {
      this.step = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }

}

acRegisterCustomElement({tag:'ac-builder-property-number-input',type:AcBuilderPropertyNumberInput});
