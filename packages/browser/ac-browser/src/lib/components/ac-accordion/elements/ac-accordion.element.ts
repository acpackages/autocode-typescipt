import { acRegisterCustomElement } from "../../../utils/ac-element-functions";
import { AcCollapseAttributeName } from "../../ac-collapse/consts/ac-collapse-attribute-name.const";
import { AcCollapse } from "../../ac-collapse/elements/ac-collapse.element";
import { AcEnumCollapseEvent } from "../../ac-collapse/enums/ac-enum-collapse-event.enum";
import { AcEvents } from "@autocode-ts/autocode";
import { AC_ACCORDION_TAG } from "../consts/ac-accordion-tag.const";
import { AC_COLLAPSE_TAG } from "../../_components.export";

export class AcAccordion extends HTMLElement{
  collapses: AcCollapse[] = [];
  events:AcEvents = new AcEvents();

  constructor() {
    super();
    this.style.display = 'contents';
    this.init();
  }

  init() {
    console.dir(this);
    const collapseElements = Array.from(this.querySelectorAll(`${AC_COLLAPSE_TAG.collapse}`)) as AcCollapse[];
    for(const collapse of collapseElements){
      console.dir(collapse);
      this.collapses.push(collapse);
      collapse.addEventListener(AcEnumCollapseEvent.Open,() => {
          this.collapses.forEach((c) => {
            if (c !== collapse) c.close();
          });
        }
      );
    }
    // const opened = this.collapses.find(c => c.hasAttribute(AcCollapseAttributeName.acCollapseOpen));
    // if (opened) {
    //   this.collapses.forEach((c:AcCollapse) => {
    //     const collapse:any = c;
    //     if (collapse !== opened){
    //       collapse.close();
    //     }
    //   });
    // }
  }
}

acRegisterCustomElement({tag:AC_ACCORDION_TAG.accordion,type:AcAccordion});
