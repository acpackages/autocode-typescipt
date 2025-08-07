import { AcDDEApi } from "./ac-dde-api";

export class AcDDEEventHandler{
  editorApi!:AcDDEApi;
  constructor({editorApi}:{editorApi:AcDDEApi}){
    this.editorApi = editorApi;
  }
}
