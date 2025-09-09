/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcExpression } from './ac-expression';
import { AcStructuralBinding } from './ac-structural-binding';
import { AcDataBinding } from './ac-data-binding';
import { AcEventBinding } from './ac-event-binding';
import { AcReactiveNode } from '../elements/ac-reactive-node';
import { AcElementContext } from '../models/ac-element-context.model';
import { AC_TEMPLATE_ENGINE_ATTRIBUTE } from '../consts/ac-template-engine-attributes.const';
import { AC_TEMPLATE_ENGINE_TAG } from '../consts/ac-template-engine-tags.const';

const AC_TEMPLATE_REGISTRY: Record<string, HTMLElement> = {};

export class AcTemplateEngine {
  elementContext!: AcElementContext;
  dataBinding?: AcDataBinding;
  eventBinding?: AcEventBinding;
  structuralBinding?: AcStructuralBinding;
  element!: ParentNode;

  constructor({ context, element, elementContext }: { context?: any, elementContext?: AcElementContext, element: ParentNode }) {
    this.elementContext = new AcElementContext();
    if (context) {
      this.elementContext.addValueObjectToContext(context);
    }
    else if (elementContext) {
      this.elementContext.copyFrom({ elementContext: elementContext });
    }
    this.elementContext.on('change', (params: any) => {
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
    this.registerTemplates(this.element);
    this.processNode(this.element);
  }

  private processNode(node: Node) {
    const el = node as HTMLElement;
    if (node.nodeType === Node.ELEMENT_NODE) {
      const tag = el.tagName.toLowerCase();
      if (tag === AC_TEMPLATE_ENGINE_TAG.Container) {
        this.processContainer(el);
        return;
      }
      if (tag === AC_TEMPLATE_ENGINE_TAG.Slot) {
        this.processSlot(el);
        return;
      }
      if (tag === AC_TEMPLATE_ENGINE_TAG.Fragment) {
        this.processFragment(el);
        return;
      }
      this.structuralBinding = new AcStructuralBinding({ element: el, elementContext: this.elementContext });
      this.dataBinding = new AcDataBinding({ element: el, elementContext: this.elementContext });
      this.eventBinding = new AcEventBinding({ element: el, elementContext: this.elementContext });
      this.applyBindings();
    }
    else if (node.nodeType == Node.TEXT_NODE) {
      if (node.nodeValue) {
        if (node.nodeValue.includes("{{") && node.nodeValue.includes("}}")) {
          const reactiveNode = new AcReactiveNode({ element: el, elementContext: this.elementContext });
        }
      }
    }
    Array.from(node.childNodes).forEach(
      child => this.processNode(child)
    );
  }

  private refreshNode(element: Node) {
    this.applyBindings();
    Array.from(element.childNodes).forEach(child => this.refreshNode(child));
    // this.processNode(this.root)
  }

  static processInterpolations(node: any, context: any) {
    if (!node.nodeValue || !node.nodeValue.includes('{{')) return;

    const result = node.nodeValue.replace(/\{\{(.*?)\}\}/g, (_: any, expr: any) =>
      AcExpression.evaluate({ expression: expr, context: context })
    );
    console.log(result);
    node.nodeValue = result;
  }

  private registerTemplates(root: ParentNode) {
    const templates = root.querySelectorAll(AC_TEMPLATE_ENGINE_TAG.Template);
    templates.forEach((template: Element) => {
      const name = template.getAttribute('name');
      if (name) {
        AC_TEMPLATE_REGISTRY[name] = template as HTMLElement;
        template.remove();
      }
    });
  }

  renderTemplate(name: string, context: any): DocumentFragment | null {
    const tpl = AC_TEMPLATE_REGISTRY[name];
    if (!tpl) return null;

    const fragment = tpl.cloneNode(true) as DocumentFragment;
    console.log(fragment);
    console.log(context);
    const engine = new AcTemplateEngine({ context, element: fragment });
    engine.render();
    return fragment;
  }

  private processContainer(el: HTMLElement) {
    const parent = el.parentElement!;
    const templateName = el.getAttribute(AC_TEMPLATE_ENGINE_ATTRIBUTE.Template);

    const children = Array.from(el.children);
    children.forEach(child => parent.insertBefore(child, el));
    let remove: boolean = true;
    if (templateName) {
      const context = this.elementContext.contexts[0];
      console.log(context);
      const templateElement = this.renderTemplate(templateName,context.value);
      console.log(this);
      if (templateElement) {
        el.replaceWith(templateElement);
        remove = false;
      }
    }
    if (remove) {
      el.remove();
    }
  }

  private processFragment(fragment: HTMLElement) {
    const parent = fragment.parentElement!;
    Array.from(fragment.childNodes).forEach(n => {
      parent.insertBefore(n, fragment);
    });
    fragment.remove();
  }

  private processSlot(slot: HTMLElement) {
    const parent = slot.parentElement!;
    console.log(parent);
    const projected = (slot as any).__projectedContent as Node[] || [];
    projected.forEach(n => parent.insertBefore(n.cloneNode(true), slot));
    slot.remove();
  }

  private processTemplate(fragment: HTMLElement) {
    const parent = fragment.parentElement!;
    Array.from(fragment.childNodes).forEach(n => {
      parent.insertBefore(n, fragment);
    });
    fragment.remove();
  }


  // processRefs(el: HTMLElement, context: any) {
  //   const refName = el.getAttribute('acRef');
  //   if (refName) {
  //     if (!context.refs) context.refs = {};
  //     context.refs[refName] = el;
  //   }
  // }
}
