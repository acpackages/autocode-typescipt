/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { AcInputElement } from "./ac-input-element.element";

export class AcNumberInput extends AcInputElement {

  static override get observedAttributes() {
    return [... super.observedAttributes, 'min', 'max', 'step'];
  }

  override get inputReflectedAttributes() {
    return [... super.inputReflectedAttributes, 'min', 'max', 'step'];
  }

  get min(): number {
    let result: number = 0;
    if (this.hasAttribute("min")) {
      result = parseInt(this.getAttribute('min')!);
    }
    return result;
  }
  set min(value: number) {
    if (value > 0) {
      this.setAttribute('min', `${value}`);
      this.inputElement.setAttribute('min', `${value}`);
    }
    else {
      this.removeAttribute('min');
      this.inputElement.removeAttribute('min');
    }
  }


  get max(): number {
    let result: number = 0;
    if (this.hasAttribute("max")) {
      result = parseInt(this.getAttribute('max')!);
    }
    return result;
  }
  set max(value: number) {
    if (value > 0) {
      this.setAttribute('max', `${value}`);
      this.inputElement.setAttribute('max', `${value}`);
    }
    else {
      this.removeAttribute('max');
      this.inputElement.removeAttribute('max');
    }
  }

  get step(): number {
    let result: number = 0;
    if (this.hasAttribute("step")) {
      result = parseInt(this.getAttribute('step')!);
    }
    return result;
  }

  set step(value: number) {
    if (value > 0) {
      this.setAttribute('step', `${value}`);
      this.inputElement.setAttribute('step', `${value}`);
    }
    else {
      this.removeAttribute('step');
      this.inputElement.removeAttribute('step');
    }
  }

  override init() {
    if(!this.hasAttribute('type')){
      this.type = 'number';
    }
    super.init();
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'min') {
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

acRegisterCustomElement({ tag: AC_INPUT_TAG.numberInput, type: AcNumberInput });
