import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_INPUT_EVENTS, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AC_TOUCH_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[]  = [
  { title: 'focus', category: 'Mouse', name: "focus", htmlEventName: "focus" },
  { title: 'blur', category: 'Mouse', name: "blur", htmlEventName: "blur" }
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
  AC_BASIC_PROPERTIES.autofocus as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.draggable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.contenteditable as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.spellcheck as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.part as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.inert as IAcBuilderElementProperty
];

const ariaProperties : IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-placeholder"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-required"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-invalid"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-disabled"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-errormessage"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-autocomplete"] as IAcBuilderElementProperty,
];

export class AcBsInput extends AcBuilderElement {
  private type:string = 'text';

  public getType(): string {
    return this.type;
  }

  public setType(type: string): void {
    this.type = type;
    this.element.setAttribute('type', type);
  }

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Input
    this.element.innerHTML = `<input type="text" class="form-control" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1">`;
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

export const AC_BUILDER_BS_INPUT_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-input",
  tag: "input",
  title: "Input",
  events: [ AC_MOUSE_EVENTS.click, ...BS_EVENTS, ...Object.values(AC_MOUSE_EVENTS), ...Object.values(AC_KEYBOARD_EVENTS), ...Object.values(AC_INPUT_EVENTS), ...Object.values(AC_TOUCH_EVENTS) ],
  properties: [
    ...basicProperty, 
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.input,
  instanceClass: AcBsInput
};
