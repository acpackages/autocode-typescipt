import { AcEvents } from "@autocode-ts/autocode";
import { AcEnumReactiveValueProxyEvent, AcReactiveValueProxy, IAcReactiveValueProxyEvent } from "@autocode-ts/ac-template-engine";
import { acAddClassToElement, acRemoveClassFromElement } from "../../utils/ac-element-functions";
import { AcEnumInputEvent } from "../enums/ac-enum-input-event.enum";
import { IAcInputFocusEvent } from "../interfaces/ac-input-focus-event.interface";
import { IAcInputChangeEvent } from "../interfaces/ac-input-change-event.interface";
import { IAcInputMouseEvent } from "../interfaces/ac-input-mouse-event.interface";
import { IAcInputKeyboardEvent } from "../interfaces/ac-input-keyboard-event.interface";
import { IAcInputValueChangeEvent } from "../interfaces/ac-input-value-change-event.interface";
import { IAcInputEvent } from "../interfaces/ac-input-event.interface";
import { IAcInputInputEvent } from "../interfaces/ac-input-input-event.interface";

/* eslint-disable @typescript-eslint/no-inferrable-types */
export class AcInputBase {

  protected _bindKey: string = '';
  get bindKey(): string {
    return this._bindKey;
  }
  set bindKey(value: string) {
    this._bindKey = value;
    this.setValueFromReactiveValueProxy();
  }

  protected _bindToReactiveValueProxy: AcReactiveValueProxy|undefined;
  get bindToReactiveValueProxy():AcReactiveValueProxy|undefined {
    return this._bindToReactiveValueProxy;
  }
  set bindToReactiveValueProxy(value: AcReactiveValueProxy) {
    this._bindToReactiveValueProxy = value;
    this.setValueFromReactiveValueProxy();
  }

  protected _cssClass: string = '';
  get cssClass(): string {
    return this._cssClass;
  }
  set cssClass(value: string) {
    acRemoveClassFromElement({ cssClass: this._cssClass, element: this.element });
    this._cssClass = value;
    acAddClassToElement({ cssClass: value, element: this.element });
  }

