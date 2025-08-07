/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellRendererElement, IAcDatagridCellRendererElementArgs, AcTextInput } from '@autocode-ts/ac-browser';
export class AcDDEDatagridTextInput implements IAcDatagridCellRendererElement{
  textInput:AcTextInput = new AcTextInput();

  destroy?(): void {
    this.textInput.destroy();
  }

  getElement(): HTMLElement {
    return this.textInput.element;
  }

  init(args: IAcDatagridCellRendererElementArgs): void {
    this.textInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.colDef.field]!;
  }

  refresh(args: IAcDatagridCellRendererElementArgs): void {
    this.textInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.colDef.field]!;
  }

}
