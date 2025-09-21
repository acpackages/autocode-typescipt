import { ACI_SVG_SOLID } from "@autocode-ts/ac-icons";
import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_LIST_PROPERTIES, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
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

export class AcOrderedListElement extends AcBuilderElement{
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    this.element.innerHTML = "<li ac-builder-element-interactive>List item 1</li><li ac-builder-element-interactive>List item 2</li><li ac-builder-element-interactive>List item 3</li>";
    this.registerListeners();
  }

  override handleCommand({command,args}:{command:string,args:any}){
    if(command == 'addItem'){
      const li = document.createElement('li');
      li.setAttribute('ac-builder-element-interactive','');
      li.textContent = 'New List Item';
      this.element.appendChild(li);
    }
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
    AC_LIST_PROPERTIES.reversed as IAcBuilderElementProperty,
    AC_LIST_PROPERTIES.start as IAcBuilderElementProperty,
    AC_LIST_PROPERTIES.type as IAcBuilderElementProperty,
    ...basicProperty,
    ...ariaProperties,
  ],
  mediaSvg:AC_BUILDER_ICON_SVGS.orderedList,
  instanceClass:AcOrderedListElement,commands:[
    {name:'addItem',title:'Add Item',iconSvg:ACI_SVG_SOLID.plus}
  ]
}
