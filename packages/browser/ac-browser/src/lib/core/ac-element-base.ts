/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents, Autocode } from "@autocode-ts/autocode";
import { acRegisterCustomElement } from "../utils/ac-element-functions";

export class AcElementBase extends HTMLElement {
  private _isInitialized:boolean = false;
  get isInitialized():boolean{
    return this._isInitialized;
  }
  set isInitialized(value:boolean){
    this._isInitialized = value;
  }

  events: AcEvents = new AcEvents();
  acId:string = Autocode.uuid();

  constructor(){
    super();
    const originalDispatch = this.dispatchEvent;
    this.dispatchEvent = (event: Event): boolean => {
      this.events.execute({event:event.type,args:event});
      return originalDispatch.call(this, event);
    };
  }

  connectedCallback(){
    if(!this.isInitialized){
      this.isInitialized = true;
      this.init();
    }
  }

  destroy(){
    this.events.clearSubscriptions();
  }

  disconnectedCallback(){
    //
  }

  init(){
    //
  }

  off({ event, callback, subscriptionId }: { event?: string, callback?: Function, subscriptionId?: string }): void {
    this.events.unsubscribe({ event, callback, subscriptionId });
  }

  on({ event, callback }: { event: string; callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

}

acRegisterCustomElement({tag:"ac-element-base",type: AcElementBase});
