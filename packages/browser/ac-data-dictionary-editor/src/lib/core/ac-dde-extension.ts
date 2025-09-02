import { AcDDEApi } from "./ac-dde-api";

export abstract class AcDDEExtension{
  editorApi!:AcDDEApi;
  hookId = '';

  init(){
    // Init implementation in child
  }

  getState():any{
    // Get state implementation
  }

  handleHook({hook,args}:{hook:string,args:any}){
    // Hooks implementation
  }

  setState({stateValue}:{stateValue:any}){
    // Set state implementation
  }
}
