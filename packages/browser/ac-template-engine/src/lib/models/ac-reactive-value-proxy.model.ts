import { AcEvents } from "@autocode-ts/autocode";
import { IAcReactiveValueProxyEvent } from "../interfaces/ac-reactive-value-proxy-event.interface";
import { AcEnumReactiveValueProxyEvent } from "../enums/ac-enum-reactive-value-proxy-event.enum";
export class AcReactiveValueProxy{
  value:any;
  valueProxy!:any;
  private events:AcEvents = new AcEvents();
  constructor(value:any){
    this.value = value;
    this.valueProxy = new Proxy(value, {
      set: (target, prop, value) => {
        const oldValue = target[prop];
        target[prop] = value;
        const eventArgs:IAcReactiveValueProxyEvent = {
          reactiveProxyValue:this,
          target:target,
          property:prop,
          value:value,
          oldValue:oldValue
        }
        this.events.execute({eventName:AcEnumReactiveValueProxyEvent.Change,args:eventArgs});
        this.events.execute({eventName:AcEnumReactiveValueProxyEvent.Set,args:eventArgs});
        return true;
      }
    });
  }

  on(event:string,callback:Function){
    return this.events.subscribe({eventName:event,callback:callback});
  }
}
