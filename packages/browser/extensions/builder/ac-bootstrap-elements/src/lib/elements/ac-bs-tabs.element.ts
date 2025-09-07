import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[]  = [
    { title: 'Show', category: 'Bootstrap', name: "show", htmlEventName: "show.bs.tab" },
    { title: 'Shown', category: 'Bootstrap', name: "shown", htmlEventName: "shown.bs.tab" },
    { title: 'Hide', category: 'Bootstrap', name: "hide", htmlEventName: "hide.bs.tab" },
    { title: 'Hidden', category: 'Bootstrap', name: "hidden", htmlEventName: "hidden.bs.tab" }
  ];

const BS_PROPS: IAcBuilderElementProperty[] = [];

export class AcBsTabs extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Tabs
    this.element.innerHTML = `<li class="nav-item">
        <a class="nav-link active" aria-current="page" href="#">Active</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled" aria-disabled="true">Disabled</a>
      </li>`;
    this.element.classList.add('nav', 'nav-tabs');
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

export const AC_BUILDER_BS_TABS_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-tabs",
  tag: "ul",
  title: "Tabs",
  events: [ ...BS_EVENTS ],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.tabs,
  instanceClass: AcBsTabs
};
