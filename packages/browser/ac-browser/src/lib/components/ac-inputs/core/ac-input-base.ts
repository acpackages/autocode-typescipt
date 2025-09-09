/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { acAddClassToElement } from "../../../utils/ac-element-functions";
import { AcEnumInputEvent } from "../enums/ac-enum-input-event.enum";
import { IAcInputValueChangeEvent } from "../interfaces/ac-input-value-change-event.interface";

export class AcInputBase extends HTMLElement {
  static get observedAttributes() {
    return ['class', 'value', 'placeholder', 'disabled', 'readonly', 'name', 'style'];
  }

  get class_(): string | null {
    return this.getAttribute('class');
  }
  set class_(value: string) {
    acAddClassToElement({ class_: value, element: this });
  }

  get disabled(): boolean {
    return this.getAttribute('disabled') == 'true';
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', "true");
      this.inputElement.setAttribute('disabled', "true");
    }
    else {
      this.removeAttribute('disabled');
      this.inputElement.removeAttribute('disabled');
    }
  }

  get name(): string | null {
    return this.getAttribute('name');
  }
  set name(value: string) {
    if (value != '') {
      this.setAttribute('name', value);
    }
    else {
      this.removeAttribute(value);
    }
  }

  get placeholder(): string | null {
    return this.getAttribute('placeholder');
  }
  set placeholder(value: string) {
    if (value != '') {
      this.setAttribute('placeholder', value);
      this.inputElement.setAttribute('placeholder', value);
    }
    else {
      this.removeAttribute(value);
      this.inputElement.removeAttribute(value);
    }
  }

  get readonly(): boolean {
    return this.getAttribute('readonly') == 'true';
  }
  set readonly(value: boolean) {
    if (value) {
      this.setAttribute('readonly', "true");
      this.inputElement.setAttribute('readonly', "true");
    }
    else {
      this.removeAttribute('readonly');
      this.inputElement.removeAttribute('readonly');
    }
  }

  protected _value: any;
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this.setValue(value);
  }

  events: AcEvents = new AcEvents();
  inputElement: HTMLElement = document.createElement('input');

  constructor() {
    super();
    this.style.display = 'contents';
    this.append(this.inputElement);
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    switch (name) {
      case 'value':
        this.value = newValue;
        break;
      case 'placeholder':
        this.placeholder = newValue;
        break;
      case 'disabled':
        this.disabled = newValue == 'true';
        break;
      case 'class':
        this.class_ = newValue;
        break;
      case 'readonly':
        this.readonly = newValue == 'true';
        break;
      case 'name':
        this.name = newValue;
        break;
    }
  }

  connectedCallback() {
    this.upgradeProperty('value');
    this.upgradeProperty('placeholder');
    this.upgradeProperty('disabled');
    this.upgradeProperty('name');

    this.inputElement.addEventListener('input', this.handleInput);
    this.inputElement.addEventListener('change', this.handleChange);

    const inputElement:HTMLInputElement = this.inputElement as HTMLInputElement;

    if (this.hasAttribute('value')) inputElement.value = this.value;
    if (this.hasAttribute('placeholder')) inputElement.placeholder = this.placeholder!;
    if (this.hasAttribute('disabled')) inputElement.disabled = true;
    if (this.hasAttribute('name')) inputElement.name = this.name!;
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener('input', this.handleInput);
    this.inputElement.removeEventListener('change', this.handleChange);
  }

  handleChange(e:any) {
    const inputElement:HTMLInputElement = this.inputElement as HTMLInputElement;
    const newValue = inputElement.value;
    this.setAttribute('value', newValue);
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: newValue },
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  handleInput(e: any) {
    const inputElement:HTMLInputElement = this.inputElement as HTMLInputElement;
    const newValue = inputElement.value;
    this.setAttribute('value', newValue);
  }

  setValue(value: any) {
    const oldValue: any = this._value;
    if (oldValue != value) {
      this._value = value;
      const inputElement:HTMLInputElement = this.inputElement as HTMLInputElement;
      inputElement.value = value;
      this.dispatchEvent(new CustomEvent('valuechange', {
        detail: { value: value },
        bubbles: true,
        composed: true
      }));
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const eventArgs: IAcInputValueChangeEvent = {
        oldValue: oldValue,
        value: this.value,
        instance: this
      };
      this.events.execute({ event: AcEnumInputEvent.ValueChange, args: eventArgs });
      this.events.execute({ event: AcEnumInputEvent.Input, args: eventArgs });
      // this.setValueToReactiveValueProxy();
    }
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      const instance:any = this;
      const val = instance[prop];
      delete instance[prop];
      instance[prop] = val;
    }
  }




}
