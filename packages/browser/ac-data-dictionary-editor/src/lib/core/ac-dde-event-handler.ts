import { AcEnumDDEEvent } from "../enums/ac-enum-dde-event.enum";
import { AcEnumDDEHook } from "../enums/ac-enum-dde-hooks.enum";
import { IAcDDEStateChangeEvent } from "../interfaces/event-args/ac-dde-state-change-event.interface";
import { IAcDDEStateChangeHookArgs } from "../interfaces/hook-args/ac-dde-state-change-hook-args.interface";
import { AcDDEApi } from "./ac-dde-api";

export class AcDDEEventHandler{
  editorApi!:AcDDEApi;
  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
  }

  handleStateChange(){
    const hookArgs:IAcDDEStateChangeHookArgs = {
      state:this.editorApi.getState(),
      editorApi:this.editorApi
    }
    this.editorApi.hooks.execute({hook:AcEnumDDEHook.StateChange,args:hookArgs});
    const eventArgs:IAcDDEStateChangeEvent = {
      state:this.editorApi.getState(),
      editorApi:this.editorApi
    }
    this.editorApi.events.execute({event:AcEnumDDEEvent.StateChange,args:eventArgs});
  }
}
