/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs,IAcDatagridCellRendererElement } from "@autocode-ts/ac-browser";

export class AcDDEDatagridRowAction implements IAcDatagridCellRendererElement{
  args!:IAcDatagridCellElementArgs;
  element = document.createElement('div');


  destroy?(): void {
    //
  }

  focus?(): void {
    // throw new Error("Method not implemented.");
  }

  blur?(): void {
    // throw new Error("Method not implemented.");
  }

  getElement(): HTMLElement {
    return this.element;
  }

  init(args: IAcDatagridCellElementArgs): void {
    this.args = args;
    this.setActions();
    // throw new Error("Method not implemented.");
  }

  refresh(args: IAcDatagridCellElementArgs): void {
    // throw new Error("Method not implemented.");
  }

  setActions(){
    this.element.innerHTML = `<button type="button" class="btn btn-danger btn-delete"><i class="fa fa-trash"></i></button>`;
    const deleteButton:HTMLElement = this.element.querySelector('.btn-delete')!;
    deleteButton.addEventListener('click',(e)=>{
      this.args.datagridApi.deleteRow({rowId:this.args.datagridCell.acRowId});
    });
  }
}
