import { AcDatagridCell, AcEnumModalEvent, AcModal, AcTextInput, IAcDatagridCellEditorElement, IAcDatagridCellElementArgs } from "@autocode-ts/ac-browser";

export class AcDDEDatagridValueOptionsInput implements IAcDatagridCellEditorElement {
  datagridCell!: AcDatagridCell;
  private modalInstance?: AcModal;
  private modalElement?: HTMLElement;
  textInput: AcTextInput = new AcTextInput();

  destroy(): void {
    // this.textInput.destroy();
  }

  focus(): void {
    this.textInput.focus();
  }

  getDisplayLabel(): string {
    const optionLabels: string[] = [];
    if (this.datagridCell && this.datagridCell.cellValue) {
      for (const option of this.datagridCell.cellValue) {
        optionLabels.push(option.value);
      }
    }
    return optionLabels.join(",");
  }

  getElement(): HTMLElement {
    return this.textInput;
  }

  getValue() {
    return this.textInput.value;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.datagridCell = args.datagridCell;
    this.textInput.on({
      event: 'click', callback: () => {
        this.openModal();
      }
    });
    this.textInput.value = "Value Options";
    // this.textInput.value = this.getDisplayLabel();
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    this.textInput.value = this.getDisplayLabel();
  }

  openModal() {
    if (this.modalInstance == undefined) {
      this.modalElement = document.createElement('div');
      this.modalElement.innerHTML = `
        <div class="ac-modal-header" style="padding: 1rem; border-bottom: 1px solid #ddd;">
          <h4 id="modal-title" style="margin: 0;">Value Options</h4>
        </div>
        <div class="ac-modal-body" style="padding: 1rem;">
          <p id="modal-message">This is a modal.</p>
        </div>
        <div class="ac-modal-footer" style="padding: 0.75rem; border-top: 1px solid #ddd; text-align: right;">
          <button id="modal-cancel" style="margin-right: 0.5rem;">Cancel</button>
          <button id="modal-ok">OK</button>
        </div>
    `;
      document.querySelector('body')?.append(this.modalElement);
      this.modalInstance = new AcModal({ element: this.modalElement });
      this.modalInstance.on({
        event: AcEnumModalEvent.Hide, callback: () => {
          this.modalInstance = undefined;
          this.modalElement!.remove();
        }
      })
      this.modalInstance.show();
    }

  }

}
