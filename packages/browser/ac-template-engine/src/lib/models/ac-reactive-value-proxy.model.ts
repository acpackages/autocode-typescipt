import { AcEvents } from "@autocode-ts/autocode";
import { IAcReactiveValueProxyEvent } from "../interfaces/ac-reactive-value-proxy-event.interface";
import { AcEnumReactiveValueProxyEvent } from "../enums/ac-enum-reactive-value-proxy-event.enum";
export class AcReactiveValueProxy {
  value: any;
  valueProxy!: any;
  private events: AcEvents = new AcEvents();
  constructor(value: any) {
    this.value = value;
    this.valueProxy = new Proxy(value, {
      deleteProperty: (target, prop)=>{
        if (prop in target) {
          const eventArgs: IAcReactiveValueProxyEvent = {
            event:'delete',
            reactiveProxyValue: this,
            target: target,
            property: prop,
            oldValue: target[prop]
          }
          delete target[prop];
          this.events.execute({ eventName: AcEnumReactiveValueProxyEvent.Change, args: eventArgs });
          this.events.execute({ eventName: AcEnumReactiveValueProxyEvent.Delete, args: eventArgs });
          return true;
        }
        return false;
      },
      set: (target, prop, value) => {
        const oldValue = target[prop];
        target[prop] = value;
        const eventArgs: IAcReactiveValueProxyEvent = {
          event:'set',
          reactiveProxyValue: this,
          target: target,
          property: prop,
          value: value,
          oldValue: oldValue
        }
        this.events.execute({ eventName: AcEnumReactiveValueProxyEvent.Set, args: eventArgs });
        if(oldValue != undefined){
          eventArgs.event = 'update';
          this.events.execute({ eventName: AcEnumReactiveValueProxyEvent.Update, args: eventArgs });
        }
        else{
          eventArgs.event = 'add';
          this.events.execute({ eventName: AcEnumReactiveValueProxyEvent.Add, args: eventArgs });
        }
        this.events.execute({ eventName: AcEnumReactiveValueProxyEvent.Change, args: eventArgs });
        return true;
      }
    });
  }

  on(event: string, callback: Function) {
    return this.events.subscribe({ eventName: event, callback: callback });
  }
}
