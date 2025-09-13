import { IAcDatagridCellElementArgs, AcSelectInputElement, IAcDatagridCellEditorElement } from '@autocode-ts/ac-browser';
import { AcDDEApi, AcEnumDDEHook } from '../../_ac-data-dictionary-editor.export';
export class AcDDEDatagridSelectTableInput implements IAcDatagridCellEditorElement{
  selectInput:AcSelectInputElement = new AcSelectInputElement();
  editorApi!:AcDDEApi;
  value:any;
  filter:Function|undefined;

  destroy(): void {
    // this.selectInput.destroy();
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
    if(args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi']){
      this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi'];
      this.editorApi.hooks.subscribe({hook:AcEnumDDEHook.DataDictionarySet,callback:()=>{
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
    for(const row of Object.values(this.editorApi.dataStorage.getTables({filter:this.filter}))){
      options.push({'label':row.tableName,'value':row.tableId});
    }
    this.selectInput.selectOptions = options;
    this.selectInput.value = this.value;
  }

}
