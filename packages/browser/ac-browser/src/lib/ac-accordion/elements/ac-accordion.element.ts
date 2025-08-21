import { AcCollapseAttributeName } from "../../ac-collapse/consts/ac-collapse-attribute-name.const";
import { AcCollapse } from "../../ac-collapse/elements/ac-collapse.element";
import { AcEnumCollapseEvent } from "../../ac-collapse/enums/ac-enum-collapse-event.enum";
import { AcAccordionAttributeName } from "../_ac-accordion.export";
import { AcEvents } from "@autocode-ts/autocode";

export class AcAccordion {
  element: HTMLElement;
  collapses: AcCollapse[] = [];
  events:AcEvents = new AcEvents();

  constructor({ element }: { element: HTMLElement }) {
    this.element = element;
    if (!this.element.hasAttribute(AcAccordionAttributeName.acAccordion)) {
      throw new Error('AcAccordion: Element must have [ac-accordion] attribute.');
    }
    this.init();
  }

  init() {
    const collapseElements = this.element.querySelectorAll(`[${AcCollapseAttributeName.acCollapse}]`);

    collapseElements.forEach((el) => {
      const collapse = new AcCollapse({ element: el as HTMLElement });
      this.collapses.push(collapse);
      collapse.on({
        eventName: AcEnumCollapseEvent.Open, callback: () => {
          this.collapses.forEach((c) => {
            if (c !== collapse) c.close();
          });
        }
      });
    });
    const opened = this.collapses.find(c => c.element.hasAttribute(AcCollapseAttributeName.acCollapseOpen));
    if (opened) {
      this.collapses.forEach((c) => {
        if (c !== opened) c.close();
      });
    }
  }
}
