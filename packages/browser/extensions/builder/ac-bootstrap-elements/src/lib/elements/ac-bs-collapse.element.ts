import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
    { title: 'Show', category: 'Bootstrap', name: "show", htmlEventName: "show.bs.collapse" },
    { title: 'Shown', category: 'Bootstrap', name: "shown", htmlEventName: "shown.bs.collapse" },
    { title: 'Hide', category: 'Bootstrap', name: "hide", htmlEventName: "hide.bs.collapse" },
    { title: 'Hidden', category: 'Bootstrap', name: "hidden", htmlEventName: "hidden.bs.collapse" }
  ];

// Bootstrap-specific properties for this component
const BS_PROPS:IAcBuilderElementProperty[] = [
    { title: 'Slide', category: 'Bootstrap', type:'string',name: "parent", htmlAttributeName: "data-bs-parent" }
  ];

export class AcBsCollapse extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Collapse
    this.element.innerHTML = `<p class="d-inline-flex gap-1">
  <a class="btn btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
    Link with href
  </a>
  <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Button with data-bs-target
  </button>
</p>
<div class="collapse" id="collapseExample">
  <div class="card card-body">
    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
  </div>
</div>`;
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

export const AC_BUILDER_BS_COLLAPSE_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-collapse",
  tag: "div",
  title: "Collapse",
  events: [ ...BS_EVENTS ],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.collapse,
  instanceClass: AcBsCollapse
};
