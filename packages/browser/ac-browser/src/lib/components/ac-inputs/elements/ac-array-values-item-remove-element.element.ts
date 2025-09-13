import { AC_INPUT_ATTRIBUTE_NAME } from "../_ac-inputs.export";
import { AcInputBase } from "../core/ac-input-base";
import { AC_TEMPLATE_ENGINE_ATTRIBUTE, AcTemplateEngine } from "@autocode-ts/ac-template-engine";

export class AcArrayValuesItemRemoveElement extends HTMLElement{
  constructor(){
    super();
    this.style.display = 'contents';
  }
}
customElements.define('ac-array-values-item-remove', AcArrayValuesItemRemoveElement);
