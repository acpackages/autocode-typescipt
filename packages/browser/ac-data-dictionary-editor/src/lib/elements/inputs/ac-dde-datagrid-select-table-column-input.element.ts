import { IAcDatagridCellRendererElement, IAcDatagridCellRendererElementArgs, AcSelectInput } from '@autocode-ts/ac-browser';
import { AcEnumDDEHook } from '../../enums/ac-enum-dde-hooks.enum';
import { AcDDEApi } from '../../core/ac-dde-api';
export class AcDDEDatagridSelectTableColumnInput implements IAcDatagridCellRendererElement{
  editorApi!:AcDDEApi;
  selectInput:AcSelectInput = new AcSelectInput();
  value:any;

  destroy?(): void {
    this.selectInput.destroy();
  }

  focus?(): void {
    this.selectInput.element.focus();
  }

  getElement(): HTMLElement {
    return this.selectInput.element;
  }

  init(args: IAcDatagridCellRendererElementArgs): void {
    this.selectInput.init();
    this.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!
     if(args.datagridCell.datagridColumn.columnDefinition.cellRendererElementParams && args.datagridCell.datagridColumn.columnDefinition.cellRendererElementParams['editorApi']){
          this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellRendererElementParams['editorApi'];
          this.editorApi.hooks.subscribe({hookName:AcEnumDDEHook.DataLoaded,callback:()=>{
            this.setOptions();
          }});
          this.setOptions();
        }

  }

  refresh(args: IAcDatagridCellRendererElementArgs): void {
    this.selectInput.value = args.datagridCell.datagridRow.data[args.datagridCell.datagridColumn.columnDefinition.field]!;
  }

  setOptions(){
    const options:any[] = [];
    for(const row of Object.values(this.editorApi.dataStorage.tableColumns)){
      options.push({'label':row.column_name,'value':row.column_id});
    }
    this.selectInput.selectOptions = options;
    this.selectInput.value = this.value;
    console.log('Setting options');
  }

}
