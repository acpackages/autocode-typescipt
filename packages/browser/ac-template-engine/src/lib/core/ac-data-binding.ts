/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcElementContext } from "../models/ac-element-context.model";
import { AcExpression } from "./ac-expression";

export class AcDataBinding {
  element!: HTMLElement;
  elementContext!:AcElementContext;

  constructor({element,elementContext}:{element:HTMLElement,elementContext: AcElementContext}){
    this.element = element;
    this.elementContext = elementContext;
  }

  apply(){
    // this.applyAcBindAttributes();
    // this.applyClassBindings();
    // this.applyStyleBindings();
    this.applyOneWayBindings();
    this.applyTwoWayBindings();
  }

  applyAcBindAttributes() {
    const attributes = Array.from(this.element.attributes);
    const context = this.elementContext.getContextValueObject();
    for (const attr of attributes) {
      // Matches acBind:attrName="expression"
      if (attr.name.startsWith('acBind:')) {
        const attrName = attr.name.split(':')[1];
        const expr = attr.value;

        try {
          const value = AcExpression.evaluate({expression:expr, context:context});
          if (value !== undefined) {
            if (attrName in this.element) {
              (this.element as any)[attrName] = value;
            } else {
              this.element.setAttribute(attrName, value);
            }
          }
        } catch (e) {
          console.warn(`Failed to bind '${attrName}' with expression "${expr}":`, e);
        }
      }
    }
  }

  applyClassBindings() {
    const acClass = this.element.getAttribute('acClass');
    if (!acClass) return;

    try {
      const result = AcExpression.evaluate({expression:acClass,context:this.elementContext.getContextValueObject()});
      if (typeof result === 'object' && result !== null) {
        for (const key in result) {
          if (result[key]) {
            this.element.classList.add(key);
          } else {
            this.element.classList.remove(key);
          }
        }
      }
    } catch (err) {
      console.warn(`acClass error in`, this.element, err);
    }
  }

  applyOneWayBindings() {
    Array.from(this.element.attributes).forEach(attr => {
      if (attr.name.startsWith('[') && attr.name.endsWith(']')) {
        const prop = attr.name.slice(1, -1);
        const val = AcExpression.evaluate({expression:attr.value, context:this.elementContext.getContextValueObject()});
        (this.element as any)[prop] = val;
      }
    });
  }

  applyStyleBindings() {
    const acStyle = this.element.getAttribute('acStyle');
    if (!acStyle) return;

    try {
      const result = AcExpression.evaluate({expression:acStyle,context:this.elementContext.getContextValueObject()});
      if (typeof result === 'object' && result !== null) {
        for (const key in result) {
          this.element.style.setProperty(key, result[key]);
        }
      }
    } catch (err) {
      console.warn(`acStyle error in`, this.element, err);
    }
  }

  applyTwoWayBindings() {
    const modelAttr = this.element.getAttribute('[(acModel)]');
    if (modelAttr) {
      const inputElement:any = this.element;
      const context = this.elementContext.getContextValueObject();
      inputElement.value = context[modelAttr];
      inputElement.addEventListener('input', () => {
        // console.log("Input changed");
        this.elementContext.setContextValue({key:modelAttr,value:inputElement.value});
        context[modelAttr] = inputElement.value;
      });
    }
  }

}
