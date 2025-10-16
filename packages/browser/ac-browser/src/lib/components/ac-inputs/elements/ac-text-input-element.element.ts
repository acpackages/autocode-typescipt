/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { AcEnumInputType } from "../enums/ac-enum-input-type.enum";
import { AcInput } from "./ac-input-element.element";

export class AcTextInput extends AcInput{
  static override get observedAttributes() {
    return [... super.observedAttributes, 'minlength', 'maxlength','pattern'];
  }

  override get inputReflectedAttributes(){
    return [... super.inputReflectedAttributes,'minlength', 'maxlength','pattern'];
  }

  get minLength():number|null{
    let result:number = 0;
    if(this.hasAttribute('minlength')){
      result = parseInt(this.getAttribute('minlength')!);
    }
    return result;
  }
  set minLength(value:number){
    if(value > 0){
      this.setAttribute('minlength',`${value}`);
      this.inputElement.setAttribute('minlength',`${value}`);
    }
    else{
      this.removeAttribute('minlength');
      this.inputElement.removeAttribute('minlength');
    }
  }

  get maxLength():number{
    let result:number = 0;
    if(this.hasAttribute('maxlength')){
      result = parseInt(this.getAttribute('maxlength')!);
    }
    return result;
  }
  set maxLength(value:number){
    if(value > 0){
      this.setAttribute('maxlength',`${value}`);
      this.inputElement.setAttribute('maxlength',`${value}`);
    }
    else{
      this.removeAttribute('maxlength');
      this.inputElement.removeAttribute('maxlength');
    }
  }

  get pattern():string|null{
    return this.getAttribute('pattern');
  }
  set pattern(value:string){
    if(value != ''){
      this.setAttribute('pattern',`${value}`);
      this.inputElement.setAttribute('pattern',`${value}`);
    }
    else{
      this.removeAttribute('pattern');
      this.inputElement.removeAttribute('pattern');
    }
  }

  constructor(){
    super();
    this.type = AcEnumInputType.Text;
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'minlength') {
      this.minLength = newValue;
    }
    else if (name == 'maxlength') {
      this.maxLength = newValue;
    }
    else if (name == 'pattern') {
      this.pattern = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }

}

acRegisterCustomElement({tag:AC_INPUT_TAG.textInput,type:AcTextInput});
