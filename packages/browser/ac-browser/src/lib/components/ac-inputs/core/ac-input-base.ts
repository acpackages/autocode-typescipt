/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { AcEnumInputEvent } from "../enums/ac-enum-input-event.enum";
import { IAcInputValueChangeEvent } from "../interfaces/ac-input-value-change-event.interface";
import { AcContext, AcContextRegistry, AcEnumContextEvent } from "@autocode-ts/ac-template-engine";

export class AcInputBase extends HTMLElement {
  static get observedAttributes() {
    return ['ac-context','ac-context-key','class', 'value', 'placeholder', 'disabled', 'readonly', 'name', 'style'];
  }

  get inputReflectedAttributes(){
    return ['class', 'value', 'placeholder', 'disabled', 'readonly','name'];
  }

  reflectValueAttribute:boolean = true;

  _acContext?:any;
  get acContext():any{
    return this._acContext;
  }
  set acContext(value:AcContext){
    this._acContext = value;
    this.setAttribute('ac-context',value.__acContextName__);
    this.setValueFromAcContext();
  }

  get acContextKey():string|null{
    return this.getAttribute('ac-context-key');
  }
  set acContextKey(value:string){
    this.setAttribute('ac-context-key',value);
    this.setValueFromAcContext();
  }

  get disabled(): boolean {
    return this.getAttribute('disabled') == 'true';
  }
  set disabled(value: boolean) {
    if (value) {
      this.setAttribute('disabled', "true");
    }
    else {
      this.removeAttribute('disabled');
    }
  }

  get name(): string | null {
    return this.getAttribute('name');
  }
  set name(value: string) {
    if (value != '') {
      this.setAttribute('name', value);
    }
    else {
      this.removeAttribute(value);
    }
  }

  get placeholder(): string | null {
    return this.getAttribute('placeholder');
  }
  set placeholder(value: string) {
    if (value != '') {
      this.setAttribute('placeholder', value);
    }
    else {
      this.removeAttribute(value);
    }
  }

  get readonly(): boolean {
    return this.getAttribute('readonly') == 'true';
  }
  set readonly(value: boolean) {
    if (value) {
      this.setAttribute('readonly', "true");
    }
    else {
      this.removeAttribute('readonly');
    }
  }

  protected _value: any;
  get value(): any {
    return this._value;
  }
  set value(value: any) {
    if(value != this._value){
      this.setValue(value);
    }
  }

  events: AcEvents = new AcEvents();
  inputElement: HTMLElement|any = document.createElement('input');

  constructor() {
    super();
    this.style.display = 'contents';
  }

  attributeChangedCallback(name: string, oldValue: any, newValue: any) {
    if (oldValue === newValue) return;
    switch (name) {
      case 'ac-context':
        if(AcContextRegistry.exists({name:newValue})){
          this.acContext = AcContextRegistry.get({name:newValue})!;
        }
        break;
      case 'ac-context-key':
        this.acContextKey = newValue;
        break;
      case 'value':
        this.value = newValue;
        break;
      case 'placeholder':
        this.placeholder = newValue;
        break;
      case 'disabled':
        this.disabled = newValue == 'true';
        break;
      case 'class':
        this.className = newValue;
        this.inputElement.className = newValue;
        break;
      case 'readonly':
        this.readonly = newValue == 'true';
        break;
      case 'name':
        this.name = newValue;
        break;
      case 'type':
        this.inputElement.setAttribute('type',newValue);
        break;
    }
    if(this.inputReflectedAttributes.includes(name)){
      this.refreshReflectedAttributes({attribute:name});
    }
  }

  connectedCallback() {
    this.append(this.inputElement);
    this.refreshReflectedAttributes();
    this.inputElement.addEventListener('input', ()=>{
      this.value = this.inputElement.value;
    });
    this.inputElement.addEventListener('change', ()=>{
      this.value = this.inputElement.value;
    });
  }

  disconnectedCallback() {
    this.inputElement.removeEventListener('input', this.handleInput);
    this.inputElement.removeEventListener('change', this.handleChange);
  }

  handleChange(e:any) {
    const newValue = this.inputElement.value;
    this.value = newValue;
    this.dispatchEvent(new CustomEvent('value-changed', {
      detail: { value: newValue },
      bubbles: true,
      composed: true
    }));
    this.dispatchEvent(new Event('change', { bubbles: true, composed: true }));
  }

  handleInput(e: any) {
    const newValue = this.inputElement.value;
    this.value('value', newValue);
  }

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event,callback});
  }

  setValue(value: any) {
    const oldValue: any = this._value;
    if (oldValue != value) {
      this._value = value;
      const inputElement:HTMLInputElement = this.inputElement as HTMLInputElement;
      inputElement.value = value;
      this.dispatchEvent(new CustomEvent('valuechange', {
        detail: { value: value },
        bubbles: true,
        composed: true
      }));
      this.dispatchEvent(new Event('input', { bubbles: true, composed: true }));
      const eventArgs: IAcInputValueChangeEvent = {
        oldValue: oldValue,
        value: this.value,
        instance: this
      };
      this.events.execute({ event: AcEnumInputEvent.ValueChange, args: eventArgs });
      this.events.execute({ event: AcEnumInputEvent.Input, args: eventArgs });
      if(this.reflectValueAttribute){
        this.setAttribute('value',value);
      }
      if(this.isConnected){
        this.setValueToAcContext();
      }
    }
  }

  protected setValueFromAcContext(){
    if(this.acContextKey && this.acContext){
      this.value = this.acContext[this.acContextKey];
      this.acContext.on(AcEnumContextEvent.Change,(args:any)=>{
        if(args.property == this.acContextKey){
          this.setValue(args.value);
        }
      });
    }
  }

  protected setValueToAcContext(){
    if(this.acContextKey && this.acContext){
      this.acContext[this.acContextKey] = this.value;
    }
  }

  upgradeProperty(prop: string) {
    if (this.hasOwnProperty(prop)) {
      const instance:any = this;
      const val = instance[prop];
      delete instance[prop];
      instance[prop] = val;
    }
  }

  refreshReflectedAttributes({attribute}:{attribute?:string} = {}){
    const setAttributeFromThis = (attributeName:string)=>{
      if(this.hasAttribute(attributeName)){
        this.inputElement.setAttribute(attributeName,this.getAttribute(attributeName)!);
      }
      else{
        this.inputElement.removeAttribute(attributeName);
      }
    };
    if(attribute){
      for(const attributeName of this.inputReflectedAttributes){
      setAttributeFromThis(attribute);
    }
    }
    else{
      for(const attributeName of this.inputReflectedAttributes){
        setAttributeFromThis(attributeName);
      }
    }
  }

}
