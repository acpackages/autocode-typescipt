import { AcTextareaInput } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";

export class AcDDEViewMaster{
  element:HTMLElement = document.createElement('div');
  queryInput:AcTextareaInput;
  constructor({ editorApi }: { editorApi: AcDDEApi }) {
    this.element.style.display = 'contents';
    this.element.innerHTML = `
    <div class="card card-body p-2">
      <div class="form-group">
        <label>View Query</label>
        <ac-textarea-input class="form-control query-input" rows="12"></ac-textarea-input>
      </div>
    </div>
    `;
    this.queryInput = this.element.querySelector('.query-input') as AcTextareaInput;
  }
}
