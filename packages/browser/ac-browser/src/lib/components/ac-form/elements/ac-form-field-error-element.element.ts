import { acRegisterCustomElement } from "../../../utils/ac-element-functions";

export class AcFormFieldErrorMessage extends HTMLElement {
  private _message = "";
  get message(): string {
    return this._message;
  }
  set message(value: string) {
    if (this._message != value) {
      this._message = value;
      console.log(value);
      this.innerHTML = value;
      this.innerText = value;
      if (value) {
        this.style.display = "";
      }
      else {
        this.style.display = "none";
      }
    }
  }

  constructor() {
    super();
    this.style.display = 'none';
  }

}

acRegisterCustomElement({ tag: "ac-form-field-error-message", type: AcFormFieldErrorMessage });
