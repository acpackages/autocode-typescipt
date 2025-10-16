import { AC_BUILDER_ICON_SVGS } from "../consts/ac-builder-icon-svgs.consts";
import { AC_ARIA_PROPERTIES, AC_BASIC_PROPERTIES, AC_CLIPBOARD_EVENTS, AC_FORM_PROPERTIES, AC_INPUT_EVENTS, AC_KEYBOARD_EVENTS, AC_MOUSE_EVENTS, AC_POINTER_EVENTS, AC_SCROLL_EVENTS, AC_TOUCH_EVENTS } from "../consts/ac-element-properties-events.consts";
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
  AC_ARIA_PROPERTIES["aria-required"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-invalid"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-checked"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-valuemin"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-valuemax"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-valuenow"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-valuetext"] as IAcBuilderElementProperty,
  AC_ARIA_PROPERTIES["aria-disabled"] as IAcBuilderElementProperty,
];

export class AcInput extends AcBuilderElement{
  override init({ args }: { args: IAcBuilderElementInitArgs; }): void {
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

export const AC_BUILDER_INPUT_ELEMENT:IAcBuilderElement = {
  category:'Form',
  name:'input',
  tag:'input',
  title:'Input',
  events:[
    ...Object.values(AC_INPUT_EVENTS),
    ...Object.values(AC_KEYBOARD_EVENTS),
    ...Object.values(AC_MOUSE_EVENTS),
    ...Object.values(AC_POINTER_EVENTS),
    ...Object.values(AC_SCROLL_EVENTS),
    ...Object.values(AC_TOUCH_EVENTS),
    ...Object.values(AC_CLIPBOARD_EVENTS),
  ],
  properties:[
    AC_FORM_PROPERTIES.autocomplete as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.disabled as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.maxlength as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.minlength as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.max as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.min as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.name as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.novalidate as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.placeholder as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.readonly as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.required as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.step as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.type as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.value as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.form as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.formAction as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.formEnctype as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.formMethod as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.formNoValidate as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.formTarget as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.list as IAcBuilderElementProperty,
    AC_FORM_PROPERTIES.dirname as IAcBuilderElementProperty,
    ...basicProperty,
    ...ariaProperties,
  ],
  mediaSvg:AC_BUILDER_ICON_SVGS.input,
  instanceClass:AcInput
}
