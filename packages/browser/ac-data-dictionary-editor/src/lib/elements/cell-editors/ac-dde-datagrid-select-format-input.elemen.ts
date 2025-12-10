import { AcSelectInput, IAcDatagridCellEditor, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";
import { AcEnumDDColumnFormat } from "@autocode-ts/ac-data-dictionary";

export class AcDDEDatagridSelectFormatInput implements IAcDatagridCellEditor {
  selectInput: AcSelectInput = new AcSelectInput();

  destroy(): void {
    // this.selectInput.destroy();/
  }

  focus(): void {
    this.selectInput.focus();
  }

  getElement(): HTMLElement {
    return this.selectInput;
  }

  getValue() {
    return this.selectInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.selectInput.options = [
      { label: 'Lowercase', value: AcEnumDDColumnFormat.Lowercase },
      { label: 'Uppercase', value: AcEnumDDColumnFormat.Uppercase },
    ];
    this.selectInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.selectInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnKey];
  }

}
