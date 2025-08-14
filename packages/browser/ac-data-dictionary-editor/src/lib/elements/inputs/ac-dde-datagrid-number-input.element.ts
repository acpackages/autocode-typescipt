/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, AcNumberInput, IAcDatagridCellEditorElement } from '@autocode-ts/ac-browser';
export class AcDDEDatagridNumberInput implements IAcDatagridCellEditorElement{

  numberInput:AcNumberInput = new AcNumberInput();

  destroy(): void {
    this.numberInput.destroy();
  }

  focus(): void {
    this.numberInput.element.focus();
  }

  getElement(): HTMLElement {
    return this.numberInput.element;
  }

  getValue() {
    return this.numberInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.numberInput.init();
    this.numberInput.value = args.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.numberInput.value = args.datagridCell.cellValue;
  }

}
