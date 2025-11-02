/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcInputBase, acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcDDInputElement } from "./ac-dd-input-element.element";
import { AcDDInputFieldBaseElement } from "./ac-dd-input-field-base-element.element";
import { AcDDInputManager } from "../core/ac-dd-input-manager";
import { AcDDTableColumn } from "@autocode-ts/ac-data-dictionary";
import { AcContext } from "@autocode-ts/ac-template-engine";

export class AcDDInputFieldElement extends AcInputBase {
  static override get observedAttributes() {
    return [...super.observedAttributes, 'column-name', 'input-name', 'label', 'table-name'];
  }

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
    return super.acContextKey ?? "";
  }
  override set acContextKey(value: string) {
    super.acContextKey = value;
    this.setDDInput();
  }

  override get disabled(): boolean {
    return super.disabled;
  }
  override set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', "true");
    }
    else {
      this.removeAttribute('disabled');
    }
    this.ddInput.disabled = this.disabled;
  }

  private _inputProperties: any = {};
  get inputProperties(): any {
    return this._inputProperties;
  }
  set inputProperties(value: any) {
    this._inputProperties = value;
    this.setDDInput();
  }

  override get readonly(): boolean {
    return super.readonly;
  }
  override set readonly(value: boolean) {
    if (value) {
      this.setAttribute('readonly', "true");
    }
    else {
      this.removeAttribute('readonly');
    }
    this.ddInput.readonly = value;
  }

  override get required(): boolean {
    return super.required;
  }
  override set required(value: boolean) {
    if (value) {
      this.setAttribute('required', "true");
    }
    else {
      this.removeAttribute('required');
    }
    this.ddInput.required = value;
  }

  override get value(): any {
    return this.ddInput.value;
  }
  override set value(value: any) {
    this.ddInput.value = value;
    super.value = value;
  }

  override get validityStateFlags(): { valid: boolean; flags: Partial<ValidityState>; message: string; } {
    return this.ddInput.validityStateFlags;
  }

  containerElement = document.createElement('div');
  ddInput: AcDDInputElement = new AcDDInputElement();
  ddInputField: AcDDInputFieldBaseElement;
  ddTableColumn!: AcDDTableColumn;

  constructor() {
    super();
    this.inputElement = this.ddInput;
    this.ddInputField = new AcDDInputManager.inputFieldElementClass();
    this.ddInputField.ddInputFieldElement = this;
    this.ddInput.on({event:'change',callback:()=>{
      this.value = this.ddInput.value;
    }});
    this.ddInput.on({event:'inputElementSet',callback:(args:any)=>{
      this.events.execute({event:'inputElementSet',args});
    }});
  }

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    switch (name) {
      case 'column-name':
        this.columnName = newValue;
        break;
      case 'input-name':
        this.inputName = newValue;
        break;
      case 'label':
        this.label = newValue;
        break;
      case 'table-name':
        this.tableName = newValue;
        break;
      default:
        super.attributeChangedCallback(name, oldValue, newValue);
        break;
    }
  }

  override connectedCallback(): void {
    super.connectedCallback();
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
      if (this.ddInput && this.ddInput.ddTableColumn) {
        this.ddTableColumn = this.ddInput.ddTableColumn!;
        this.ddInputField.ddInputLabel = this.ddTableColumn.getColumnTitle();
      }
      if (this.label) {
        this.ddInputField.ddInputLabel = this.label;
      }
      if(this.ddInput){
        this.required = this.ddInput.required;
      }
      this.events.execute({ event: 'ddInputSet' });
      const container = this.querySelector('ac-dd-input-container');
      if (container) {
        container.innerHTML = '';
        container.append(this.ddInput);
      }
    }
  }
}

acRegisterCustomElement({ tag: 'ac-dd-input-field', type: AcDDInputFieldElement });
