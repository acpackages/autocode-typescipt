/* eslint-disable @typescript-eslint/no-explicit-any */
import { stringToCamelCase } from "@autocode-ts/ac-extensions";
import { AC_REPORT_ATTRIBUTE } from "../consts/ac-report-html-attributes.const";
import { AcExpression } from "./ac-expression";

export class AcDataBinding {
  element!: HTMLElement;
  context!:any;

  constructor({element,context}:{element:HTMLElement,context: any}){
    this.element = element;
    this.context = context;
    this.apply();
  }

  apply(){
    const attributes = Array.from(this.element.attributes);
    const attrToRemove:string[] = [];
    for (const attr of attributes) {
      const expr = attr.value;
      if (attr.name.toLowerCase().startsWith(AC_REPORT_ATTRIBUTE.templateBindAttribute)) {
        const attrName = attr.name.slice(AC_REPORT_ATTRIBUTE.templateBindAttribute.length+1);
        try {
          const value = AcExpression.evaluate({expression:expr, context:this.context});
          if (value !== undefined) {
            if (attrName in this.element) {
              (this.element as any)[attrName] = value;
            } else {
              this.element.setAttribute(attrName, value);
            }
          }
          attrToRemove.push(attr.name);
        } catch (e) {
          console.warn(`Failed to bind '${attrName}' with expression "${expr}":`, e);
        }
      }
      else if (attr.name.toLowerCase().startsWith(AC_REPORT_ATTRIBUTE.templateClass)) {
        const attrName = attr.name.slice(AC_REPORT_ATTRIBUTE.templateClass.length+1);
        attrToRemove.push(attrName);
        const result = AcExpression.evaluate({expression:expr,context:this.context});
        if(result){
          this.element.classList.add(attr.name);
        }
      }
      else if (attr.name.toLowerCase().startsWith(AC_REPORT_ATTRIBUTE.templateStyle)) {
        const attrName = attr.name.slice(AC_REPORT_ATTRIBUTE.templateStyle.length+1);
        const result = AcExpression.evaluate({expression:expr,context:this.context});
        (this.element.style as any)[stringToCamelCase(attrName)] = result;
        attrToRemove.push(attr.name);
      }
      else if (attr.name.startsWith('[') && attr.name.endsWith(']')) {
        const prop = attr.name.slice(1, -1);
        const val = AcExpression.evaluate({expression:attr.value, context:this.context});
        (this.element as any)[prop] = val;
        attrToRemove.push(attr.name);
      }
    }
    for(const name of attrToRemove){
      this.element.removeAttribute(name);
    }
  }

}
