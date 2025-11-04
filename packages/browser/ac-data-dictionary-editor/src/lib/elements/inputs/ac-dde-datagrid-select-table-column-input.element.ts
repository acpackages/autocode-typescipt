import { IAcDatagridCellElementArgs, AcSelectInput, IAcDatagridCellEditor, AcDatagridCell } from '@autocode-ts/ac-browser';
import { AcEnumDDEHook } from '../../enums/ac-enum-dde-hooks.enum';
import { AcDDEApi } from '../../core/ac-dde-api';
export class AcDDEDatagridSelectTableColumnInput implements IAcDatagridCellEditor {
  editorApi!: AcDDEApi;
  selectInput: AcSelectInput = new AcSelectInput();
  datagridCell!: AcDatagridCell;
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
    // this.selectInput.init();
    this.datagridCell = args.datagridCell;
    if (args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi']) {
      this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi'];
      this.editorApi.hooks.subscribe({
        hook: AcEnumDDEHook.DataDictionarySet, callback: () => {
          this.setOptions();
        }
      });
      this.setOptions();
    }
    this.selectInput.value = this.datagridCell.cellValue;
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.selectInput.value = args.datagridCell.cellValue;
  }

  setOptions() {
    const options: any[] = [];
    for (const row of Object.values(this.editorApi.dataStorage.getTableColumns({filter:this.filter}))) {
      options.push({ 'label': row.columnName, 'value': row.columnId });
    }
    this.selectInput.selectOptions = options;
    this.selectInput.value = this.datagridCell.cellValue;
  }

}
