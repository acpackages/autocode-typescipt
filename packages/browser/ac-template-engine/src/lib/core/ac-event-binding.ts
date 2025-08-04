import { AcElementContext } from "../models/ac-element-context.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class AcEventBinding{
  static eventKey = 'acon:';
  element!: HTMLElement;
  elementContext!:AcElementContext;

  constructor({element,elementContext}:{element: HTMLElement, elementContext: AcElementContext}){
    this.element = element;
    this.elementContext = elementContext;
  }

  apply() {
    const context = this.elementContext.getContextValueObject();
    for (const attr of Array.from(this.element.attributes)) {
      const attrName:string = attr.name.toLowerCase();
      // console.log("Checking if has acOn: on attribute "+attrName);
      if (!attrName.startsWith(AcEventBinding.eventKey)) continue;

      const eventName = attrName.slice(AcEventBinding.eventKey.length);
      const expr = attr.value;

      this.element.removeAttribute(attrName); // avoid duplicate bindings

      this.element.addEventListener(eventName, (event: Event) => {
        try {
          const fnBody = expr.includes('(') && expr.includes(')') ? expr : `${expr}($event)`;
          // console.log(fnBody);
          const handler = new Function('$event', ...Object.keys(context), `return ${fnBody}`);
          handler(event, ...Object.values(context));
        } catch (e) {
          console.error(`Error in event binding: ${expr}`, e);
        }
      });
    }
  }


}
