import { AcEnumDDEEvent, AcEnumDDEHook, IAcDDEStateChangeEvent, IAcDDEStateChangeHookArgs } from "../_ac-data-dictionary-editor.export";
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
    this.editorApi.hooks.execute({hookName:AcEnumDDEHook.StateChange,args:hookArgs});
    const eventArgs:IAcDDEStateChangeEvent = {
      state:this.editorApi.getState(),
      editorApi:this.editorApi
    }
    this.editorApi.events.execute({eventName:AcEnumDDEEvent.StateChange,args:eventArgs});
  }
}
