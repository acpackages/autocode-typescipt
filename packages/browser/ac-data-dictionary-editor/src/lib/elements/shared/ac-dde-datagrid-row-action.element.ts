/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs,IAcDatagridCellRendererElement } from "@autocode-ts/ac-browser";
import { AcEvents } from "@autocode-ts/autocode";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";

export class AcDDEDatagridRowAction implements IAcDatagridCellRendererElement{
  args!:IAcDatagridCellElementArgs;
  element = document.createElement('div');
  events:AcEvents = new AcEvents();

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
    this.element.innerHTML = `<button type="button" class="btn btn-danger btn-delete btn-sm" style="margin-top:-5px;margin-left:5px;"><ac-svg-icon>${ACI_SVG_SOLID.trash}</ac-svg-icon></button>`;
    const deleteButton:HTMLElement = this.element.querySelector('.btn-delete')!;
    deleteButton.addEventListener('click',(e)=>{
      this.args.datagridApi.deleteRow({rowId:this.args.datagridCell.acRowId});
    });
  }
}
