/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcArrayValuesInput, IAcDatagridCell, AcEnumModalEvent, AcModal, AcTextInput, IAcDatagridCellEditor, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";

export class AcDDEDatagridValueOptionsInput  implements IAcDatagridCellEditor {
  datagridCell!: IAcDatagridCell;
  textInput: AcTextInput = new AcTextInput();
  isModalOpen: boolean = false;

  destroy(): void {
    // this.textInput.destroy();
  }

  focus(): void {
    this.textInput.focus();
  }

  getDisplayLabel(): string {
    const optionLabels: string[] = [];
    if (this.datagridCell && this.datagridCell.cellValue) {
      for(const option of this.datagridCell.cellValue){
        optionLabels.push(option.value)
      }
    }
    return optionLabels.join(',');
  }

  getElement(): HTMLElement {
    return this.textInput;
  }

  getValue() {
    return this.datagridCell.cellValue;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
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
    acModal.innerHTML = `
      <div class="ac-modal bg-white">
        <div class="ac-modal-header" style="padding: 1rem; border-bottom: 1px solid #ddd;">
          <h4 id="modal-title" style="margin: 0;">Value Options</h4>
        </div>
        <div class="ac-modal-body" style="padding: 1rem;">
          <ac-array-values-input>
            <table style="min-width:600px;">
              <thead>
                <tr>
                  <th>Value</th>
                  <th>Label</th>
                  <th></th>
                </tr>
              </thead>
              <tbody ac-array-values-items>
                <tr >
                  <td>
                    <input class="form-control" ac-array-values-item-input ac-array-value-item-key="value"/>
                  </td>
                  <td>
                    <input class="form-control" ac-array-values-item-input ac-array-value-item-key="label"/>
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
        this.datagridCell.cellValue = [...arrayValues.value];
        this.isModalOpen = false;
        this.textInput.value = this.getDisplayLabel();
        acModal.remove();
      }
    });
    this.textInput.ownerDocument.querySelector('body')?.append(acModal);
    acModal.open();
    arrayValues.value = this.datagridCell.cellValue ? [...this.datagridCell.cellValue] : [];
  }

}
