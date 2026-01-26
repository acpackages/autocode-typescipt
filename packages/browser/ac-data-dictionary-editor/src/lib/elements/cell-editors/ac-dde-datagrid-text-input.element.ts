/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs, AcTextInput, IAcDatagridCellEditor } from '@autocode-ts/ac-browser';
export class AcDDEDatagridTextInput implements IAcDatagridCellEditor{
  textInput:AcTextInput = new AcTextInput();

  destroy(): void {
    this.textInput.destroy();
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
    this.textInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

}
