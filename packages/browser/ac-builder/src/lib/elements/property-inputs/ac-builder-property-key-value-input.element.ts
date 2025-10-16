/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcArrayValuesInput, AcModal, acRegisterCustomElement } from "@autocode-ts/ac-browser";
import { AcBuilderPropertyInput } from "../../core/ac-builder-property-input";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";

export class AcBuilderPropertyKeyValueInput extends AcBuilderPropertyInput {
  arrayValuesElement:AcArrayValuesInput = new AcArrayValuesInput();
  override inputElement: HTMLInputElement = document.createElement('input');
  modal:AcModal = new AcModal();
  override get value(): any {
    return this.arrayValuesElement.value;
  }
  override set value(value: any) {
    this.arrayValuesElement.value = value;
  }

  private _labelKey = 'key';
  get labelKey(): string {
    return this._labelKey;
  }
  set labelKey(value: string) {
    this._labelKey = value;
  }

  private _valueKey = 'value';
  get valueKey(): string {
    return this._valueKey;
  }
  set valueKey(value: string) {
    this._valueKey = value;
  }

  constructor() {
    super();
    this.inputElement.value = '0 Properties Set';
    this.arrayValuesElement.innerHTML = `
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th></th>
        </tr>
      </thead>
      <tbody ac-array-values-items>
        <tr >
          <td class="p-0">
            <input class="form-control" ac-array-values-item-input ac-array-value-item-key="${this.labelKey}"/>
          </td>
          <td class="p-0">
              <input class="form-control" ac-array-values-item-input ac-array-value-item-key="${this.valueKey}"/>
          </td>
          <td class="p-0">
              <button type="button" class="btn pt-2 text-danger" ac-array-values-item-remove><ac-svg-icon>${ACI_SVG_SOLID.trash}</ac-svg-icon></button>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="3" class="pt-0">
              <button type="button" class="btn btn-danger mt-2 py-1" ac-array-values-item-add><ac-svg-icon>${ACI_SVG_SOLID.plus}</ac-svg-icon> Add New</button>
          </td>
        </tr>
      </tfoot>
    </table>
    `;
    this.arrayValuesElement.addEventListener('change',()=>{
      this.events.execute({'event':'change'});
      this.inputElement.value = `${this.value.length} Properties Set`;
    });
    this.modal.append(this.arrayValuesElement);
    this.modal.addEventListener("close",()=>{
      this.modal.remove();
    });
    this.inputElement.addEventListener('click',()=>{
      document.body.append(this.modal);
      this.modal.open();
    });

  }

}

acRegisterCustomElement({tag:'ac-builder-property-key-value-input',type:AcBuilderPropertyKeyValueInput});
