import { AcDatagridApi } from "./ac-datagrid-api";

export abstract class AcDatagridExtension{
  datagridApi!:AcDatagridApi;
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

  setState({stateValue}:{stateValue:any}){
    // Set state implementation
  }
}
