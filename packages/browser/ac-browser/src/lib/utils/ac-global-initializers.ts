import { AcAccordion } from "../ac-accordion/elements/ac-accordion.element";
import { AcCollapse } from "../ac-collapse/elements/ac-collapse.element";
import { AcDraggable } from "../ac-draggable/elements/ac-draggable.element";

export function acInit({element}:{element?:HTMLElement|Document} = {}) {
  const instances:any[] = [];
  if(element == undefined){
    element = document;
  }

  element.querySelectorAll('[ac-accordion]').forEach((el) => {
    instances.push(new AcAccordion({ element: el as HTMLElement }));
  });

  element.querySelectorAll('[ac-collapse]:not([ac-accordion] [ac-collapse])').forEach((el) => {
    instances.push(new AcCollapse({ element: el as HTMLElement }));
  });

  element.querySelectorAll('[ac-draggable]').forEach((el) => {
    instances.push(new AcDraggable(el));
  });

  return instances;
}
