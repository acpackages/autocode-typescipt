import { AcInputBase, acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcDDInputManager } from "../core/ac-dd-input-manager";
import { AcDataDictionary, AcDDTableColumn } from "@autocode-ts/ac-data-dictionary";
import { IAcDDInputDefinition } from "../interfaces/ac-dd-input-definition.interface";

export class AcDDInputElement extends AcInputBase {
  static override get observedAttributes() {
    return [...super.observedAttributes, 'column-name', 'input-name', 'table-name'];
  }

  get columnName(): string {
    return this.getAttribute('column-name') ?? '';
  }
  set columnName(value: string) {
    this.setAttribute('column-name', value);
    this.setInputElement();
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
    this.inputElement.disabled = this.disabled;
  }

  get inputName(): string {
    return this.getAttribute('input-name') ?? '';
  }
  set inputName(value: string) {
    this.setAttribute('input-name', value);
    this.setInputElement();
  }

  private _inputProperties: any = {};
  get inputProperties(): any {
    return this._inputProperties;
  }
  set inputProperties(value: any) {
    this._inputProperties = value;
    this.setInputElement();
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
    this.inputElement.readonly = this.readonly;
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
    this.inputElement.required = value;
  }

  get tableName(): string {
    return this.getAttribute('table-name') ?? '';
  }
  set tableName(value: string) {
    this.setAttribute('table-name', value);
    this.setInputElement();
  }

  override get validity() {
    if(this.inputElement){
      return this.inputElement.validity;
    }
    return {valid:true};
  }

  override get validationMessage() {
    if(this.inputElement){
      return this.inputElement.validationMessage;
    }
    return '';
  }

  override get validityStateFlags(): { valid: boolean; flags: Partial<ValidityState>; message: string; } {
    return this.inputElement.validityStateFlags;
  }

  ddTableColumn?: AcDDTableColumn;

  constructor() {
    super();
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
      case 'table-name':
        this.tableName = newValue;
        break;
      default:
        super.attributeChangedCallback(name, oldValue, newValue);
        break;
    }
  }

  override connectedCallback(): void {
    this.innerHTML = "ACDDInputElement";
    this.setInputElement();
  }

  private setInputElement() {
    if ((this.tableName && this.columnName) || this.inputName) {
      let inputDefinition: IAcDDInputDefinition | undefined;
      if (this.tableName && this.columnName) {
        const column = AcDataDictionary.getTableColumn({ tableName: this.tableName, columnName: this.columnName });
        if (column) {
          this.ddTableColumn = column;
        }
        inputDefinition = AcDDInputManager.getColumnInputDefinition({ tableName: this.tableName, columnName: this.columnName });
      }
      if (this.inputName) {
        inputDefinition = AcDDInputManager.getInputDefinition({ name: this.inputName });
      }
      if (inputDefinition) {
        this.inputElement = new inputDefinition.inputElement();
        if (inputDefinition.defaultProperties) {
          for (const key in inputDefinition.defaultProperties) {
            this.inputElement[key] = inputDefinition.defaultProperties[key];
          }
        }
        if(this.ddTableColumn){
          if(this.ddTableColumn.isRequired()){
            this.setAttribute('required',`true`);
          }
        }
        this.innerHTML = "";
        this.append(this.inputElement);
        this.inputElement.addEventListener('input', ()=>{
          this.value = this.inputElement.value;
        });
        this.inputElement.addEventListener('change', ()=>{
          this.value = this.inputElement.value;
        });
        if(this.value){
          this.inputElement.value = this.value;
        }
        const event = new CustomEvent('inputElementSet',{detail:{inputElement:this.inputElement}});
        this.dispatchEvent(event);
      }
    }
  }


}

acRegisterCustomElement({ tag: 'ac-dd-input', type: AcDDInputElement });
