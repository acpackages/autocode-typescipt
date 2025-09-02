import { AcBuilderIconSvgs } from "../consts/ac-builder-icon-svgs.consts";
import { AC_BASIC_PROPERTIES, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export class AcOrderedListElement extends AcBuilderElement{
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    this.element.innerHTML = "<li>List item 1</li><li>List item 2</li><li>List item 3</li>";
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

export const AC_BUILDER_ORDERED_LIST_ELEMENT:IAcBuilderElement = {
  category:'List',
  name:'orderedList',
  tag:'ol',
  title:'Ordered List',
  events:[
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_POINTER_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties:[
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[],
  ],
  mediaSvg:AcBuilderIconSvgs.orderedList,
  instanceClass:AcOrderedListElement
}
