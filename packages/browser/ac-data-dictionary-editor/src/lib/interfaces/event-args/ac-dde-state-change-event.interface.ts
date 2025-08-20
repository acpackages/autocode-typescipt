import { AcDDEApi } from "../../core/ac-dde-api";
import { IAcDDEState } from "../ac-dde-state.interface";

export interface IAcDDEStateChangeEvent{
  editorApi:AcDDEApi,
  state?:IAcDDEState
}
