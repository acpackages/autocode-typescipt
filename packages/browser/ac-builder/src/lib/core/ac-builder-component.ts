/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcEvents } from "@autocode-ts/autocode";
import { IAcBuilderElementInitArgs } from "../interfaces/callback-args/ac-builder-element-init-args.interface";

export abstract class AcBuilderComponent{
  componentName:string = '';
  element:HTMLElement = document.createElement('div');
  events:AcEvents = new AcEvents();

  destroy(){
    //
  }

  init({args}:{args:IAcBuilderElementInitArgs}):void{
    // Init implementation in child
  }

  // private registerEvents

  on({event,callback}:{event:string,callback:Function}):string{
    return this.events.subscribe({event,callback});
  }

}
