import { AcBuilderElement, IAcBuilderElement, IAcBuilderElementInitArgs } from "@autocode-ts/ac-builder";
import { acAddClassToElement, AcDatagrid } from "@autocode-ts/ac-browser";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
import { AcDDDatagridElement } from "@autocode-ts/ac-data-dictionary-components";


export class AcDDDatagridBuilderElement extends AcBuilderElement {

  datagrid = new AcDDDatagridElement();

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    acAddClassToElement({class_:"",element:this.element});
    this.element.innerHTML = `
    `;
    this.element.setAttribute('ac-builder-element-interactive', '');
    this.registerDomEvents();
  }

  private registerDomEvents(): void {
    // Wire common DOM events to builder events where applicable
    this.element.addEventListener('click', (event: MouseEvent) => {
      this.events.execute({ event: 'click', args: event });
    });
  }

  private setGridDisplay() {
    if (this.columns.length > 0) {
      this.element.innerHTML = '';
      this.element.appendChild(this.ddInputFiled);
    }
    else {
      this.element.innerHTML = "Data Dictionary Input";
    }
  }

}

export const AC_BUILDER_DD_DATAGRID_ELEMENT: IAcBuilderElement = {
  category: "Data Dictionary",
  name: "ddDatagrid",
  tag: "div",
  title: "Datagrid",
  properties: [
  ],
  mediaSvg: ACI_SVG_SOLID.table,
  instanceClass: AcDDDatagridBuilderElement
};
