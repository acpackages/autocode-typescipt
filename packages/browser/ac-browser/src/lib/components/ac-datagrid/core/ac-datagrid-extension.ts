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

  handleHook({hook,hookArgs}:{hook:string,hookArgs:any}){
    // Hooks implementation
  }

  setState({state}:{state:any}){
    // Set state implementation
  }
}
