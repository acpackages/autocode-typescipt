/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, AcTextInput, IAcDatagridCellEditorElement } from '@autocode-ts/ac-browser';
export class AcDDEDatagridTextInput implements IAcDatagridCellEditorElement{
  textInput:AcTextInput = new AcTextInput();

  destroy(): void {
    this.textInput.destroy();
  }

  focus(): void {
    this.textInput.element.focus();
  }

  getElement(): HTMLElement {
    return this.textInput.element;
  }

  getValue() {
    return this.textInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.textInput.init();
    this.textInput.value = args.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textInput.value = args.datagridCell.cellValue;
  }

}
