import { AcTextareaInputElement } from "@autocode-ts/ac-browser";
import { AcDDEAttributeName, AcDDECssClassName } from "../../_ac-data-dictionary-editor.export";
import { AcDDEApi } from "../../core/ac-dde-api";

export class AcDDETriggerMaster {
  element: HTMLElement = document.createElement('div');
  queryInput:AcTextareaInputElement;
  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.element.classList.add(AcDDECssClassName.acDDEMasterContainer);
    this.element.innerHTML = `
    <div class="form-group" style="height:100%">
        <label>Trigger Query</label>
        <div style="height:calc(100% - 25px);">
        <ac-textarea-input class="form-control query-input" rows="12"></ac-textarea-input>
        </div>
      </div>
    `;
    this.queryInput = this.element.querySelector('.query-input') as AcTextareaInputElement;
  }
}
