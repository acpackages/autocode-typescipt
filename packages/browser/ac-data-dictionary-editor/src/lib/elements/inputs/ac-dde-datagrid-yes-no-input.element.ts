/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellRendererElement, IAcDatagridCellRendererElementArgs, AcOptionInput, acAddClassToElement } from '@autocode-ts/ac-browser';
export class AcDDEDatagridYesNoInput implements IAcDatagridCellRendererElement{
  optionInput:AcOptionInput = new AcOptionInput();
  element:HTMLElement = document.createElement('div');

  destroy?(): void {
    this.optionInput.destroy();
  }

  getElement(): HTMLElement {
    return this.element;
  }

  init(args: IAcDatagridCellRendererElementArgs): void {
    this.element.append(this.optionInput.element);
    acAddClassToElement({cssClass:'ac-option-input-wrap',element:this.element});
    this.optionInput.init();
    this.optionInput.checked = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!;
  }

  refresh(args: IAcDatagridCellRendererElementArgs): void {
    this.optionInput.checked = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!;
  }

}
