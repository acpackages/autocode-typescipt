import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_INPUT_EVENTS, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[]  = [
  { title: 'focus', category: 'DOM', name: "focus", htmlEventName: "focus" },
  { title: 'blur', category: 'DOM', name: "blur", htmlEventName: "blur" }
];

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
  AC_BASIC_PROPERTIES.draggable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.part as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.inert as IAcBuilderElementProperty
];

const ariaProperties : IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-checked"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-disabled"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
];

export class AcBsRadio extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Radio
    this.element.innerHTML = `<input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1" checked>
      <label class="form-check-label" for="radioDefault1" contenteditable>
        Default radio
      </label>`;
    this.element.classList.add('form-check');
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

export const AC_BUILDER_BS_RADIO_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-radio",
  tag: "div",
  title: "Radio",
  events: [ ...BS_EVENTS, AC_INPUT_EVENTS.change, AC_INPUT_EVENTS.invalid],
  properties: [
    ...basicProperty, 
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.radio,
  instanceClass: AcBsRadio
};
