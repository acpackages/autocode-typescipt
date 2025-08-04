import { AcDatagridApi } from "./ac-datagrid-api";

export abstract class AcDatagridExtension{
  datagridApi!:AcDatagridApi;
  hookId = '';

  init(){
    // init implementation in child
  }

  handleHook({hookName,hookArgs}:{hookName:string,hookArgs:any}){
    // Hooks implementation
  }
}
