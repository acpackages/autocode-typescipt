import { AcRepeaterApi } from "./ac-repeater-api";

export abstract class AcRepeaterExtension{
  repeaterApi!:AcRepeaterApi;
  hookId = '';

  init(){
    // Init implementation in child
  }

  getState():any{
    // Get state implementation
  }

  handleHook({hookName,hookArgs}:{hookName:string,hookArgs:any}){
    // Hooks implementation
  }

  setState({state}:{state:any}){
    // Set state implementation
  }
}
