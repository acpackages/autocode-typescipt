import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_CLIPBOARD_EVENTS, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_SCROLL_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export class AcParagraphElement extends AcBuilderElement{
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    this.element.innerHTML = "Paragraph Element";
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

export const AC_BUILDER_PARAGRAPH_ELEMENT:IAcBuilderElement = {
  category:'Text',
  name:'paragraph',
  tag:'p',
  title:'Paragraph',
  events:[
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_SCROLL_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties:[
    ...Object.values(AC_BASIC_PROPERTIES)  as IAcBuilderElementProperty[]
  ],
  mediaSvg:AC_BUILDER_ICON_SVGS.paragraph,
  instanceClass:AcParagraphElement
}
