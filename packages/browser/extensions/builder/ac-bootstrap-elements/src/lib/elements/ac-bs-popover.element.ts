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
  { title: 'Custom Class', category: 'Bootstrap', type: 'string', name: "customClass", htmlAttributeName: "data-bs-custom-class" }
];

export class AcBsPopover extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Popover
    this.element.innerHTML = `<button type="button" class="btn btn-lg btn-danger" data-bs-toggle="popover" data-bs-title="Popover title" data-bs-content="And here’s some amazing content. It’s very engaging. Right?">Click to toggle popover</button>`;
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
  name: "bs-popover",
  tag: "div",
  title: "Popover",
  events: [...BS_EVENTS],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.popover,
  instanceClass: AcBsPopover
};
