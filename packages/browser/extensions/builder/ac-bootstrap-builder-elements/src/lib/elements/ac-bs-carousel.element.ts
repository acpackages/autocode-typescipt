import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_MOUSE_EVENTS, AcBuilderElement, IAcBuilderElement, IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty } from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
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
  { title: 'Touch', category: 'Bootstrap', type: 'string', name: "touch", htmlAttributeName: "data-bs-touch" },
  { title: 'Slide', category: 'Bootstrap', type: 'string', name: "slide", htmlAttributeName: "data-bs-slide" }
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
  AC_ARIA_PROPERTIES["aria-roledescription"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-live"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-atomic"] as IAcBuilderElementProperty,
];

export class AcBsCarousel extends AcBuilderElement {
  override initBuilder({ args }: { args?: IAcBuilderElementInitArgs; }): void {
    // Basic placeholder HTML for Carousel
    this.element.innerHTML = `<div id="carouselExample" class="carousel slide" ac-builder-element-interactive>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="https://www.matemart.in/Assets/images/products/d457c0235036396f11714cb337bc0445.png" height="400" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://res.cloudinary.com/hni-corporation/image/upload/d_HON:Brand:Icons:HON_Icon_Outlines_HON-Icon-Gallery-001.png/f_auto,q_auto/d_HON:Brand:Icons:HON_Icon_Outlines_HON-Icon-Gallery-001.png/f_auto,q_auto/v1693919362/Surface%20Materials/Finishes/Paint/hni-paint-cove.jpg" height="400" class="d-block w-100" alt="...">
        </div>
        <div class="carousel-item">
          <img src="https://preview.colorkit.co/color/A9A9A9.png?type=article-preview-logo&size=social&colorname=Dark%20Gray" height="400" class="d-block w-100" alt="...">
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
    this.element.classList.add('py-1');

  }

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    this.registerDomEvents();
    this.registerBsEvents();
  }

  override handleCommand({command,args}:{command:string,args:any}){
    if(command == 'addSlide'){
      const carouselInner = this.element.querySelector('.carousel-inner');
      if(carouselInner){
        const slide = document.createElement('div');
        slide.classList.add('carousel-item');
        slide.innerHTML = `<img src="https://images.unsplash.com/photo-1587691592099-24045742c181?fm=jpg&amp;q=60&amp;w=3000&amp;ixlib=rb-4.1.0&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" height="200">`;
        carouselInner.appendChild(slide);
      }
    }
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
  name: "bsCarousel",
  tag: "div",
  title: "Carousel",
  events: [...BS_EVENTS, ...Object.values(AC_MOUSE_EVENTS) ],
  properties: [
    ...basicProperty,
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.carousel,
  instanceClass: AcBsCarousel,
  commands:[
    {name:'addSlide',title:'Add Slide',iconSvg:ACI_SVG_SOLID.plus}
  ]
};
