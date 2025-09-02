import { AcBuilderIconSvgs } from "../consts/ac-builder-icon-svgs.consts";
import { AC_BASIC_PROPERTIES, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export class AcLinkElement extends AcBuilderElement {
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    this.element.innerHTML = "Link";
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
    ...Object.values(AC_BASIC_PROPERTIES)  as IAcBuilderElementProperty[],
  ],
  mediaSvg: AcBuilderIconSvgs.link,
  instanceClass: AcLinkElement
}
