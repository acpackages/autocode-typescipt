import { AcEvents } from "@autocode-ts/autocode";
import { AcContext } from "./ac-context.model";

export class AcElementContext {
  private events: AcEvents = new AcEvents();
  contexts: any[] = [];

  addValueObjectToContext(value:{value: any}) {
    const valueProxy = new AcContext(value);
    valueProxy.on('change', (params: any) => {
      this.events.execute({ event: "change", args: params })
    });
    this.contexts.push(valueProxy);
  }

  copyFrom({elementContext}:{elementContext:AcElementContext}){
    for(const valueProxy of elementContext.contexts){
      valueProxy.on('change', (params: any) => {
        this.events.execute({ event: "change", args: params })
      });
      this.contexts.push(valueProxy);
    }
  }

  getContextValueObject():any{
    let value:any = {};
    for(const valueProxy of this.contexts){
      value = {...value,...valueProxy};
    }
    return value;
  }

  on(event:string,callback:Function){
    return this.events.subscribe({event:event,callback:callback});
  }

  setContextValue({key,value}:{key:string,value:any}):any{
    for(let i=this.contexts.length-1; i>=0; i--){
      const valueProxy = this.contexts[0];
      if(valueProxy[key] != undefined){
        valueProxy[key] = value;
        break;
      }
      // value = {...value,...valueProxy.value};
    }
    return value;
  }
}
