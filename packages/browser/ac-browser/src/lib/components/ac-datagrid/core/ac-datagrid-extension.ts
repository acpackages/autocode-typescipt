import { acNullifyInstanceProperties } from "@autocode-ts/autocode";
import { AcDatagridApi } from "./ac-datagrid-api";

export abstract class AcDatagridExtension{
  datagridApi?:AcDatagridApi;
  hookId = '';

  private _managedListeners: Array<{ target: EventTarget, type: string, handler: any, options?: any }> = [];

  destroy(){
    this._managedListeners.forEach(({ target, type, handler, options }) => {
      target.removeEventListener(type, handler, options);
    });
    this._managedListeners = [];
    acNullifyInstanceProperties({instance:this});
  }

  protected addEventListenerManaged(target: EventTarget, type: string, handler: any, options?: any): void {
    target.addEventListener(type, handler, options);
    this._managedListeners.push({ target, type, handler, options });
  }

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
