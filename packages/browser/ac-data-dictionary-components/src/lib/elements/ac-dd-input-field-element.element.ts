/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcInputBase } from "@autocode-ts/ac-browser";
import { AcDDInputElement } from "./ac-dd-input-element.element";
import { AcDDInputFieldBaseElement } from "./ac-dd-input-field-base-element.element";
import { AcDDInputManager } from "../core/ac-dd-input-manager";
import { AcDDTableColumn } from "@autocode-ts/ac-data-dictionary";

export class AcDDInputFieldElement extends AcInputBase {
  get columnName(): string {
    return this.getAttribute('column-name') ?? '';
  }
  set columnName(value: string) {
    this.setAttribute('column-name', value);
    this.setDDInput();
  }

  get tableName(): string {
    return this.getAttribute('table-name') ?? '';
  }
  set tableName(value: string) {
    this.setAttribute('table-name', value);
    this.setDDInput();
  }

  override inputElement = document.createElement('div');
  ddInput:AcDDInputElement = new AcDDInputElement();
  ddInputField:AcDDInputFieldBaseElement;
  ddTableColumn!:AcDDTableColumn;

  constructor() {
    super();
    this.ddInputField = new AcDDInputManager.inputFieldElementClass();
    this.ddInputField.ddInputFieldElement = this;
  }

  override connectedCallback(): void {
    this.setDDInput();
    this.append(this.ddInputField);
    this.ddInputField.ddInput = this.ddInput;
  }

  private setDDInput() {
    if (this.tableName && this.columnName) {
      this.ddInput.tableName = this.tableName;
      this.ddInput.columnName = this.columnName;
      this.ddTableColumn = this.ddInput.ddTableColumn!;
      this.ddInputField.ddInputLabel = this.ddTableColumn.getColumnTitle();
      const container = this.querySelector('ac-dd-input-container');
      if(container){
        container.innerHTML = '';
        container.append(this.ddInput);
      }
    }
  }
}

customElements.define('ac-dd-input-field', AcDDInputFieldElement);
