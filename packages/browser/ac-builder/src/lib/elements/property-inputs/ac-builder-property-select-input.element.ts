import { acRegisterCustomElement, AcSelectInput } from "@autocode-ts/ac-browser";
import { AcBuilderPropertyInput } from "../../core/ac-builder-property-input";
import { stringIsJson } from "@autocode-ts/ac-extensions";

export class AcBuilderPropertySelectInput extends AcBuilderPropertyInput {

  static override get observedAttributes() {
    return [... super.observedAttributes, 'label-key', 'value-key', 'select-options'];
  }

  get labelKey(): string {
    return this.inputElement.labelKey;;
  }
  set labelKey(value: string) {
    this.inputElement.labelKey = value;
  }

  get valueKey(): string {
    return this.inputElement.valueKey;
  }
  set valueKey(value: string) {
    this.inputElement.valueKey = value;
  }

  get selectOptions(): any[] { return this.inputElement.selectOptions; }
  set selectOptions(value: any[]) {
    this.inputElement.selectOptions = value;
  }

  override get value() { return this.inputElement.value; }
  override set value(val: any) {
    this.inputElement.value = val;
    this.setValue(val);
  }

  override inputElement: any = new AcSelectInput();

  override attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    if (name == 'label-key') {
      this.labelKey = newValue;
    }
    else if (name == 'value-key') {
      this.valueKey = newValue;
    }
    else if (name == 'select-options') {
      if (stringIsJson(newValue)) {
        this.selectOptions = newValue;
      }
      else {
        this.selectOptions = newValue.split(",");
      }
    }
    else {
      super.attributeChangedCallback(name, oldValue, newValue);
    }
  }
}

acRegisterCustomElement({tag:'ac-builder-property-select-input',type:AcBuilderPropertySelectInput});
