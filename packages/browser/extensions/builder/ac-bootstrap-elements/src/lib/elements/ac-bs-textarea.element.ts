import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_INPUT_EVENTS, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[]  = [
  { title: 'focus', category: 'DOM', name: "focus", htmlEventName: "focus" },
  { title: 'blur', category: 'DOM', name: "blur", htmlEventName: "blur" }
];

const BS_PROPS: IAcBuilderElementProperty[] = [];

export class AcBsTextarea extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Textarea
    this.element.innerHTML = `<textarea class="form-control" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
      <label for="floatingTextarea">Comments</label>`;
    this.element.classList.add('form-floating');
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

export const AC_BUILDER_BS_TEXTAREA_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-textarea",
  tag: "div",
  title: "Textarea",
  events: [ ...BS_EVENTS, AC_MOUSE_EVENTS.click, AC_INPUT_EVENTS.change, AC_INPUT_EVENTS.input, ...Object.values(AC_KEYBOARD_EVENTS)  ],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.textarea,
  instanceClass: AcBsTextarea
};
