import { ClassicPreset, GetSchemes, NodeEditor } from 'rete';
import { AcNodeflowApi } from '../core/ac-nodeflow-api';

export class AcNodeflowDesigner{
  api:AcNodeflowApi;
  constructor(){
    this.api = new AcNodeflowApi({designerInstance:this});
  }
}
