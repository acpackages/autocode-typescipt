import { AcEvents } from "@autocode-ts/autocode";
import { AcReactiveValueProxy } from "./ac-reactive-value-proxy.model";

export class AcElementContext {
  private events: AcEvents = new AcEvents();
  valueProxies: AcReactiveValueProxy[] = [];

  addValueObjectToContext(value:{value: any}) {
    const valueProxy = new AcReactiveValueProxy(value);
    valueProxy.on('change', (params: any) => {
      this.events.execute({ event: "change", args: params })
    });
    this.valueProxies.push(valueProxy);
  }

  copyFrom({elementContext}:{elementContext:AcElementContext}){
    for(const valueProxy of elementContext.valueProxies){
      valueProxy.on('change', (params: any) => {
        this.events.execute({ event: "change", args: params })
      });
      this.valueProxies.push(valueProxy);
    }
  }

  getContextValueObject():any{
    let value:any = {};
    for(const valueProxy of this.valueProxies){
      value = {...value,...valueProxy.value};
    }
    return value;
  }

  on(event:string,callback:Function){
    return this.events.subscribe({event:event,callback:callback});
  }

  setContextValue({key,value}:{key:string,value:any}):any{
    for(let i=this.valueProxies.length-1; i>=0; i--){
      const valueProxy = this.valueProxies[0];
      if(valueProxy.valueProxy[key] != undefined){
        valueProxy.valueProxy[key] = value;
        break;
      }
      // value = {...value,...valueProxy.value};
    }
    return value;
  }
}
