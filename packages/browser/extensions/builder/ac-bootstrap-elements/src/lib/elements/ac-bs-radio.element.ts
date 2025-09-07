import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_INPUT_EVENTS, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";
import { AcInput } from "@autocode-ts/ac-browser";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[]  = [
  { title: 'focus', category: 'DOM', name: "focus", htmlEventName: "focus" },
  { title: 'blur', category: 'DOM', name: "blur", htmlEventName: "blur" }
];

const BS_PROPS: IAcBuilderElementProperty[] = [];

export class AcBsRadio extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Radio
    this.element.innerHTML = `<input class="form-check-input" type="radio" name="radioDefault" id="radioDefault1" checked>
      <label class="form-check-label" for="radioDefault1">
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
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.radio,
  instanceClass: AcBsRadio
};
