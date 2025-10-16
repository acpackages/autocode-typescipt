/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, AcOptionInput, acAddClassToElement, IAcDatagridCellEditorElement } from '@autocode-ts/ac-browser';
export class AcDDEDatagridYesNoInput implements IAcDatagridCellEditorElement{
  optionInput:AcOptionInput = new AcOptionInput();
  element:HTMLElement = document.createElement('div');

  destroy?(): void {
    // this.optionInput.destroy();
  }

  focus(): void {
    this.optionInput.focus();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  getValue() {
    return this.optionInput.checked;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.element.append(this.optionInput);
    acAddClassToElement({class_:'ac-option-input-wrap',element:this.element});
    // this.optionInput.init();
    this.optionInput.checked = args.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.optionInput.checked = args.datagridCell.cellValue;
  }

}
