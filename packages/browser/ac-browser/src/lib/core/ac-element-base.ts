import { AcEvents } from "@autocode-ts/autocode";

export class AcElementBase extends HTMLElement {
  events: AcEvents = new AcEvents();

  constructor(){
    super();
    this.events.subscribeAllEvents({callback:(event:string,args:any)=>{
      this.dispatchEvent(new CustomEvent(event.toLowerCase(),{detail:args}));
    }});
  }

  on({ event, callback }: { event: string; callback: Function }): string {
    return this.events.subscribe({ event, callback });
  }

}
