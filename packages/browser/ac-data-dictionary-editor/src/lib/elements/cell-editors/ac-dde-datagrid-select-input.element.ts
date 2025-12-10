import { IAcDatagridCell, AcSelectInput, IAcDatagridCellEditor, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";

export class AcDDEDatagridSelectInput implements IAcDatagridCellEditor{
  datagridCell!:IAcDatagridCell;
  selectInput:AcSelectInput = new AcSelectInput();
  get options():any[]{
    return this.selectInput.options;
  }
  set options(value:any[]){
    this.selectInput.options = value;
  }

  destroy(): void {
    // this.selectInput.destroy();
  }

  focus(): void {
    this.selectInput.focus();
  }

  getDisplayLabel():string{
    const optionLabels:string[] = [];
    if(this.datagridCell && this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey]){
      for(const option of this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey]){
        optionLabels.push(option.value);
      }
    }
    return optionLabels.join(",");
  }

  getElement(): HTMLElement {
    return this.selectInput;
  }

  getValue() {
    return this.selectInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    if(this.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && this.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams.options){
      this.options = this.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams.options;
    }
    this.selectInput.value = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey];
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    //
  }

}
