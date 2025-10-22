/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { AcContext, AcContextRegistry, AcEnumContextEvent } from "@autocode-ts/ac-template-engine";
import { acRegisterCustomElement, acWrapElementWithTag } from "../../../utils/ac-element-functions";

export class AcForm extends HTMLElement {
  static get observedAttributes() {
    return ['ac-context'];
  }

  private _acContext?: AcContext | any;
  get acContext(): AcContext | undefined {
    return this._acContext;
  }
  set acContext(value: AcContext) {
    this._acContext = value;
    if (value) this.setAttribute('ac-context', value.__acContextName__);
    this.syncInputsWithContext();
  }

  isWrapped: boolean = false;
  form!: HTMLFormElement | any;
  private inputContextListeners: Map<HTMLElement, any> = new Map();

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    switch (name) {
      case 'ac-context':
        if (AcContextRegistry.exists({ name: newValue })) {
          this.acContext = AcContextRegistry.get({ name: newValue })!;
        }
        break;
    }
  }

  connectedCallback(): void {
    if (!this.isWrapped) {
      this.isWrapped = true;
      const object = this;
      if (this.isConnected && this.parentNode) {
        const parent: HTMLElement = this.parentElement!;
        if (parent.tagName.toLowerCase() === 'form') {
          this.form = parent;
        }
      }
      if (this.form == undefined || this.form == null) {
        this.form = acWrapElementWithTag({ element: this, wrapperTag: 'form' }) as HTMLFormElement;
      }
      this.form.style.display = 'contents';
      this.form.submitted = false;
      this.form.noValidate = true;
      this.form.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        object.form.submitted = true;
        if (this.validateAll()) {
          object.dispatchEvent(new Event('submit'));
        }
      });
      this.form.addEventListener('invalid', () => {
        this.form.submitted = true;
      });
      this.form.addEventListener("reset", (event: any) => {
        object.dispatchEvent(new Event('reset'));
      });
    }

  }

  disconnectedCallback(): void {
    if (this.form) {
      this.form.remove();
    }
  }

  private getInputElements(): any[] {
    return Array.from(this.querySelectorAll(`[name]`)).filter((el) => {
      const style = window.getComputedStyle(el);
      if ((el as HTMLInputElement).disabled) return false;
      if (style.display === 'none' || style.visibility === 'hidden') return false;
      return true;
    });
  }

  private handleSubmit(event: Event) {
    event.preventDefault();
    this.form.submitted = true;
    this.form.noValidate = true;
    this.form.removeEventListener('submit', this.handleSubmit);
    this.form.submit();
    this.dispatchEvent(new Event('submit', {
      bubbles: true,
      composed: true,
    }));
  }

  reset(): void {
    this.form.reset();
  }

  private syncInputsWithContext() {
    const inputs = this.getInputElements();
    for (const input of inputs) {
      const name = input.getAttribute('name');
      if (!name) continue;
      if (this._acContext && this._acContext[name] != null) {
        (input as any).value = this._acContext[name];
      }
      if (!this.inputContextListeners.has(input) && this._acContext) {
        const listener = (args: any) => {
          if (args.property === name) (input as any).value = args.value;
        };
        this._acContext.on(AcEnumContextEvent.Change, listener);
        this.inputContextListeners.set(input, listener);
      }
    }
  }

  submit(): void {
    this.form.requestSubmit();
  }

  validateAll() {
    const inputs = this.getInputElements();
    let isValid = true;
    for (const el of inputs) {
      if (typeof el.checkValidity === 'function') {
        if (!el.checkValidity()) {
          if (isValid) {
            el.focus();
          }
          if (typeof el.reportValidity === 'function') {
            el.reportValidity();
          }
          isValid = false;
        }
      }
    }
    return isValid;
  }

  valuesFromJsonObject(values: any) {
    for (const input of this.getInputElements()) {
      const key = input.getAttribute('name') ?? '';
      if (values[key] != null) (input as any).value = values[key];
    }
  }

  valuesToJsonObject(): any {
    const result: any = {};
    for (const input of this.getInputElements()) {
      const key = input.getAttribute('name') ?? '';
      if (key && (input as any).value != null) result[key] = (input as any).value;
    }
    return result;
  }
}

acRegisterCustomElement({ tag: "ac-form", type: AcForm });
