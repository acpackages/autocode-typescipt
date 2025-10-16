/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, AcTextInput, IAcDatagridCellEditorElement } from '@autocode-ts/ac-browser';
export class AcDDEDatagridTextInput implements IAcDatagridCellEditorElement{
  textInput:AcTextInput = new AcTextInput();

  destroy(): void {
    // this.textInput.destroy();
  }

  focus(): void {
    this.textInput.focus();
  }

  getElement(): HTMLElement {
    return this.textInput;
  }

  getValue() {
    return this.textInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.textInput.value = args.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textInput.value = args.datagridCell.cellValue;
  }

}
