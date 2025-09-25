/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcExpression } from "../core/ac-expression";
import { AcElementContext } from "../models/ac-element-context.model";

interface IAcValueExpressionDetail {
  expression:string,
  startPosition:number,
  endPosition:number
}

export class AcReactiveElement {
  element!: HTMLElement;
  elementContext:any = AcElementContext;
  valueExpressions: IAcValueExpressionDetail[] = [];
  attributeExpressions: Record<string, string> = {};
  cssClassExpressions: Record<string, string> = {};
  cssStyleExpressions: Record<string, string> = {};

  constructor({ element, elementContext }: { element: HTMLElement, elementContext: AcElementContext }) {
    this.element = element;
    this.elementContext = elementContext;
    this.elementContext.on('change', () => { this.update() });
    // this.originalHtml = this.element.innerText;
    this.bindValueExpression(0);
    this.bindAttributeExpressions();
    this.update();
  }

  bindValueExpression(startPosition:number) {
    if (this.element && this.element.innerText.includes('{{',startPosition) && this.element.innerText.includes('}}',startPosition)) {
      const startIndex:number = this.element.innerText.indexOf('{{',startPosition);
      const endIndex:number = this.element.innerText.indexOf('}}',startPosition) + 2;
      const expression:string = this.element.innerText.substring(startIndex,endIndex);
      this.valueExpressions.push({expression:expression.replace("{{","").replace("}}",""),startPosition:startIndex,endPosition:endIndex});
      this.bindValueExpression(endIndex);
    }
  }

  bindAttributeExpressions() {
    if (this.element && this.element.attributes) {
      const attributes = Array.from(this.element.attributes);
      for (const attr of attributes) {
        if (attr.name.startsWith('acBind:')) {
          const attrName = attr.name.split(':')[1];
          const expr = attr.value;
          this.attributeExpressions[attrName] = expr;
        }
      }
    }
  }

  bindClassExpressions() {
    const acClass = this.element.getAttribute('acClass');
    // if (!acClass) return;

    // try {
    //   const result = AcExpression.evaluate({expression:acClass,context:this.context});
    //   if (typeof result === 'object' && result !== null) {
    //     for (const key in result) {
    //       if (result[key]) {
    //         this.element.classList.add(key);
    //       } else {
    //         this.element.classList.remove(key);
    //       }
    //     }
    //   }
    // } catch (err) {
    //   console.warn(`acClass error in`, this.element, err);
    // }
  }

  // applyStyleBindings() {
  //   const acStyle = this.element.getAttribute('acStyle');
  //   if (!acStyle) return;

  //   try {
  //     const result = AcExpression.evaluate({expression:acStyle,context:this.context});
  //     if (typeof result === 'object' && result !== null) {
  //       for (const key in result) {
  //         this.element.style.setProperty(key, result[key]);
  //       }
  //     }
  //   } catch (err) {
  //     console.warn(`acStyle error in`, this.element, err);
  //   }
  // }

  setValueFromExpression() {
    let lengthChange = 0;
    const context = this.elementContext.getContextValue();
    for(const expressionDetails of this.valueExpressions){
      const previousExpressionValueLength:number = expressionDetails.endPosition - expressionDetails.startPosition;
      let expressionResult:any = AcExpression.evaluate({expression:expressionDetails.expression,context:context});
      if(expressionResult == null){
        expressionResult = "";
      }
      expressionResult = expressionResult.toString();
      const newExpressionValueLength:number = expressionResult.length;
      const newStartPosition = expressionDetails.startPosition + lengthChange;
      const newEndPosition = expressionDetails.endPosition + lengthChange;
      const beforeHtml = this.element.innerText.substring(0,newStartPosition);
      const afterHtml = this.element.innerText.substring(newEndPosition + 1);
      const newHtml = beforeHtml+expressionResult+afterHtml;
      this.element.innerText = newHtml;
      lengthChange = lengthChange + (previousExpressionValueLength - newExpressionValueLength);
      expressionDetails.startPosition = newStartPosition;
      expressionDetails.endPosition = newEndPosition;
    }
  }

  setAttributesFromExpressions() {
    const context = this.elementContext.getContextValue();
    for (const attrName of Object.keys(this.attributeExpressions)) {
      const expr = this.attributeExpressions[attrName];
      try {
        const value = AcExpression.evaluate({ expression: expr, context: context });
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

  update() {
    this.setValueFromExpression();
    this.setAttributesFromExpressions();
  }

}
