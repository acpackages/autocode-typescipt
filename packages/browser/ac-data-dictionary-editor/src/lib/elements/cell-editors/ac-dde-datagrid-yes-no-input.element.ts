/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, AcOptionInput, acAddClassToElement, IAcDatagridCellEditor } from '@autocode-ts/ac-browser';
export class AcDDEDatagridYesNoInput implements IAcDatagridCellEditor {
  element: HTMLElement = document.createElement('div');
  input: HTMLInputElement;

  constructor() {
    this.element.innerHTML = `
    <label class="switch">
  <input type="checkbox">
  <span class="slider round"></span>
</label>`;
    this.input = this.element.querySelector('[type=checkbox]') as HTMLInputElement;
  }

  destroy?(): void {
    // this.optionInput.destroy();
  }

  focus(): void {
    this.input.focus();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getValue() {
    return this.input.checked;
  }

  init(args: IAcDatagridCellElementArgs): void {
    // this.element.append(this.optionInput);
    acAddClassToElement({ class_: 'ac-option-input-wrap', element: this.element });
    // this.optionInput.init();
    this.input.checked = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.input.checked = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

}
