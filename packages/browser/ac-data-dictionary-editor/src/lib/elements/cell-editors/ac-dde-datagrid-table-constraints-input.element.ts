/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcArrayValuesInput, IAcDatagridCell, AcEnumModalEvent, AcModal, AcTextInput, IAcDatagridCellEditor, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";
import { AcEnumDDEHook } from "../../enums/ac-enum-dde-hooks.enum";

export class AcDDEDatagridTableConstraintsInput implements IAcDatagridCellEditor {
  datagridCell!: IAcDatagridCell;
  editorApi!: AcDDEApi;
  textInput: AcTextInput = new AcTextInput();
  isModalOpen: boolean = false;

  destroy(): void {
    // this.textInput.destroy();
  }

  focus(): void {
    this.textInput.focus();
  }

  getDisplayLabel(): string {
    let count: number = 0;
    const optionLabels: string[] = [];
    if (this.datagridCell && this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey]) {
      count = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey].length;
    }
    return `${count} Constraints`;
  }

  getElement(): HTMLElement {
    return this.textInput;
  }

  getValue() {
    return this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey];
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    if (args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams && args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi']) {
      this.editorApi = args.datagridCell.datagridColumn.columnDefinition.cellEditorElementParams['editorApi'];
    }
    this.textInput.on({
      event: 'click', callback: () => {
        if (!this.isModalOpen) {
          this.isModalOpen = true;
          this.openModal();
        }

      }
    });
    this.textInput.value = this.getDisplayLabel();
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textInput.value = this.getDisplayLabel();
  }

  openModal() {
    const acModal = new AcModal();
    const tableColumns = this.getTableColumns();
    acModal.innerHTML = `
      <div class="ac-modal bg-white">
        <div class="ac-modal-header" style="padding: 1rem; border-bottom: 1px solid #ddd;">
          <h4 id="modal-title" style="margin: 0;">Constraints</h4>
        </div>
        <div class="ac-modal-body" style="padding: 1rem;">
          <ac-array-values-input>
            <table style="min-width:600px;">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Value</th>
                  <th></th>
                </tr>
              </thead>
              <tbody ac-array-values-items>
                <tr >
                  <td>
                    <select class="form-control" ac-array-values-item-input ac-array-value-item-key="type">
                      <option value="" >Select Constraint Type</option>
                      <option value="COMPOSITE_UNIQUE_KEY">Composite Unique Key</option>
                      <option value="COMPOSITE_PRIMARY_KEY">Composite Primary Key</option>
                    </select>
                  </td>
                  <td>
                    <ac-tags-input class="form-control" ac-array-values-item-input ac-array-value-item-key="value" tag-options='${JSON.stringify(tableColumns)}'/>
                  </td>
                  <td>
                    <button type="button" class="btn btn-danger" ac-array-values-item-remove><i class="fa fa-trash"></i></button>
                  </td>
                </tr>
              </tbody>
              <tfoot>
                <tr>
                  <td colspan="3">
                    <button type="button" class="btn btn-danger" ac-array-values-item-add><i class="fa fa-plus"></i> Add New</button>
                  </td>
                </tr>
              </tfoot>
            </table>
          </ac-array-values-input>
        </div>
      </div>
      `;
    const arrayValues = acModal.querySelector('ac-array-values-input') as AcArrayValuesInput;
    acModal.on({
      event: 'close', callback: () => {
        this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey] = [...arrayValues.value];
        this.isModalOpen = false;
        this.textInput.value = this.getDisplayLabel();
        acModal.remove();
      }
    });
    this.textInput.ownerDocument.querySelector('body')?.append(acModal);
    acModal.open();
    arrayValues.value = this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey] ? [...this.datagridCell.datagridRow.data[this.datagridCell.datagridColumn.columnKey]] : [];
  }

  getTableColumns() {
    const options: any[] = [];
    for (const row of Object.values(this.editorApi.dataStorage.getTableColumns({ tableId:(this.datagridCell.datagridRow as any).data['tableId'] }))) {
      options.push({ 'label': row.columnName, 'value': row.columnName });
    }
    return options;
  }

}
