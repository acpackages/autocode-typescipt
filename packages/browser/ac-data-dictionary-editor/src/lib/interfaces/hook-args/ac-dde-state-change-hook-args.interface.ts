import { AcDDEApi } from "../../core/ac-dde-api";
import { IAcDDEState } from "../ac-dde-state.interface";

export interface IAcDDEStateChangeHookArgs{
  editorApi:AcDDEApi,
  state?:IAcDDEState
}
