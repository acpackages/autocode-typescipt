import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";
// Bootstrap-specific events for this component
const BS_EVENTS: IAcBuilderElementEvent[] = [
  { title: 'Slide', category: 'Bootstrap', name: "slide", htmlEventName: "slide.bs.carousel" },
  { title: 'Slid', category: 'Bootstrap', name: "slid", htmlEventName: "slid.bs.carousel" }
];

// Bootstrap-specific properties for this component
const BS_PROPS: IAcBuilderElementProperty[] = [
  { title: 'Interval', category: 'Bootstrap', type: 'string', name: "interval", htmlAttributeName: "data-bs-interval" },
  { title: 'Keyboard', category: 'Bootstrap', type: 'string', name: "keyboard", htmlAttributeName: "data-bs-keyboard" },
  { title: 'Pause', category: 'Bootstrap', type: 'string', name: "pause", htmlAttributeName: "data-bs-pause" },
  { title: 'Ride', category: 'Bootstrap', type: 'string', name: "ride", htmlAttributeName: "data-bs-ride" },
  { title: 'Wrap', category: 'Bootstrap', type: 'string', name: "wrap", htmlAttributeName: "data-bs-wrap" },
  { title: 'Touch', category: 'Bootstrap', type: 'string', name: "touch", htmlAttributeName: "data-bs-touch" }
];

export class AcBsCarousel extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    // Basic placeholder HTML for Carousel
    this.element.innerHTML = `<div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
    <div class="carousel-item">
      <img src="..." class="d-block w-100" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
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

export const AC_BUILDER_BS_CAROUSEL_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bs-carousel",
  tag: "div",
  title: "Carousel",
  events: [...BS_EVENTS],
  properties: [
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
    ...Object.values(AC_ARIA_PROPERTIES) as IAcBuilderElementProperty[],
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.carousel,
  instanceClass: AcBsCarousel
};
