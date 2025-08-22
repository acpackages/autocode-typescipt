import { AcNodeflowApi } from "../core/ac-nodeflow-api";

export class AcNodeElement{
  element = document.createElement('div');
  nodeflowApi:AcNodeflowApi;
    constructor({nodeflowApi}:{nodeflowApi:AcNodeflowApi}){
      this.nodeflowApi = nodeflowApi;
    }
}
