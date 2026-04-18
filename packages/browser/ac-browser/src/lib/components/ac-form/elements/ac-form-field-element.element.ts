/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcFormFieldErrorMessage } from "./ac-form-field-error-element.element";

export class AcFormField extends AcElementBase {
  private inputElement?: HTMLInputElement | any;
  private invalidListener: ((e: any) => void) | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this.style.display = 'contents';
    this.observeMutationManaged(this, { childList: true, subtree: true }, () => this.bindInput());
    this.bindInput();
  }

  private bindInput() {
    let foundInput:boolean = false;
    const input = this.querySelector(`[name]`) as HTMLElement;
    if(input){
      if (input == this.inputElement) return;
    }
    this.unbindInput();
    if (input) {
      foundInput = true;
      this.inputElement = input;
      this.inputListener = () => this.updateState();
      this.invalidListener = (e: any) => {
        e.preventDefault();
        this.updateState();
      };

      this.addEventListenerManaged(input, 'input', this.inputListener);
      this.addEventListenerManaged(input, 'change', this.inputListener);
      this.addEventListenerManaged(input, 'blur', this.inputListener);
      this.addEventListenerManaged(input, 'invalid', this.invalidListener, true);
      
      input.setAttribute('novalidate', 'true');
      this.updateState();
    }
    if(!foundInput){
      this.delayedCallback.add({callback:() => {
        this.bindInput();
      }, duration:50});
    }
  }

  private unbindInput() {
    if (this.inputElement) {
      if (this.inputListener) {
        this.removeEventListenerManaged(this.inputElement, 'input', this.inputListener);
        this.removeEventListenerManaged(this.inputElement, 'change', this.inputListener);
        this.removeEventListenerManaged(this.inputElement, 'blur', this.inputListener);
      }
      if (this.invalidListener) {
        this.removeEventListenerManaged(this.inputElement, 'invalid', this.invalidListener, true);
      }
    }
    this.inputElement = undefined;
    this.inputListener = null;
    this.invalidListener = null;
  }

  updateState() {
    if (!this.inputElement) return;
    if ((this.inputElement as any).form && this.inputElement.form.submitted) {
      const validity = (this.inputElement as any).validity;
      const isValid = validity.valid;
      const hasError = !isValid;
      const name = this.inputElement.getAttribute('name');
      this.setAttribute('is-valid', `${isValid}`);
      const errorMessages: AcFormFieldErrorMessage[] = Array.from(this.querySelectorAll('ac-form-field-error-message'));
      for (const msg of errorMessages) {
        if (hasError) {
          const error: string = this.inputElement.validationMessage;
          msg.setError({message:error});
        }
        else {
          msg.setError({show:false});
        }
      }
    }

  }
}

acRegisterCustomElement({ tag: "ac-form-field", type: AcFormField });
