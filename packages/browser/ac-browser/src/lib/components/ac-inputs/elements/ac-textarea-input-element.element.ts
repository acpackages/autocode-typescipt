/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { AcInputBase } from "../core/ac-input-base";

export class AcTextareaInputElement extends AcInputBase {
  static override get observedAttributes() {
    return [... super.observedAttributes, 'minlength', 'maxlength', 'cols', 'rows'];
  }

  get cols(): number | null {
    let result: number = 0;
    if (this.hasAttribute('cols')) {
      result = parseInt(this.getAttribute('cols')!);
    }
    return result;
  }
  set cols(value: number) {
    if (value > 0) {
      this.setAttribute('cols', `${value}`);
      this.inputElement.setAttribute('cols', `${value}`);
    }
    else {
      this.removeAttribute('cols');
      this.inputElement.removeAttribute('cols');
    }
  }

  get minLength(): number | null {
    let result: number = 0;
    if (this.hasAttribute('minlength')) {
      result = parseInt(this.getAttribute('minlength')!);
    }
    return result;
  }
  set minLength(value: number) {
    if (value > 0) {
      this.setAttribute('minlength', `${value}`);
      this.inputElement.setAttribute('minlength', `${value}`);
    }
    else {
      this.removeAttribute('minlength');
      this.inputElement.removeAttribute('minlength');
    }
  }

  get maxLength(): number {
    let result: number = 0;
    if (this.hasAttribute('maxlength')) {
      result = parseInt(this.getAttribute('maxlength')!);
    }
    return result;
  }
  set maxLength(value: number) {
    if (value > 0) {
      this.setAttribute('maxlength', `${value}`);
      this.inputElement.setAttribute('maxlength', `${value}`);
    }
    else {
      this.removeAttribute('maxlength');
      this.inputElement.removeAttribute('maxlength');
    }
  }

  get rows(): number {
    let result: number = 0;
    if (this.hasAttribute('rows')) {
      result = parseInt(this.getAttribute('rows')!);
    }
    return result;
  }
  set rows(value: number) {
    if (value > 0) {
      this.setAttribute('rows', `${value}`);
      this.inputElement.setAttribute('rows', `${value}`);
    }
    else {
      this.removeAttribute('rows');
      this.inputElement.removeAttribute('rows');
    }
  }

  override inputElement: HTMLTextAreaElement = document.createElement('textarea');

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'cols') {
      this.cols = newValue;
    }
    else if (name == 'minlength') {
      this.minLength = newValue;
    }
    else if (name == 'maxlength') {
      this.maxLength = newValue;
    }
    else if (name == 'rows') {
      this.rows = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }
}

acRegisterCustomElement({tag:AC_INPUT_TAG.textareaInput,type:AcTextareaInputElement});
