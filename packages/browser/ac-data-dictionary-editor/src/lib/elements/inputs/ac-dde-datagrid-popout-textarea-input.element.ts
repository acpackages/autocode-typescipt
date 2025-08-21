/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, IAcDatagridCellEditorElement, AcPopoutTextareaInput } from '@autocode-ts/ac-browser';
export class AcDDEDatagridPopoutTextareaInput implements IAcDatagridCellEditorElement{
  textareaInput:AcPopoutTextareaInput = new AcPopoutTextareaInput();

  destroy(): void {
    this.textareaInput.destroy();
  }

  focus(): void {
    this.textareaInput.focus();
  }

  getElement(): HTMLElement {
    return this.textareaInput.element;
  }

  getValue() {
    return this.textareaInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.textareaInput.init();
    this.textareaInput.value = args.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textareaInput.value = args.datagridCell.cellValue;
  }

}
