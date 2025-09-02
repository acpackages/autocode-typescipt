import { AcBuilderIconSvgs } from "../consts/ac-builder-icon-svgs.consts";
import { AC_BASIC_PROPERTIES, AC_FORM_PROPERTIES, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export class AcLabelElement extends AcBuilderElement{
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    this.element.innerHTML = "Label";
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

export const AC_BUILDER_LABEL_ELEMENT:IAcBuilderElement = {
  category:'Form',
  name:'label',
  tag:'label',
  title:'Label',
  events:[
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_POINTER_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties:[
    AC_FORM_PROPERTIES.disabled as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.name as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.readonly as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.type as IAcBuilderElementProperty,
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
  ],
  mediaSvg:AcBuilderIconSvgs.label,
  instanceClass:AcLabelElement
}
