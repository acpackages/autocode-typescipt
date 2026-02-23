/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, IAcDatagridCellEditor, AcPopoutTextareaInputElement } from '@autocode-ts/ac-browser';
export class AcDDEDatagridPopoutTextareaInput implements IAcDatagridCellEditor{
  textareaInput:AcPopoutTextareaInputElement = new AcPopoutTextareaInputElement();

  destroy(): void {
    // this.textareaInput.destroy();
  }

  focus(): void {
    this.textareaInput.focus();
  }

  getElement(): HTMLElement {
    return this.textareaInput;
  }

  getValue() {
    return this.textareaInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.textareaInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textareaInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

}
