/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderPropertyInput } from "../../core/ac-builder-property-input";

export class AcBuilderPropertyTextInput extends AcBuilderPropertyInput {
  static override get observedAttributes() {
    return [... super.observedAttributes, 'minlength', 'maxlength', 'pattern', 'type'];
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

  override inputElement: HTMLInputElement = document.createElement('input');

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

  get pattern(): string | null {
    return this.getAttribute('pattern');
  }
  set pattern(value: string) {
    if (value != '') {
      this.setAttribute('pattern', `${value}`);
      this.inputElement.setAttribute('pattern', `${value}`);
    }
    else {
      this.removeAttribute('pattern');
      this.inputElement.removeAttribute('pattern');
    }
  }

  constructor() {
    super();
    this.type = 'text';
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
    else if (name == 'type') {
      this.type = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }
}

acRegisterCustomElement({tag:'ac-builder-property-text-input',type:AcBuilderPropertyTextInput});
