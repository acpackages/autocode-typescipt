import { AcDatagridCell, AcSelectInput, IAcDatagridCellEditorElement, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";

export class AcDDEDatagridSelectInput implements IAcDatagridCellEditorElement{
  datagridCell!:AcDatagridCell;
  selectInput:AcSelectInput = new AcSelectInput();
  get selectOptions():any[]{
    return this.selectInput.selectOptions;
  }
  set selectOptions(value:any[]){
    this.selectInput.selectOptions = value;
  }

  destroy(): void {
    this.selectInput.destroy();
  }

  focus(): void {
    this.selectInput.focus();
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
    return this.selectInput.element;
  }

  getValue() {
    return this.selectInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    if(this.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && this.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams.selectOptions){
      this.selectOptions = this.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams.selectOptions;
    }
    this.selectInput.init();
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    //
  }

}
