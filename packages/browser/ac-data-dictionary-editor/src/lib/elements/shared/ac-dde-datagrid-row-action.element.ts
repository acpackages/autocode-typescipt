/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IAcDatagridCellElementArgs,IAcDatagridCellRenderer } from "@autocode-ts/ac-browser";
import { AcEvents } from "@autocode-ts/autocode";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";

export class AcDDEDatagridRowAction implements IAcDatagridCellRenderer{
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
    const deleteButton:HTMLElement = this.args.datagridApi.datagrid.ownerDocument.createElement('button');
    deleteButton.setAttribute('type','button');
    deleteButton.setAttribute('class','btn text-danger btn-delete btn-sm py-1');
    deleteButton.setAttribute('style','margin-left:0px;height:30px;');
    deleteButton.setAttribute('ac-tooltip',"Delete");
    deleteButton.innerHTML = `<ac-svg-icon>${ACI_SVG_SOLID.trash}</ac-svg-icon>`;
    deleteButton.addEventListener('click',(e)=>{
      this.args.datagridApi.deleteRow({rowId:this.args.datagridCell.datagridRow.rowId});
    });
    this.element.append(deleteButton);
  }
}
