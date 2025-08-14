import { IAcDatagridCellElementArgs, AcSelectInput, IAcDatagridCellEditorElement } from '@autocode-ts/ac-browser';
import { AcEnumDDEHook } from '../../enums/ac-enum-dde-hooks.enum';
import { AcDDEApi } from '../../core/ac-dde-api';
export class AcDDEDatagridSelectTableColumnInput implements IAcDatagridCellEditorElement {
  editorApi!: AcDDEApi;
  selectInput: AcSelectInput = new AcSelectInput();
  value: any;

  destroy(): void {
    this.selectInput.destroy();
  }

  focus(): void {
    this.selectInput.element.focus();
  }

  getElement(): HTMLElement {
    return this.selectInput.element;
  }

  getValue() {
    return this.selectInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.selectInput.init();
    this.value = args.datagridCell.cellValue;
    if (args.datagridCell.datagridColumn.columnDefinition.cellRendererElementParams && args.datagridCell.datagridColumn.columnDefinition.cellRendererElementParams['editorApi']) {
      this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellRendererElementParams['editorApi'];
      this.editorApi.hooks.subscribe({
        hookName: AcEnumDDEHook.DataLoaded, callback: () => {
          this.setOptions();
        }
      });
      this.setOptions();
    }

  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.selectInput.value = args.datagridCell.cellValue;
  }

  setOptions() {
    const options: any[] = [{ 'label': 'Select Column', 'value': '' }];
    for (const row of Object.values(this.editorApi.dataStorage.tableColumns)) {
      options.push({ 'label': row.column_name, 'value': row.column_id });
    }
    this.selectInput.selectOptions = options;
    this.selectInput.value = this.value;
    console.log('Setting options');
  }

}
