/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcInputBase, acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcDDInputElement } from "./ac-dd-input-element.element";
import { AcDDInputFieldBaseElement } from "./ac-dd-input-field-base-element.element";
import { AcDDInputManager } from "../core/ac-dd-input-manager";
import { AcDDTableColumn } from "@autocode-ts/ac-data-dictionary";
import { AcContext } from "@autocode-ts/ac-template-engine";

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

  get inputName(): string {
    return this.getAttribute('input-name') ?? '';
  }
  set inputName(value: string) {
    this.setAttribute('input-name', value);
    this.setDDInput();
  }

  get label(): string {
    return this.getAttribute('label') ?? '';
  }
  set label(value: string) {
    this.setAttribute('label', value);
    this.setDDInput();
  }

  override get acContext(): AcContext {
    return super.acContext;
  }
  override set acContext(value: AcContext) {
    super.acContext = value;
    this.setDDInput();
  }

  override get acContextKey(): string {
    return super.acContextKey??"";
  }
  override set acContextKey(value: string) {
    super.acContextKey = value;
    this.setDDInput();
  }

  private _inputProperties:any = {};
  get inputProperties(): any {
    return this._inputProperties;
  }
  set inputProperties(value: any) {
    this._inputProperties = value;
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
    if ((this.tableName && this.columnName) || this.inputName) {
      this.ddInput.tableName = this.tableName;
      this.ddInput.columnName = this.columnName;
      this.ddInput.inputName = this.inputName;
      this.ddInput.acContext = this.acContext;
      this.ddInput.acContextKey = this.acContextKey;
      if(this.ddInput && this.ddInput.ddTableColumn){
        this.ddTableColumn = this.ddInput.ddTableColumn!;
        this.ddInputField.ddInputLabel = this.ddTableColumn.getColumnTitle();
      }
      if(this.label){
        this.ddInputField.ddInputLabel = this.label;
      }
      this.events.execute({event:'ddInputSet'});
      const container = this.querySelector('ac-dd-input-container');
      if(container){
        container.innerHTML = '';
        container.append(this.ddInput);
      }
    }
  }
}

acRegisterCustomElement({tag:'ac-dd-input-field',type:AcDDInputFieldElement});
