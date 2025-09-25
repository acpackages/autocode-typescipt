import { AC_TEMPLATE_ENGINE_ATTRIBUTE } from "../consts/ac-template-engine-attributes.const";
import { AcElementContext } from "../models/ac-element-context.model";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class AcEventBinding{
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
      if (!attrName.startsWith(AC_TEMPLATE_ENGINE_ATTRIBUTE.On)) continue;

      const event = attrName.slice(AC_TEMPLATE_ENGINE_ATTRIBUTE.On.length+1);
      const expr = attr.value;

      this.element.removeAttribute(attrName); // avoid duplicate bindings

      this.element.addEventListener(event, (event: Event) => {
        try {
          const fnBody = expr.includes('(') && expr.includes(')') ? expr : `${expr}($event)`;
          const handler = new Function('$event', ...Object.keys(context), `return ${fnBody}`);
          handler(event, ...Object.values(context));
        } catch (e) {
          console.error(`Error in event binding: ${expr}`, e);
        }
      });
    }
  }


}
