import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_TOUCH_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

const BS_EVENTS: IAcBuilderElementEvent[] = [];

const BS_PROPS: IAcBuilderElementProperty[] = [];

const basicProperty: IAcBuilderElementProperty[] = [
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

const ariaProperties: IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-hidden"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-live"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-busy"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-current"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-roledescription"] as IAcBuilderElementProperty,
];

export class AcBsContainer extends AcBuilderElement {
  override initBuilder({ args }: { args?: IAcBuilderElementInitArgs; }): void {
    // Basic placeholder HTML for Container
    this.element.innerHTML = `<div contenteditable>Container</div>`;
  }

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    this.registerEvents();
  }

  private registerEvents(): void {
    for (const ev of AC_BUILDER_BS_CONTAINER_ELEMENT.events!) {
      try {
        let eventName = ev.name;
        if (ev.htmlEventName && typeof ev.htmlEventName === 'string') {
          eventName = ev.htmlEventName;
        }
        this.element.addEventListener(eventName, (event: Event) => {
          this.events.execute({ event: ev.name, args: event });
        });
      } catch (e) {
        // ignore registration errors in builder preview
      }
    };
  }
}

export const AC_BUILDER_BS_CONTAINER_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bsContainer",
  tag: "div",
  title: "Container",
  events: [...BS_EVENTS, ...Object.values(AC_MOUSE_EVENTS), ...Object.values(AC_POINTER_EVENTS), ...Object.values(AC_TOUCH_EVENTS)],
  properties: [
    ...basicProperty,
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.container,
  instanceClass: AcBsContainer
};
