import { AcNodeflowApi } from "../core/ac-nodeflow-api";

export class AcConnectionElement {
  element = document.createElement('svg');
  nodeflowApi: AcNodeflowApi;
  constructor({ nodeflowApi }: { nodeflowApi: AcNodeflowApi }) {
    this.nodeflowApi = nodeflowApi;
  }
}
