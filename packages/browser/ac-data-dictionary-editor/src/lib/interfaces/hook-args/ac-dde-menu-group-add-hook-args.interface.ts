import { AcDDEApi } from "../../core/ac-dde-api";
import { IAcDDEMenuGroup } from "../ac-dde-menu-group.interface";

export interface IAcDDEMenuGroupAddHookArgs{
  editorApi:AcDDEApi,
  menuGroup:IAcDDEMenuGroup,
}
