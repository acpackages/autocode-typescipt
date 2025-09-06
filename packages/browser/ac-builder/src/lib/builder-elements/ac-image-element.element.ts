import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_BASIC_PROPERTIES, AC_KEYBOARD_EVENTS, AC_MEDIA_PROPERTIES, AC_MOUSE_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

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
    ...Object.values(AC_KEYBOARD_EVENTS),
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties:[
    AC_MEDIA_PROPERTIES.src as IAcBuilderElementProperty,
    AC_MEDIA_PROPERTIES.alt as IAcBuilderElementProperty,
    AC_MEDIA_PROPERTIES.crossorigin as IAcBuilderElementProperty,
    AC_MEDIA_PROPERTIES.srclang as IAcBuilderElementProperty,
    AC_MEDIA_PROPERTIES.height as IAcBuilderElementProperty,
    AC_MEDIA_PROPERTIES.width as IAcBuilderElementProperty,
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
  ],
  mediaSvg:AC_BUILDER_ICON_SVGS.image,
  instanceClass:AcImageElement
}
