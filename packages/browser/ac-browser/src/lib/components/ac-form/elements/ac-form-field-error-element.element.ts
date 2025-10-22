import { AcElementBase } from "../../../core/ac-element-base";
import { acRegisterCustomElement } from "../../../utils/ac-element-functions";

export class AcFormFieldErrorMessage extends AcElementBase {
  private originalMessageHtml = "";

  override connectedCallback(): void {
    this.style.display = "none";
    this.originalMessageHtml = this.innerHTML;
  }

  setError({message,show = true}:{message?:string,show?:boolean}){
    if(show){
      this.style.display = "block";
      if(this.originalMessageHtml){
        this.innerHTML = this.originalMessageHtml;
      }
      else{
        this.innerHTML = message ?? "";
      }
    }
    else{
      this.style.display = "none";
    }

  }

}

acRegisterCustomElement({ tag: "ac-form-field-error-message", type: AcFormFieldErrorMessage });
