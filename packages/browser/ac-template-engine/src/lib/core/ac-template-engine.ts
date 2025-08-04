import { AcExpression } from './ac-expression';
import { AcStructuralBinding } from './ac-structural-binding';
import { AcDataBinding } from './ac-data-binding';
import { AcEventBinding } from './ac-event-binding';
import { AcReactiveValueProxy } from '../models/ac-reactive-value-proxy.model';
import { AcReactiveElement } from '../elements/ac-reactive-element';
import { AcReactiveNode } from '../elements/ac-reactive-node';
import { AcElementContext } from '../models/ac-element-context.model';

const AcTemplateRegistry: Record<string, HTMLTemplateElement> = {};

export function renderTemplate(name: string, context: any): DocumentFragment | null {
  const tpl = AcTemplateRegistry[name];
  if (!tpl) return null;

  const fragment = tpl.content.cloneNode(true) as DocumentFragment;
  const engine = new AcTemplateEngine(context);
  engine.render(fragment);
  return fragment;
}

export class AcTemplateEngine {
  elementContext!:AcElementContext;
  dataBinding?: AcDataBinding;
  eventBinding?: AcEventBinding;
  structuralBinding?: AcStructuralBinding;
  element!: ParentNode;


  constructor({ context, element,elementContext }: { context?: any,elementContext?:AcElementContext, element: ParentNode }) {
    this.elementContext = new AcElementContext();
    if(context){
      this.elementContext.addValueObjectToContext(context);
    }
    else if(elementContext){
      this.elementContext.copyFrom({elementContext:elementContext});
    }
    this.elementContext.on('change',(params)=>{
      console.log("Template engive value change");
      console.log(params);
    })
    this.element = element;
  }

  applyBindings() {
    if (this.structuralBinding) {
      if (this.structuralBinding.apply() == true) {
        return true;
      }
    }
    if (this.dataBinding) {
      this.dataBinding.apply();
    }
    if (this.eventBinding) {
      this.eventBinding.apply();
    }
    return true;
  }

  render() {
    this.processTemplates(this.element);
    this.processNode(this.element);
  }

  private processNode(node: Node) {
    const el = node as HTMLElement;
    if (node.nodeType === Node.ELEMENT_NODE) {

    const tag = el.tagName.toLowerCase();
      // console.log("Found Element Node");

      // Special elements
      if (tag === 'ac-container') {
        this.processContainer(el);
        return;
      }

      if (tag === 'ac-slot') {
        this.processSlot(el);
        return;
      }

      if (tag === 'ac-fragment') {
        this.processFragment(el);
        return;
      }



      // if (el.innerHTML.includes("{{") && el.innerHTML.includes("}}")) {
      //   const reactiveElement = new AcReactiveElement({ element: el, valueProxy: this.contextProxy });
      //   console.log(reactiveElement);
      // }

      this.structuralBinding = new AcStructuralBinding({element:el,elementContext:this.elementContext});
      this.dataBinding = new AcDataBinding({element:el,elementContext:this.elementContext});
      this.eventBinding = new AcEventBinding({element:el,elementContext:this.elementContext});
      this.applyBindings();


    }
    else if (node.nodeType == Node.TEXT_NODE) {
      // console.log("Found Text Node");
      if (node.nodeValue) {
        if (node.nodeValue.includes("{{") && node.nodeValue.includes("}}")) {
          const reactiveNode = new AcReactiveNode({ element: el,elementContext:this.elementContext });
          // console.log(reactiveNode);/
        }
      }

    }
    // console.log(node.childNodes);


    Array.from(node.childNodes).forEach(child => this.processNode(child));
  }

  private refreshNode(element: Node) {
    this.applyBindings();
    Array.from(element.childNodes).forEach(child => this.refreshNode(child));
    // this.processNode(this.root)
  }

  static processInterpolations(node: any, context: any) {
    if (!node.nodeValue || !node.nodeValue.includes('{{')) return;

    const result = node.nodeValue.replace(/\{\{(.*?)\}\}/g, (_, expr: any) =>
      AcExpression.evaluate({ expression: expr, context: context })
    );
    console.log(result);
    node.nodeValue = result;
  }

  private processTemplates(root: ParentNode) {
    const templates = root.querySelectorAll('ac-template');
    templates.forEach((tpl: Element) => {
      const name = tpl.getAttribute('name');
      if (name && tpl instanceof HTMLTemplateElement) {
        AcTemplateRegistry[name] = tpl;
        tpl.remove();
      }
    });
  }

  private processContainer(el: HTMLElement) {
    const parent = el.parentElement!;
    const children = Array.from(el.children);
    children.forEach(child => parent.insertBefore(child, el));
    el.remove();
  }

  private processSlot(slot: HTMLElement) {
    const parent = slot.parentElement!;
    const projected = (slot as any).__projectedContent as Node[] || [];
    projected.forEach(n => parent.insertBefore(n.cloneNode(true), slot));
    slot.remove();
  }

  private processFragment(fragment: HTMLElement) {
    const parent = fragment.parentElement!;
    Array.from(fragment.childNodes).forEach(n => {
      parent.insertBefore(n, fragment);
    });
    fragment.remove();
  }

  private applyClassBinding(el: HTMLElement) {
    const acClass = el.getAttribute('acClass');
    if (!acClass) return;

    try {
      const result = this.evaluate(acClass);
      if (typeof result === 'object' && result !== null) {
        for (const key in result) {
          if (result[key]) {
            el.classList.add(key);
          } else {
            el.classList.remove(key);
          }
        }
      }
    } catch (err) {
      console.warn(`acClass error in`, el, err);
    }
  }

  private applyStyleBinding(el: HTMLElement) {
    const acStyle = el.getAttribute('acStyle');
    if (!acStyle) return;

    try {
      const result = this.evaluate(acStyle);
      if (typeof result === 'object' && result !== null) {
        for (const key in result) {
          el.style.setProperty(key, result[key]);
        }
      }
    } catch (err) {
      console.warn(`acStyle error in`, el, err);
    }
  }

  private evaluate(expr: string): any {
    return new Function('ctx', `with(ctx) { return ${expr}; }`)(this.context);
  }

  processRefs(el: HTMLElement, context: any) {
    const refName = el.getAttribute('acRef');
    if (refName) {
      if (!context.refs) context.refs = {};
      context.refs[refName] = el;
    }
  }
}
