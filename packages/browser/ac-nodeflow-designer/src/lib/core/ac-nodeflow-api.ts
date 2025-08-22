import { AcNodeflowDesigner } from "../elements/ac-nodeflow-designer.element";
import { AcConnection } from "../models/ac-connection.model";
import { AcNode } from "../models/ac-node.model";
import { AcEvents, AcHooks } from "@autocode-ts/autocode";

export class AcNodeflowApi{
  designerInstance:AcNodeflowDesigner;
  events:AcEvents = new AcEvents();
  hooks:AcHooks = new AcHooks();
  nodes:AcNode[] = [];
  connections:AcConnection[] = [];
  constructor({designerInstance}:{designerInstance:AcNodeflowDesigner}){
    this.designerInstance = designerInstance;
  }

  getJson(){
    //
  }

  on({eventName,callback}:{eventName:string,callback:Function}):string{
    return this.events.subscribe({eventName,callback});
  }

  setJson(){
    //
  }
}
