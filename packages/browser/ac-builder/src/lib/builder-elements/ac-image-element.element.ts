import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_IMAGE_PICTURE_PROPERTIES, AC_KEYBOARD_EVENTS, AC_MEDIA_PROPERTIES, AC_MOUSE_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
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
  AC_BASIC_PROPERTIES.inert as IAcBuilderElementProperty
];

const ariaProperties : IAcBuilderElementProperty[] = [
  AC_ARIA_PROPERTIES["aria-label"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-labelledby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-describedby"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-hidden"] as IAcBuilderElementProperty,
];

export class AcImageElement extends AcBuilderElement{
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    args.element.style.height = "50px";
    args.element.style.width = "50px";
    this.registerListeners();
  }

  private registerListeners(){
    this.element.addEventListener('click',(event:MouseEvent)=>{
      this.events.execute({event:'click',args:event});
    });
    this.element.addEventListener('dblclick',(event:MouseEvent)=>{
      this.events.execute({event:'doubleClick',args:event});
    });
  }
}

export const AC_BUILDER_IMAGE_ELEMENT:IAcBuilderElement = {
  category:'Media',
  name:'image',
  tag:'img',
  title:'Image',
  events:[
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties:[
    AC_IMAGE_PICTURE_PROPERTIES.src as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.alt as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.height as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.width as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.loading as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.decoding as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.crossOrigin as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.useMap as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.isMap as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.referrerPolicy as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.srcSet as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.sizes as IAcBuilderElementProperty,
    AC_IMAGE_PICTURE_PROPERTIES.fetchPriority as IAcBuilderElementProperty,
    ...basicProperty, 
    ...ariaProperties,
  ],
  mediaSvg:AC_BUILDER_ICON_SVGS.image,
  instanceClass:AcImageElement
}
