import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";
import { acAddClassToElement } from "@autocode-ts/ac-browser";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
  { title: 'Show', category: 'Bootstrap', name: "show", htmlEventName: "show.bs.collapse" },
  { title: 'Shown', category: 'Bootstrap', name: "shown", htmlEventName: "shown.bs.collapse" },
  { title: 'Hide', category: 'Bootstrap', name: "hide", htmlEventName: "hide.bs.collapse" },
  { title: 'Hidden', category: 'Bootstrap', name: "hidden", htmlEventName: "hidden.bs.collapse" }
];

// Bootstrap-specific properties for this component
const BS_PROPS: IAcBuilderElementProperty[] = [
  { title: 'Parent', category: 'Bootstrap', type: 'string', name: "parent", htmlAttributeName: "data-bs-parent" },
  { title: 'Toggle', category: 'Bootstrap', type: 'string', name: "toggle", htmlAttributeName: "data-bs-toggle" },
  { title: 'Target', category: 'Bootstrap', type: 'string', name: "target", htmlAttributeName: "data-bs-target" },
  { title: 'Expanded', category: 'Bootstrap', type: 'boolean', name: "expanded", htmlAttributeName: "aria-expanded" },
  { title: 'Controls', category: 'Bootstrap', type: 'string', name: "controls", htmlAttributeName: "aria-controls" }
];

const basicProperty : IAcBuilderElementProperty[] = [
  AC_BASIC_PROPERTIES.id as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.title as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.lang as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.dir as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.translate as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.hidden as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.tabindex as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.accesskey as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.contenteditable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.autofocus as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.draggable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.draggable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.role as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.spellcheck as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.part as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.inert as IAcBuilderElementProperty
];

const ariaProperties : IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-controls"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-expanded"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-hidden"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-current"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-disabled"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-live"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-description"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-roledescription"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-level"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-busy"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-errormessage"] as IAcBuilderElementProperty
];

export class AcBsAccordion extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    acAddClassToElement({class_:"accordion accordion-flush",element:this.element});
    this.element.innerHTML = `
      <div class="accordion-item" contenteditable>
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            Accordion Item #1
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> class. This is the first item’s accordion body.</div>
        </div>
      </div>
    `;
    this.element.setAttribute('ac-builder-element-interactive', '');
    this.registerDomEvents();
    this.registerBsEvents();
  }

  private registerDomEvents(): void {
    // Wire common DOM events to builder events where applicable
    this.element.addEventListener('click', (event: MouseEvent) => {
      this.events.execute({ event: 'click', args: event });
    });
  }

  private registerBsEvents(): void {
    BS_EVENTS.forEach((ev: any) => {
      try {
        if (ev.htmlEventName && typeof ev.htmlEventName === 'string') {
          this.element.addEventListener(ev.htmlEventName, (event: Event) => {
            this.events.execute({ event: ev.name, args: event });
          });
        }
      } catch (e) {
        // ignore registration errors in builder preview
      }
    });
  }
}

export const AC_BUILDER_BS_ACCORDION_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bsAccordion",
  tag: "div",
  title: "Accordion",
  events: [...BS_EVENTS],
  properties: [
    ...basicProperty,
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.accordion,
  instanceClass: AcBsAccordion
};
