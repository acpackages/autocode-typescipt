import { AcDatagridCell, AcTextInput, IAcDatagridCellEditorElement, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";

export class AcDDEDatagridSelectOptionsInput implements IAcDatagridCellEditorElement{
  datagridCell!:AcDatagridCell;
  textInput:AcTextInput = new AcTextInput();

  destroy(): void {
    this.textInput.destroy();
  }

  focus(): void {
    this.textInput.focus();
  }

  getDisplayLabel():string{
    const optionLabels:string[] = [];
    if(this.datagridCell && this.datagridCell.cellValue){
      for(const option of this.datagridCell.cellValue){
        optionLabels.push(option.value);
      }
    }
    return optionLabels.join(",");
  }

  getElement(): HTMLElement {
    return this.textInput.element;
  }

  getValue() {
    return this.textInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    this.textInput.init();
    this.textInput.value = this.getDisplayLabel();
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textInput.value = this.getDisplayLabel();
  }

}
