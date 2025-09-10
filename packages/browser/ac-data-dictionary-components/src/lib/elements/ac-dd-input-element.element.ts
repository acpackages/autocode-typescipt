import { AcInputBase } from "@autocode-ts/ac-browser";
import { AcDDInputManager } from "../core/ac-dd-input-manager";
import { AcDataDictionary, AcDDTableColumn } from "@autocode-ts/ac-data-dictionary";

export class AcDDInputElement extends AcInputBase {
  get columnName(): string {
    return this.getAttribute('column-name') ?? '';
  }
  set columnName(value: string) {
    this.setAttribute('column-name', value);
    this.setDDTableColumn();
  }

  get tableName(): string {
    return this.getAttribute('table-name') ?? '';
  }
  set tableName(value: string) {
    this.setAttribute('table-name', value);
    this.setDDTableColumn();
  }

  ddTableColumn?: AcDDTableColumn;

  constructor() {
    super();
  }

  override connectedCallback(): void {
    this.innerHTML = "ACDDInputElement";
    this.setDDTableColumn();
  }

  private setDDTableColumn() {
    if (this.tableName && this.columnName) {
      const column = AcDataDictionary.getTableColumn({ tableName: this.tableName, columnName: this.columnName });
      if (column) {
        this.ddTableColumn = column;
      }
      const inputDefinition = AcDDInputManager.getColumnInputDefinition({ tableName: this.tableName, columnName: this.columnName });
      this.inputElement = new inputDefinition.inputClass();
      if (inputDefinition.defaultProperties) {
        for (const key in inputDefinition.defaultProperties) {
          this.inputElement[key] = inputDefinition.defaultProperties[key];
          console.log(key);
        }
      }
      this.innerHTML = "";
      this.append(this.inputElement);
    }
  }
}

customElements.define('ac-dd-input', AcDDInputElement);
