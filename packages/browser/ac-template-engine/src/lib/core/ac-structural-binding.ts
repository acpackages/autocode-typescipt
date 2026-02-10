/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AC_TEMPLATE_ENGINE_ATTRIBUTE } from "../consts/ac-template-engine-attributes.const";
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
    if (!this.element.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.If) && !this.element.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.ElseIf) && !this.element.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Else)) return false;

    const siblings = Array.from(this.element.parentElement?.children ?? []);
    const chain: HTMLElement[] = [];

    let started = false;
    const context = this.elementContext.getContextValueObject();
    for (const sibling of siblings) {
      const s = sibling as HTMLElement;

      if (!started && s.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.If)) {
        started = true;
        chain.push(s);
        continue;
      }

      if (started && (s.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.ElseIf) || s.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Else))) {
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

      if (node.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.If)) {
        const expr = node.getAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.If)!;
        if (AcExpression.evaluate({expression:expr, context:context})) {
          matched = true;
          node.removeAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.If);
        } else {
          node.remove();
        }
      } else if (node.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.ElseIf)) {
        const expr = node.getAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.ElseIf)!;
        if (AcExpression.evaluate({expression:expr, context:context})) {
          matched = true;
          node.removeAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.ElseIf);
        } else {
          node.remove();
        }
      } else if (node.hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Else)) {
        matched = true;
        node.removeAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Else);
      }
    }

    return true;
  }

  processAcFor(): boolean {
    const expr = this.element.getAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.For);
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
      const match = expr.match(/let\s+(\w+)\s+of\s+(.+)/);
      if (!match) return false;
      const [, item, listExpr] = match;
      const list = AcExpression.evaluate({expression:listExpr, context:{item,...context}});
      if (!Array.isArray(list)) return false;
      const parent = this.element.parentElement!;
      this.element.remove();
      list.forEach(val => {
        const clone = this.element.cloneNode(true) as HTMLElement;
        clone.removeAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.For);
        new AcTemplateEngine({ context:{...context,[item]:val},element:clone,elementContext:this.elementContext}).render();
        parent.append(clone);
      });
      return true;
    }
    return false;
  }

  processAcSwitch(): boolean {
    const switchExpr = this.element.getAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Switch);
    if (!switchExpr) return false;
    const context = this.elementContext.getContextValueObject();
    const switchValue =  AcExpression.evaluate({expression:switchExpr, context:context});
    const parent = this.element.parentElement!;
    let matched = false;

    const siblings = Array.from(this.element.children);
    for (const child of siblings) {
      if ((child as HTMLElement).hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.SwitchCase)) {
        const caseVal = AcExpression.evaluate({expression:(child as HTMLElement).getAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.SwitchCase)!, context:context});
        if (!matched && caseVal === switchValue) {
          matched = true;
        } else {
          child.remove();
        }
      }

      if ((child as HTMLElement).hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.SwitchDefault) && !matched) {
        matched = true;
      } else if ((child as HTMLElement).hasAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.SwitchDefault)) {
        child.remove();
      }
    }

    this.element.removeAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Switch);
    return true;
  }

  processAcInclude(): boolean {
    const tplId = this.element.getAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.SwitchDefault);
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
