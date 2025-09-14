import { AcEvents } from "@autocode-ts/autocode";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export abstract class AcBuilderElement{
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  instanceName:string = '';
  element!:HTMLElement;
  events:AcEvents = new AcEvents();

  destroy(){
    //
  }

  init({args}:{args?:IAcBuilderElementInitArgs} = {}):void{
    //
  }

  initBuilder({args}:{args?:IAcBuilderElementInitArgs} = {}):void{
    // Init implementation in child
  }

  // private registerEvents

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event,callback});
  }

}
