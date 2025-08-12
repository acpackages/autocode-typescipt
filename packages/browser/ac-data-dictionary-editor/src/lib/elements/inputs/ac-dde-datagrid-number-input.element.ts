/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellRendererElement, IAcDatagridCellRendererElementArgs, AcTextInput, AcNumberInput } from '@autocode-ts/ac-browser';
export class AcDDEDatagridNumberInput implements IAcDatagridCellRendererElement{
  numberInput:AcNumberInput = new AcNumberInput();

  destroy?(): void {
    this.numberInput.destroy();
  }

  getElement(): HTMLElement {
    return this.numberInput.element;
  }

  init(args: IAcDatagridCellRendererElementArgs): void {
    this.numberInput.init();
    this.numberInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!;
  }

  refresh(args: IAcDatagridCellRendererElementArgs): void {
    this.numberInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!;
  }

}
