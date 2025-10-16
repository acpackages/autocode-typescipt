/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, IAcDatagridCellEditorElement, AcNumberInput } from '@autocode-ts/ac-browser';
export class AcDDEDatagridNumberInput implements IAcDatagridCellEditorElement{

  numberInput:AcNumberInput = new AcNumberInput();

  destroy(): void {
    // this.numberInput;
  }

  focus(): void {
    this.numberInput.focus();
  }

  getElement(): HTMLElement {
    return this.numberInput;
  }

  getValue() {
    return this.numberInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.numberInput.value = args.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.numberInput.value = args.datagridCell.cellValue;
  }

}
