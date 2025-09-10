import { AC_INPUT_ATTRIBUTE_NAME } from "../_ac-inputs.export";
import { AcInputBase } from "../core/ac-input-base";
import { AC_TEMPLATE_ENGINE_ATTRIBUTE, AcContext, AcTemplateEngine } from "@autocode-ts/ac-template-engine";

export class AcArrayValuesItemsElement extends HTMLElement{
  _start!:Comment;
  _end!:Comment;
  constructor(){
    super();
    this._start = document.createComment("ac-if start");
    this._end = document.createComment("ac-if end");
  }

   connectedCallback() {
    // Insert markers before this element
    this.parentNode!.insertBefore(this._start, this);
    this.parentNode!.insertBefore(this._end, this.nextSibling);

    // Move children between markers
    while (this.firstChild) {
      this._end.parentNode!.insertBefore(this.firstChild, this._end);
    }

    // Remove the custom element itself
    this.remove();
  }

  disconnectedCallback() {
    // When removed, also remove everything between start/end
    let node = this._start.nextSibling;
    while (node && node !== this._end) {
      const next = node.nextSibling;
      node.remove();
      node = next;
    }
    this._start.remove();
    this._end.remove();
  }


}

customElements.define('ac-array-values-items', AcArrayValuesItemsElement);
