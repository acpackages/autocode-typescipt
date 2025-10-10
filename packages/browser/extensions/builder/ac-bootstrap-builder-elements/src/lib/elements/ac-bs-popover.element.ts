import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
  { title: 'Show', category: 'Bootstrap', name: "show", htmlEventName: "show.bs.popover" },
  { title: 'Shown', category: 'Bootstrap', name: "shown", htmlEventName: "shown.bs.popover" },
  { title: 'Hide', category: 'Bootstrap', name: "hide", htmlEventName: "hide.bs.popover" },
  { title: 'Hidden', category: 'Bootstrap', name: "hidden", htmlEventName: "hidden.bs.popover" },
  { title: 'Inserted', category: 'Bootstrap', name: "inserted", htmlEventName: "inserted.bs.popover" }
];

// Bootstrap-specific properties for this component
const BS_PROPS: IAcBuilderElementProperty[] = [
  { title: 'Animation', category: 'Bootstrap', type: 'string', name: "animation", htmlAttributeName: "data-bs-animation" },
  { title: 'Container', category: 'Bootstrap', type: 'string', name: "container", htmlAttributeName: "data-bs-container" },
  { title: 'Content', category: 'Bootstrap', type: 'string', name: "content", htmlAttributeName: "data-bs-content" },
  { title: 'Delay', category: 'Bootstrap', type: 'string', name: "delay", htmlAttributeName: "data-bs-delay" },
  { title: 'HTML', category: 'Bootstrap', type: 'string', name: "html", htmlAttributeName: "data-bs-html" },
  { title: 'Placement', category: 'Bootstrap', type: 'string', name: "placement", htmlAttributeName: "data-bs-placement" },
  { title: 'Selector', category: 'Bootstrap', type: 'string', name: "selector", htmlAttributeName: "data-bs-selector" },
  { title: 'Title', category: 'Bootstrap', type: 'string', name: "title", htmlAttributeName: "data-bs-title" },
  { title: 'Trigger', category: 'Bootstrap', type: 'string', name: "trigger", htmlAttributeName: "data-bs-trigger" },
  { title: 'Custom Class', category: 'Bootstrap', type: 'string', name: "customClass", htmlAttributeName: "data-bs-custom-class" },
  { title: 'Toggle', category: 'Bootstrap', type: 'string', name: "toggle", htmlAttributeName: "data-bs-toggle" },
  { title: 'Html', category: 'Bootstrap', type: 'string', name: "html", htmlAttributeName: "data-bs-html" },
  { title: 'Offset', category: 'Bootstrap', type: 'string', name: "offset", htmlAttributeName: "data-bs-offset" }
];

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
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-expanded"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-hidden"] as IAcBuilderElementProperty,
];

export class AcBsPopover extends AcBuilderElement {
  override initBuilder({ args }: { args?: IAcBuilderElementInitArgs; }): void {
    // Basic placeholder HTML for Popover
    this.element.innerHTML = `<button type="button" contenteditable class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here’s some amazing content. It’s very engaging. Right?">Click to toggle popover</button>`;
  }

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
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

export const AC_BUILDER_BS_POPOVER_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bsPopover",
  tag: "div",
  title: "Popover",
  events: [...BS_EVENTS],
  properties: [
    ...basicProperty,
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.popover,
  instanceClass: AcBsPopover
};
