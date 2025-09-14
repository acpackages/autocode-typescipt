import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_TOUCH_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
  { title: 'Show', category: 'Bootstrap', name: "show", htmlEventName: "show.bs.dropdown" },
  { title: 'Shown', category: 'Bootstrap', name: "shown", htmlEventName: "shown.bs.dropdown" },
  { title: 'Hide', category: 'Bootstrap', name: "hide", htmlEventName: "hide.bs.dropdown" },
  { title: 'Hidden', category: 'Bootstrap', name: "hidden", htmlEventName: "hidden.bs.dropdown" }
];

// Bootstrap-specific properties for this component
const BS_PROPS: IAcBuilderElementProperty[] = [
  { title: 'Auto CLose', category: 'Bootstrap', type: 'boolean', name: "autoClose", htmlAttributeName: "data-bs-auto-close" },
  { title: 'Offset', category: 'Bootstrap', type: 'string', name: "offset", htmlAttributeName: "data-bs-offset" },
  { title: 'Reference', category: 'Bootstrap', type: 'string', name: "reference", htmlAttributeName: "data-bs-reference" },
  { title: 'Toggle', category: 'Bootstrap', type: 'string', name: "toggle", htmlAttributeName: "data-bs-toggle" },
  { title: 'Display', category: 'Bootstrap', type: 'string', name: "display", htmlAttributeName: "data-bs-display" },
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
  AC_ARIA_PROPERTIES["aria-haspopup"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-expanded"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-controls"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-live"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-busy"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-orientation"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-atomic"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-current"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-disabled"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-checked"] as IAcBuilderElementProperty,
];

export class AcBsDropdown extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Dropdown
    this.element.innerHTML = `<div class="dropdown" ac-builder-element-interactive>
      <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        Dropdown button
      </button>
      <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Action</a></li>
        <li><a class="dropdown-item" href="#">Another action</a></li>
        <li><a class="dropdown-item" href="#">Something else here</a></li>
      </ul>
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

export const AC_BUILDER_BS_DROPDOWN_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-dropdown",
  tag: "div",
  title: "Dropdown",
  events: [...BS_EVENTS, ...Object.values(AC_MOUSE_EVENTS), ...Object.values(AC_POINTER_EVENTS), ...Object.values(AC_TOUCH_EVENTS)],
  properties: [
    ...basicProperty, 
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.dropdown,
  instanceClass: AcBsDropdown
};
