import { AcBuilderElement, IAcBuilderElement, IAcBuilderElementInitArgs } from "@autocode-ts/ac-builder";
import { acAddClassToElement } from "@autocode-ts/ac-browser";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";


export class AcDDDatagridElement extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Accordion
    console.log(this);
    acAddClassToElement({class_:"accordion accordion-flush",element:this.element});
    this.element.innerHTML = `
      <div class="accordion-item" contenteditable>
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Accordion Item #1
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
        </div>
      </div>
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

}

export const AC_BUILDER_DD_DATAGRID_ELEMENT: IAcBuilderElement = {
  category: "Data Dictionary",
  name: "ddDatagrid",
  tag: "div",
  title: "Datagrid",
  properties: [
  ],
  mediaSvg: ACI_SVG_SOLID.table,
  instanceClass: AcDDDatagridElement
};
