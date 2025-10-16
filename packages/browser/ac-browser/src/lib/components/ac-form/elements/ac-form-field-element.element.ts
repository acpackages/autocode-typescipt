import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcFormFieldErrorMessage } from "./ac-form-field-error-element.element";

export class AcFormField extends HTMLElement {
  private inputElement?: HTMLInputElement | any;
  private mutationObserver: MutationObserver;
  private inputListener: (() => void) | null = null;

  constructor() {
    super();
    this.style.display = 'contents';
    this.mutationObserver = new MutationObserver(() => this.bindInput());
  }

  connectedCallback(): void {
    this.bindInput();
    this.mutationObserver.observe(this, { childList: true, subtree: true });
  }

  disconnectedCallback(): void {
    this.mutationObserver.disconnect();
  }

  private bindInput() {
    const input = this.querySelector(
      `[name]`
    );
    if (input === this.inputElement) return;
    this.unbindInput();
    if (input) {
      this.inputElement = input;
      const listener = () => this.updateState();
      input.addEventListener('input', listener);
      input.addEventListener('change', listener);
      input.addEventListener('blur', listener);
      input.setAttribute('novalidate', 'true');
      input.addEventListener('invalid', (e) => { e.preventDefault(); listener(); }, true);
      this.inputListener = listener;

      this.updateState();
    }
  }

  private unbindInput() {
    if (this.inputElement && this.inputListener) {
      this.inputElement.removeEventListener('input', this.inputListener);
      this.inputElement.removeEventListener('change', this.inputListener);
      this.inputElement.removeEventListener('blur', this.inputListener);
    }
    this.inputElement = undefined;
    this.inputListener = null;
  }

  private updateState() {
    if (!this.inputElement) return;
    if ((this.inputElement as any).form && this.inputElement.form.submitted) {
      const isValid = (this.inputElement as any).validity.valid;
      const hasError = !isValid;
      this.setAttribute('is-valid', `${isValid}`);
      const errorMessages: AcFormFieldErrorMessage[] = Array.from(this.querySelectorAll('ac-form-field-error-message'));
      for (const msg of errorMessages) {
        if (hasError) {
          const error: string = this.inputElement.validationMessage;
          msg.innerHTML = error;
          msg.style.display = 'block';
        }
        else {
          msg.innerHTML = '';
          msg.style.display = 'none';
        }
      }
    }

  }
}

acRegisterCustomElement({ tag: "ac-form-field", type: AcFormField });
