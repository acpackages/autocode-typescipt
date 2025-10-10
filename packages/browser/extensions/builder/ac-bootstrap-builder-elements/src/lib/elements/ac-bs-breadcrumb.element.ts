import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES,AcBuilderElement,IAcBuilderElement,IAcBuilderElementEvent, IAcBuilderElementInitArgs, IAcBuilderElementProperty,} from "@autocode-ts/ac-builder";
import { AC_BOOTSTRAP_ELEMENT_ICON_SVG } from "../consts/ac-bootstrap-element-icon-svg.consts";
import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";

const BS_EVENTS: IAcBuilderElementEvent[] = [];

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
  AC_ARIA_PROPERTIES["aria-current"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-hidden"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-live"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-atomic"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-details"] as IAcBuilderElementProperty,
];

export class AcBsBreadcrumb extends AcBuilderElement {
  override initBuilder({ args }: { args?: IAcBuilderElementInitArgs; }): void {
    // Basic placeholder HTML for Breadcrumb
    this.element.innerHTML = `<nav aria-label="breadcrumb" ac-builder-element-interactive>
      <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="#">Home</a></li>
        <li class="breadcrumb-item"><a href="#">Library</a></li>
        <li class="breadcrumb-item">Data</li>
      </ol>
    </nav>`;
    this.element.classList.add('py-1');
    this.element.setAttribute('contenteditable', '');

  }

  override init({ args }: { args: IAcBuilderElementInitArgs }): void {
    this.registerDomEvents();
    this.registerBsEvents();
  }

  override handleCommand({command,args}:{command:string,args:any}){
    if(command == 'addLink'){
      const ol = this.element.querySelector('ol.breadcrumb');
      if(ol){
        const li = document.createElement('li');
        li.classList.add('breadcrumb-item');
        li.innerHTML = `<a href="#">New Link</a>`;
        ol.append(li);
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

export const AC_BUILDER_BS_BREADCRUMB_ELEMENT: IAcBuilderElement = {
  category: "Bootstrap",
  name: "bsBreadcrumb",
  tag: "nav",
  title: "Breadcrumb",
  events: [ ...BS_EVENTS ],
  properties: [
    ...basicProperty,
    ...ariaProperties,
    ...BS_PROPS
  ],
  mediaSvg: AC_BOOTSTRAP_ELEMENT_ICON_SVG.breadcrumb,
  instanceClass: AcBsBreadcrumb,
  commands:[
    {name:'addLink',title:'Add Link',iconSvg:ACI_SVG_SOLID.plus}
  ]
};
