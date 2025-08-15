import { IAcDatagridCellElementArgs, AcSelectInput, IAcDatagridCellEditorElement } from '@autocode-ts/ac-browser';
import { AcDDEApi, AcEnumDDEHook } from '../../_ac-data-dictionary-editor.export';
export class AcDDEDatagridSelectTableInput implements IAcDatagridCellEditorElement{
  selectInput:AcSelectInput = new AcSelectInput();
  editorApi!:AcDDEApi;
  value:any;

  destroy(): void {
    this.selectInput.destroy();
  }

  focus(): void {
    this.selectInput.focus();
  }

  getElement(): HTMLElement {
    return this.selectInput.element;
  }

  getValue() {
    return this.selectInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.selectInput.init();
    if(args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi']){
      this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi'];
      this.editorApi.hooks.subscribe({hookName:AcEnumDDEHook.DataLoaded,callback:()=>{
        this.setOptions();
      }});
      this.setOptions();
    }
    this.selectInput.value = args.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.selectInput.value = args.datagridCell.cellValue;
  }

  setOptions(){
    const options:any[] = [];
    for(const row of Object.values(this.editorApi.dataStorage.tables)){
      options.push({'label':row.table_name,'value':row.table_id});
    }
    this.selectInput.selectOptions = options;
    this.selectInput.value = this.value;
  }

}
