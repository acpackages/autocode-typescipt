import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";

// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
  { title: 'Show', category: 'Bootstrap', name: "show", htmlEventName: "show.bs.modal" },
  { title: 'Shown', category: 'Bootstrap', name: "shown", htmlEventName: "shown.bs.modal" },
  { title: 'Hide', category: 'Bootstrap', name: "hide", htmlEventName: "hide.bs.modal" },
  { title: 'Hidden', category: 'Bootstrap', name: "hidden", htmlEventName: "hidden.bs.modal" }
];

// Bootstrap-specific properties for this component
const BS_PROPS: IAcBuilderElementProperty[] = [
  { title: 'Backdrop', category: 'Bootstrap', type:'string',name: "backdrop", htmlAttributeName: "data-bs-backdrop" },
  { title: 'Keyboard', category: 'Bootstrap', type:'string',name: "keyboard", htmlAttributeName: "data-bs-keyboard" },
  { title: 'Hidden', category: 'Bootstrap', type:'string', name: "focus", htmlAttributeName: "data-bs-focus" }
];

export class AcBsModal extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Modal
    this.element.innerHTML = `<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
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

export const AC_BUILDER_BS_MODAL_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-modal",
  tag: "div",
  title: "Modal",
  events: [...BS_EVENTS],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.modal,
  instanceClass: AcBsModal
};
