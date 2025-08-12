import { AcDDEApi } from "../../core/ac-dde-api";

export interface IAcDDEExtensionEnabledHookArgs{
  editorApi:AcDDEApi,
  extensionName:string,
}
