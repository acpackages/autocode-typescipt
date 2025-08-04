/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcExpression } from "../core/ac-expression";
import { AcElementContext } from "../models/ac-element-context.model";
import { AcReactiveValueProxy } from "../models/ac-reactive-value-proxy.model";

interface IAcValueExpressionDetail {
  expression:string,
  startPosition:number,
  endPosition:number
}

export class AcReactiveNode {
  element!: HTMLElement;
  elementContext: AcElementContext;
  valueExpressions: IAcValueExpressionDetail[] = [];
  attributeExpressions: Record<string, string> = {};
  cssClassExpressions: Record<string, string> = {};
  cssStyleExpressions: Record<string, string> = {};

  constructor({ element, elementContext }: { element: HTMLElement, elementContext: AcElementContext }) {
    this.element = element;
    this.elementContext = elementContext;
    this.elementContext.on('change', () => {
      this.update(); });
    // this.originalHtml = this.element.innerText;
    this.bindValueExpression(0);
    this.update();
    // console.log(this);
  }

  bindValueExpression(startPosition:number) {
    if(this.element && this.element.nodeValue){
      if (this.element.nodeValue.includes('{{',startPosition) && this.element.nodeValue.includes('}}',startPosition)) {
        const startIndex:number = this.element.nodeValue.indexOf('{{',startPosition);
        const endIndex:number = this.element.nodeValue.indexOf('}}',startPosition) + 2;
        const expression:string = this.element.nodeValue.substring(startIndex,endIndex);
        this.valueExpressions.push({expression:expression.replace("{{","").replace("}}",""),startPosition:startIndex,endPosition:endIndex});
        this.bindValueExpression(endIndex);
      }
    }

  }

  setValueFromExpression() {
    let lengthChange = 0;
    const context = this.elementContext.getContextValueObject();
    for(const expressionDetails of this.valueExpressions){
      const previousExpressionValueLength:number = expressionDetails.endPosition - expressionDetails.startPosition;
      let expressionResult:any = AcExpression.evaluate({expression:expressionDetails.expression,context:context});
      if(expressionResult == null){
        expressionResult = "";
      }
      expressionResult = expressionResult.toString();
      let newNodeValue:string = this.element.nodeValue!;
      // console.log("Current node value : "+newNodeValue);
      // console.log("Expression : "+expressionDetails.expression);
      // console.log("Expression result : "+expressionResult);
      // console.log("Old position : "+expressionDetails.startPosition+" to "+expressionDetails.endPosition);
      const newExpressionValueLength:number = expressionResult.length;
      const newStartPosition = expressionDetails.startPosition + lengthChange;
      const newEndPosition = expressionDetails.endPosition + lengthChange+1;
      // console.log(newStartPosition,newEndPosition,=>);
      const beforeHtml = newNodeValue.substring(0,expressionDetails.startPosition+lengthChange);
      const afterHtml = newNodeValue.substring(expressionDetails.endPosition + 1 +lengthChange);
      newNodeValue = beforeHtml+expressionResult+afterHtml;
      this.element.nodeValue = newNodeValue;
      // console.log("New Node Value : "+newNodeValue);
      lengthChange = lengthChange + (previousExpressionValueLength - newExpressionValueLength);
      expressionDetails.startPosition = newStartPosition;
      expressionDetails.endPosition = newEndPosition;
      // console.log("New position : "+expressionDetails.startPosition+" to "+expressionDetails.endPosition);
    }
  }

  setAttributesFromExpressions() {
    const context = this.elementContext.getContextValueObject();
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
    // console.log("Setting node value");
    this.setValueFromExpression();
    this.setAttributesFromExpressions();
  }

}
