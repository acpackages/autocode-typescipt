import { AcEvents, Autocode } from "@autocode-ts/autocode";
import { acRegisterCustomElement } from "../utils/ac-element-functions";

export class AcElementBase extends HTMLElement {
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
    //
  }

  on({ event, callback }: { event: string; callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

}

acRegisterCustomElement({tag:"ac-element-base",type: AcElementBase});
