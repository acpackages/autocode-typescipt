/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AC_INPUT_TAG } from "../consts/ac-input-tags.const";
import { AcInputBase } from "../core/ac-input-base";

export class AcInputElement extends AcInputBase {
  static override get observedAttributes() {
    return [... super.observedAttributes, 'type'];
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

  constructor() {
    super();
    this.type = 'text';
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'type') {
      this.type = newValue;
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }
}

acRegisterCustomElement({tag:AC_INPUT_TAG.input,type:AcInputElement});
