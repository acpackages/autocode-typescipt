import { AcBuilderApi } from "./ac-builder-api";

export abstract class AcBuilderExtension{
  datagridApi!:AcBuilderApi;
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

  setState({state}:{state:any}){
    // Set state implementation
  }
}
