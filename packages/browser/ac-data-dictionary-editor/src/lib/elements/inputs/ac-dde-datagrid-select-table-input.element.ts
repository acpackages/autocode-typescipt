import { IAcDatagridCellElementArgs, AcSelectInput, IAcDatagridCellEditor, IAcDatagridCell } from '@autocode-ts/ac-browser';
import { AcDDEApi, AcEnumDDEHook } from '../../_ac-data-dictionary-editor.export';
export class AcDDEDatagridSelectTableInput implements IAcDatagridCellEditor{
  selectInput:AcSelectInput = new AcSelectInput();
  editorApi!:AcDDEApi;
  datagridCell!:IAcDatagridCell;
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
    this.datagridCell = args.datagridCell;
    this.selectInput.value = args.datagridCell.cellValue;
    if(args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi']){
      this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi'];
      this.editorApi.hooks.subscribe({hook:AcEnumDDEHook.DataDictionarySet,callback:()=>{
        this.setOptions();
      }});
      this.setOptions();
    }

  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.selectInput.value = args.datagridCell.cellValue;
  }

  setOptions(){
    const options:any[] = [];
    this.selectInput.value =this.datagridCell.cellValue;
    for(const row of Object.values(this.editorApi.dataStorage.getTables({filter:this.filter}))){
      options.push({'label':row.tableName,'value':row.tableId});
    }
    this.selectInput.options = options;
  }

}
