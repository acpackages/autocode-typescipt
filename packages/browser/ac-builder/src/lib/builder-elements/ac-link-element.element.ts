import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_KEYBOARD_EVENTS, AC_LINK_ANCHOR_PROPERTIES, AC_MOUSE_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

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
  AC_BASIC_PROPERTIES.inert as IAcBuilderElementProperty,
  AC_BASIC_PROPERTIES.enterkeyhint as IAcBuilderElementProperty,
];

const ariaProperties : IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-current"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-hidden"] as IAcBuilderElementProperty,
];

export class AcLinkElement extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    this.element.innerHTML = "Link";
    this.element.setAttribute('contenteditable','');
    this.registerListeners();
  }

  private registerListeners() {
    this.element.addEventListener('click', (event: MouseEvent) => {
      this.events.execute({ event: 'click', args: event });
    });
    this.element.addEventListener('dblclick', (event: MouseEvent) => {
      this.events.execute({ event: 'doubleClick', args: event });
    });
  }
}

export const AC_BUILDER_LINK_ELEMENT: IAcBuilderElement = {
  category: 'Navigation',
  name: 'link',
  tag: 'a',
  title: 'Link',
  events: [
    ...Object.values(AC_KEYBOARD_EVENTS),
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties: [
    { name: "href", type: "string", title: "Href", category: "Navigation", htmlAttributeName: 'href' },
    {
      name: "target", type: "select", title: "Target", category: "Navigation", htmlAttributeName: 'href', inputProperties: {
        'selectOptions': [
          { "label": "Blank", "value": "_blank" },
          { "label": "Self", "value": "_self" },
          { "label": "Parent", "value": "_parent" },
          { "label": "Top", "value": "_top" }
        ]
      }
    },
    AC_LINK_ANCHOR_PROPERTIES.download as IAcBuilderElementProperty,
    AC_LINK_ANCHOR_PROPERTIES.rel as IAcBuilderElementProperty,
    AC_LINK_ANCHOR_PROPERTIES.hreflang as IAcBuilderElementProperty,
    AC_LINK_ANCHOR_PROPERTIES.type as IAcBuilderElementProperty,
    AC_LINK_ANCHOR_PROPERTIES.ping as IAcBuilderElementProperty,
    AC_LINK_ANCHOR_PROPERTIES.referrerpolicy as IAcBuilderElementProperty,
    ...basicProperty, 
    ...ariaProperties,
  ],
  mediaSvg: AC_BUILDER_ICON_SVGS.link,
  instanceClass: AcLinkElement
}
