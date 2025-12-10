import { IAcDatagridCellElementArgs, AcSelectInput, IAcDatagridCellEditor, IAcDatagridCell } from '@autocode-ts/ac-browser';
import { AcDDEApi, AcEnumDDEHook } from '../../_ac-data-dictionary-editor.export';
export class AcDDEDatagridSelectViewInput implements IAcDatagridCellEditor{
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
    if(args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi']){
      this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi'];
      this.editorApi.hooks.subscribe({hook:AcEnumDDEHook.DataDictionarySet,callback:()=>{
        this.setOptions();
      }});
      this.setOptions();
    }
    this.selectInput.value = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey];
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.selectInput.value = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey];
  }

  setOptions(){
    const options:any[] = [];
    for(const row of Object.values(this.editorApi.dataStorage.getViews({filter:this.filter}))){
      options.push({'label':row.viewName,'value':row.viewId});
    }
    this.selectInput.options = options;
    this.selectInput.value = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey];
  }

}
