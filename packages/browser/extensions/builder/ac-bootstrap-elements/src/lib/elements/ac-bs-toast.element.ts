import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
  { title: 'Show', category: 'Bootstrap', name: "show", htmlEventName: "show.bs.toast" },
  { title: 'Shown', category: 'Bootstrap', name: "shown", htmlEventName: "shown.bs.toast" },
  { title: 'Hide', category: 'Bootstrap', name: "hide", htmlEventName: "hide.bs.toast" },
  { title: 'Hidden', category: 'Bootstrap', name: "hidden", htmlEventName: "hidden.bs.toast" }
];

// Bootstrap-specific properties for this component
const BS_PROPS: IAcBuilderElementProperty[] = [
  { title: 'Animation', category: 'Bootstrap', type: 'string', name: "animation", htmlAttributeName: "data-bs-animation" },
  { title: 'Autohide', category: 'Bootstrap', type: 'string', name: "autohide", htmlAttributeName: "data-bs-autohide" },
  { title: 'Delay', category: 'Bootstrap', type: 'string', name: "delay", htmlAttributeName: "data-bs-delay" }
];

export class AcBsToast extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Toast
    this.element.innerHTML = `<div>Toast</div>`;
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

export const AC_BUILDER_BS_TOAST_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-toast",
  tag: "div",
  title: "Toast",
  events: [...BS_EVENTS],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.toast,
  instanceClass: AcBsToast
};
