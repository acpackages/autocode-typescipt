/* eslint-disable @typescript-eslint/no-unused-expressions */
import { AcArrayValuesInputElement, AcDatagrid, AcDatetimeInputElement, AcInputElement, AcModal, AcNumberInputElement, AcOptionInputElement, AcPagination, AcPopoutTextareaInputElement, AcResizable, AcSelectInputElement, AcTextareaInputElement, AcTextInputElement, AcTooltip } from "../components/_components.export";
import { AcAccordion } from "../components/ac-accordion/elements/ac-accordion.element";
import { AcCollapse } from "../components/ac-collapse/elements/ac-collapse.element";
import { AcDraggable } from "../components/ac-draggable/elements/ac-draggable.element";
import { AcSvgIconElement } from "../components/ac-svg-icon/_ac-svg-icon.element";

const ATTRIBUTES_TO_LISTEN: string[] = [
  'ac-tooltip'
];

export function acInit({ element, observe = true }: { element?: HTMLElement, observe?: boolean } = {}) {
  const instances: any[] = [];
  if (element == undefined) {
    element = document.querySelector('body') as HTMLElement;
  }

  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type == 'attributes') {
        const element = mutation.target as HTMLElement;
        const attrName: string = mutation.attributeName!;
        if (attrName in ATTRIBUTES_TO_LISTEN) {
          acInit({ element });
        }
      }
      else if (mutation.type == "childList" && mutation.addedNodes.length > 0) {
        mutation.addedNodes.forEach((element) => {
          if (element instanceof HTMLElement) {
            acInit({ element });
          }
        });
      }
    });
  });
  observer.observe(element as HTMLElement, {
    attributes: true,
    childList: true,
    subtree: true
  });
  for (const attribute of ATTRIBUTES_TO_LISTEN) {
    const elements = element.querySelectorAll(`[${attribute}]`);
    if (elements) {
      for (const child of Array.from(elements) as HTMLElement[]) {
        acInit({ element: child, observe: false });
      }
    }
  }

  if (element.hasAttribute('ac-tooltip')) {
    new AcTooltip({ element });
  }
  return instances;
}

AcAccordion;
AcCollapse;
AcDatagrid;

// Start Input Elements
AcArrayValuesInputElement;
AcDatetimeInputElement;
AcInputElement;
AcNumberInputElement;
AcOptionInputElement;
AcPopoutTextareaInputElement;
AcSelectInputElement;
AcTextInputElement;
AcTextareaInputElement;
// End Input Elements

AcModal;
AcPagination;
AcResizable;
AcSvgIconElement;
