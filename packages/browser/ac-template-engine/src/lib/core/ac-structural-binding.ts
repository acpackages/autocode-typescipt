/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AcElementContext } from "../models/ac-element-context.model";
import { AcExpression } from "./ac-expression";
import { AcTemplateEngine } from "./ac-template-engine";

export class AcStructuralBinding{
  element!: HTMLElement;
  elementContext!:AcElementContext;

  constructor({element,elementContext}:{element: HTMLElement, elementContext: AcElementContext}){
    this.element = element;
    this.elementContext = elementContext;
  }

  apply(): boolean {
    return (
      this.processConditionalChain() ||
      this.processAcFor() ||
      this.processAcSwitch() ||
      this.processAcInclude()
    );
  }

  processConditionalChain(): boolean {
    if (!this.element.hasAttribute('*acIf') && !this.element.hasAttribute('*acElseIf') && !this.element.hasAttribute('*acElse')) return false;

    const siblings = Array.from(this.element.parentElement?.children ?? []);
    const chain: HTMLElement[] = [];

    let started = false;
    const context = this.elementContext.getContextValueObject();
    for (const sibling of siblings) {
      const s = sibling as HTMLElement;

      if (!started && s.hasAttribute('*acIf')) {
        started = true;
        chain.push(s);
        continue;
      }

      if (started && (s.hasAttribute('*acElseIf') || s.hasAttribute('*acElse'))) {
        chain.push(s);
      } else if (started) {
        break; // End of chain
      }
    }

    let matched = false;
    for (const node of chain) {
      if (matched) {
        node.remove(); // Remove unrendered siblings
        continue;
      }

      if (node.hasAttribute('*acIf')) {
        const expr = node.getAttribute('*acIf')!;
        if (AcExpression.evaluate({expression:expr, context:context})) {
          matched = true;
          node.removeAttribute('*acIf');
        } else {
          node.remove();
        }
      } else if (node.hasAttribute('*acElseIf')) {
        const expr = node.getAttribute('*acElseIf')!;
        if (AcExpression.evaluate({expression:expr, context:context})) {
          matched = true;
          node.removeAttribute('*acElseIf');
        } else {
          node.remove();
        }
      } else if (node.hasAttribute('*acElse')) {
        matched = true;
        node.removeAttribute('*acElse');
      }
    }

    return true;
  }

  processAcFor(): boolean {
    const expr = this.element.getAttribute('*acfor');
    if (expr !== null) {
      const context = this.elementContext.getContextValueObject();
      const exprParts = expr.trim().split(' ');
      if(exprParts.length == 4){
        if(exprParts[0] == 'let'){
          const variableKey = exprParts[1];
        }
        else{
          console.error('*acFor expression must start with let : '+expr);
        }
      }
      else{
        console.error('*Invalid acFor expression : '+expr);
      }


      console.log("Found acfor",expr);
      const functionCode = 'for('+expr+'){console.log(item);}'
      const loopFunction = new Function(...Object.keys(context), `${functionCode}`)(...Object.values(context));
      // loopFunction();
      const match = expr.match(/let\s+(\w+)\s+of\s+(.+)/);
      console.log(match);
      if (!match) return false;
      // const context = this.elementContext.getContextValueObject();
      const [, item, listExpr] = match;
      console.log(listExpr);
      const list = AcExpression.evaluate({expression:listExpr, context:context});
      if (!Array.isArray(list)) return false;

      const parent = this.element.parentElement!;
      list.forEach(val => {
        const clone = this.element.cloneNode(true) as HTMLElement;
        clone.removeAttribute('*acfor');
        // new AcTemplateEngine({ ...this.context, [item]: val }).render(clone);
        parent.insertBefore(clone, this.element);
      });

      this.element.remove();
      return true;
    }
    return false;
  }

  processAcSwitch(): boolean {
    const switchExpr = this.element.getAttribute('*acSwitch');
    if (!switchExpr) return false;
    const context = this.elementContext.getContextValueObject();
    const switchValue =  AcExpression.evaluate({expression:switchExpr, context:context});
    const parent = this.element.parentElement!;
    let matched = false;

    const siblings = Array.from(parent.children);
    for (const child of siblings) {
      if ((child as HTMLElement).hasAttribute('*acSwitchCase')) {
        const caseVal = AcExpression.evaluate({expression:(child as HTMLElement).getAttribute('*acSwitchCase')!, context:context});
        if (!matched && caseVal === switchValue) {
          matched = true;
        } else {
          child.remove();
        }
      }

      if ((child as HTMLElement).hasAttribute('*acSwitchDefault') && !matched) {
        matched = true;
      } else if ((child as HTMLElement).hasAttribute('*acSwitchDefault')) {
        child.remove();
      }
    }

    this.element.removeAttribute('*acSwitch');
    return true;
  }

  processAcInclude(): boolean {
    const tplId = this.element.getAttribute('*acInclude');
    if (!tplId) return false;

    const tpl = document.getElementById(tplId);
    if (tpl && tpl instanceof HTMLTemplateElement) {
      const clone = tpl.content.cloneNode(true);
      this.element.parentElement!.insertBefore(clone, this.element);
      this.element.remove();
      return true;
    }

    return false;
  }


}
