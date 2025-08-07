/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellRendererElement, IAcDatagridCellRendererElementArgs, AcOptionInput } from '@autocode-ts/ac-browser';
export class AcDDEDatagridYesNoInput implements IAcDatagridCellRendererElement{
  optionInput:AcOptionInput = new AcOptionInput();

  destroy?(): void {
    this.optionInput.destroy();
  }

  getElement(): HTMLElement {
    return this.optionInput.element;
  }

  init(args: IAcDatagridCellRendererElementArgs): void {
    this.optionInput.checked = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.colDef.field]!;
  }

  refresh(args: IAcDatagridCellRendererElementArgs): void {
    this.optionInput.checked = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.colDef.field]!;
  }

}
