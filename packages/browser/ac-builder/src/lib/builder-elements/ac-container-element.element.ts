/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_BASIC_PROPERTIES, AC_CLIPBOARD_EVENTS, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_SCROLL_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
import { AcBuilderElement } from "../core/ac-builder-element";
import { IAcBuilderElementProperty } from "../interfaces/ac-builder-element-property.interface";
import { IAcBuilderElement } from "../interfaces/ac-builder-element.interface";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export class AcContainerElement extends AcBuilderElement{
  private _disabled:boolean = false;
  get disabled():boolean{
    return this._disabled;
  }
  set disabled(value:boolean){
    this._disabled = value;
    if(this.disabled){
      this.element.setAttribute('disabled','true')
    }
    else{
      this.element.removeAttribute('disabled');
    }
  }

  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
    this.element.innerHTML = "Container Element";
    this.registerListeners();
  }

  private registerListeners(){
    this.element.addEventListener('keydown',(event:KeyboardEvent)=>{
      this.events.execute({event:'keyDown',args:event});
    });
    this.element.addEventListener('click',(event:MouseEvent)=>{
      this.events.execute({event:'click',args:event});
    });
    this.element.addEventListener('dblclick',(event:MouseEvent)=>{
      this.events.execute({event:'doubleClick',args:event});
    });
  }
}

export const AC_BUILDER_CONTAINER_ELEMENT:IAcBuilderElement = {
  category:'Layout',
  name:'container',
  tag:'div',
  title:'Container',
  events:[
    ...Object.values(AC_KEYBOARD_EVENTS),
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_CLIPBOARD_EVENTS),
    ...Object.values(AC_POINTER_EVENTS),
    ...Object.values(AC_SCROLL_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS)
  ],
  properties:[
    ...Object.values(AC_BASIC_PROPERTIES) as IAcBuilderElementProperty[]
  ],
  mediaSvg:AC_BUILDER_ICON_SVGS.container,
  instanceClass:AcContainerElement
}
