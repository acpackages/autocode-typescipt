import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_MOUSE_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";
// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
    { title: 'Close', category: 'Bootstrap',name: "close", htmlEventName: "close.bs.alert" },
    { title: 'Closed', category: 'Bootstrap', name: "closed", htmlEventName: "closed.bs.alert" }
  ];

const BS_PROPS: IAcBuilderElementProperty[] = [];

export class AcBsAlert extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Alert
    this.element.innerHTML = `<div class="alert alert-success alert-dismissible" role="alert">   <div>Nice, you triggered this alert message!</div>   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>`;
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

export const AC_BUILDER_BS_ALERT_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-alert",
  tag: "div",
  title: "Alert",
  events: [ ...BS_EVENTS, ...Object.values(AC_MOUSE_EVENTS), ],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.container,
  instanceClass: AcBsAlert
};
