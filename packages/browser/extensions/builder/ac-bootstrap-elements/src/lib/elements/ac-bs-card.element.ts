import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_MOUSE_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

const BS_EVENTS: IAcBuilderElementEvent[] = [];

const BS_PROPS: IAcBuilderElementProperty[] = [];

const basicProperty : IAcBuilderElementProperty[] = [
  AC_BASIC_PROPERTIES.id as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.title as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.hidden as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.lang as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.dir as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.translate as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.tabindex as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.accesskey as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.autofocus as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.draggable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.contenteditable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.spellcheck as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.part as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.inert as IAcBuilderElementProperty
];

const ariaProperties : IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-hidden"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-current"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-pressed"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-expanded"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-controls"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-details"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-busy"] as IAcBuilderElementProperty,
];

export class AcBsCard extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Card
    this.element.innerHTML = `<div class="card mb-3">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Button</a>
  </div>
</div>`;
    this.registerDomEvents();
    this.registerBsEvents();
  }

  private registerDomEvents(): void {
    // Wire common DOM events to builder events where applicable
  }

  private registerBsEvents(): void {
    BS_EVENTS.forEach((ev:any) => {
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

export const AC_BUILDER_BS_CARD_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-card",
  tag: "div",
  title: "Card",
  events: [ ...BS_EVENTS, AC_MOUSE_EVENTS.click ],
  properties: [
    ...basicProperty, 
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.card,
  instanceClass: AcBsCard
};