  protected _disabled: boolean = false;
  get disabled(): boolean {
    return this._disabled;
  }
  set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.element.setAttribute('disabled', "true");
    }
    else {
      this.element.removeAttribute('disabled');
    }
  }

  protected _name: string = '';
  get name(): string {
    return this._name;
  }
  set name(value: string) {
    this._name = value;
    if (value != '') {
      this.element.setAttribute('name', value);
    }
    else {
      this.element.removeAttribute(value);
    }
  }

  protected _placeholder: string = '';
  get placeholder(): string {
    return this._placeholder;
  }
  set placeholder(value: string) {
    this._placeholder = value;
    if (value != '') {
      this.element.setAttribute('placeholder', value);
    }
    else {
      this.element.removeAttribute(value);
    }
  }

  protected _readonly: boolean = false;
  get readonly(): boolean {
    return this._readonly;
  }
  set readonly(value: boolean) {
    this._readonly = value;
  }

  protected _style: string = '';
  get style(): string {
    return this._style;
  }
  set style(value: string) {
    this._style = value;
    if (value != '') {
      this.element.setAttribute('style', value);
    }
    else {
      this.element.removeAttribute(value);
    }
  }

  protected _value: any;
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    this.setValue(value);
  }

  defaultValue: any;
  doneTypingTimeoutDuration: number = 300;
  protected doneTypingTimeout: any;
  element: any = document.createElement('input');
  events: AcEvents = new AcEvents();

  constructor(){
      this.registerBaseEvents();
  }

  destroy() {
    const eventArgs: IAcInputEvent = {
      instance: this
    };
    this.events.execute({ eventName: AcEnumInputEvent.Destroy, args: eventArgs });
  }

  init() {
    if (this.value == undefined || this.value == null) {
      this.value = this.defaultValue;
    }
    const eventArgs: IAcInputEvent = {
      instance: this
    };
    this.events.execute({ eventName: AcEnumInputEvent.Init, args: eventArgs });
  }

  on({ eventName, callback }: { eventName: string, callback: Function }): string {
    return this.events.subscribe({ eventName: eventName, callback: callback });
  }

  protected registerBaseEvents({excludeEventNames,includeEventNames}:{excludeEventNames?:AcEnumInputEvent[],includeEventNames?:AcEnumInputEvent[]} = {}){
    const eventRegisterFunctions:Record<any,Function> = {
      [AcEnumInputEvent.Blur]:()=>{this.registerBlurEvent()},
      [AcEnumInputEvent.Change]:()=>{this.registerChangeEvent()},
      [AcEnumInputEvent.Click]:()=>{this.registerClickEvent()},
      [AcEnumInputEvent.DoneTyping]:()=>{this.registerDoneTypingEvent()},
      [AcEnumInputEvent.DoubleClick]:()=>{this.registerDoubleClickEvent()},
      [AcEnumInputEvent.Focus]:()=>{this.registerFocusEvent()},
      [AcEnumInputEvent.Input]:()=>{this.registerInputEvent()},
      [AcEnumInputEvent.KeyDown]:()=>{this.registerKeyDownEvent()},
      [AcEnumInputEvent.KeyPress]:()=>{this.registerKeyPressEvent()},
      [AcEnumInputEvent.KeyUp]:()=>{this.registerKeyUpEvent()},
      [AcEnumInputEvent.MouseDown]:()=>{this.registerMouseDownEvent()},
      [AcEnumInputEvent.MouseEnter]:()=>{this.registerMouseEnterEvent()},
      [AcEnumInputEvent.MouseLeave]:()=>{this.registerMouseLeaveEvent()},
      [AcEnumInputEvent.MouseOut]:()=>{this.registerMouseOutEvent()},
      [AcEnumInputEvent.MouseOver]:()=>{this.registerMouseOverEvent()},
      [AcEnumInputEvent.MouseUp]:()=>{this.registerMouseUpEvent()}
    };
    for(const eventName of Object.keys(eventRegisterFunctions)){
      let registerEvent:boolean = true;
      if(includeEventNames && includeEventNames.length > 0){
        if(!includeEventNames.includes(eventName as any)){
          registerEvent = false;
        }
      }
      else if(excludeEventNames && excludeEventNames.length > 0){
        if(excludeEventNames.includes(eventName as any)){
          registerEvent = false;
        }
      }
      if(registerEvent){
        eventRegisterFunctions[eventName]();
      }
    }
  }

  protected registerBlurEvent() {
    this.element.addEventListener('blur', (event: FocusEvent) => {
      const eventArgs: IAcInputFocusEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.Blur, args: eventArgs });
    });
  }

  protected registerChangeEvent() {
    this.element.addEventListener('change', (event: Event) => {
      const eventArgs: IAcInputChangeEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.Change, args: eventArgs });
    });
  }

  protected registerClickEvent() {
    this.element.addEventListener('click', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.Click, args: eventArgs });
    });
  }

  protected registerDoneTypingEvent() {
    this.element.addEventListener('keyup', (event: KeyboardEvent) => {
      if (this.doneTypingTimeout) {
        clearTimeout(this.doneTypingTimeout);
      }
      setTimeout(() => {
        const eventArgs: IAcInputKeyboardEvent = {
          event: event,
          instance: this
        };
        this.events.execute({ eventName: AcEnumInputEvent.DoneTyping, args: eventArgs });
      }, this.doneTypingTimeoutDuration);
    });
  }

  protected registerDoubleClickEvent() {
    this.element.addEventListener('dblclick', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.DoubleClick, args: eventArgs });
    });
  }

  protected registerFocusEvent() {
    this.element.addEventListener('focus', (event: FocusEvent) => {
      const eventArgs: IAcInputFocusEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.Focus, args: eventArgs });
    });
  }

  protected registerInputEvent() {
    this.element.addEventListener('input', (event: InputEvent) => {
      const eventArgs: IAcInputInputEvent = {
        event: event,
        instance: this
      };
      this.value = this.element.value;
      this.events.execute({ eventName: AcEnumInputEvent.Input, args: eventArgs });
    });
  }

  protected registerKeyDownEvent() {
    this.element.addEventListener('keydown', (event: KeyboardEvent) => {
      const eventArgs: IAcInputKeyboardEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.KeyDown, args: eventArgs });
    });
  }

  protected registerKeyPressEvent() {
    this.element.addEventListener('keyPress', (event: KeyboardEvent) => {
      const eventArgs: IAcInputKeyboardEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.KeyPress, args: eventArgs });
    });
  }

  protected registerKeyUpEvent() {
    this.element.addEventListener('keyup', (event: KeyboardEvent) => {
      const eventArgs: IAcInputKeyboardEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.KeyUp, args: eventArgs });
    });
  }

  protected registerMouseDownEvent() {
    this.element.addEventListener('mousedown', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.MouseDown, args: eventArgs });
    });
  }

  protected registerMouseEnterEvent() {
    this.element.addEventListener('mouseenter', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.MouseEnter, args: eventArgs });
    });
  }

  protected registerMouseLeaveEvent() {
    this.element.addEventListener('mouseleave', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.MouseLeave, args: eventArgs });
    });
  }

  protected registerMouseOutEvent() {
    this.element.addEventListener('mouseout', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.MouseOut, args: eventArgs });
    });
  }

  protected registerMouseOverEvent() {
    this.element.addEventListener('mouseover', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.MouseOver, args: eventArgs });
    });
  }

  protected registerMouseUpEvent() {
    this.element.addEventListener('mouseup', (event: MouseEvent) => {
      const eventArgs: IAcInputMouseEvent = {
        event: event,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.MouseUp, args: eventArgs });
    });
  }

  setValue(value: any) {
    const oldValue: any = this._value;
    if(oldValue!=value){
      this._value = value;
      this.element.value = value;
      const eventArgs: IAcInputValueChangeEvent = {
        oldValue: oldValue,
        value: this.value,
        instance: this
      };
      this.events.execute({ eventName: AcEnumInputEvent.ValueChange, args: eventArgs });
      this.setValueToReactiveValueProxy();
    }

  }

  protected setValueFromReactiveValueProxy(){
    if(this.bindKey && this.bindToReactiveValueProxy){
      this.value = this.bindToReactiveValueProxy.valueProxy[this.bindKey];
      this.bindToReactiveValueProxy.on(AcEnumReactiveValueProxyEvent.Change,(args:IAcReactiveValueProxyEvent)=>{
        if(args.property == this.bindKey){
          this.setValue(args.value);
        }
      });
    }
  }

  protected setValueToReactiveValueProxy(){
    if(this.bindKey && this.bindToReactiveValueProxy){
      this.bindToReactiveValueProxy.valueProxy[this.bindKey] = this.value;
    }
  }

  unsubscribeEventListener({ subscriptionId }: { subscriptionId: string }) {
    this.events.unsubscribe({ subscriptionId: subscriptionId });
  }
}
