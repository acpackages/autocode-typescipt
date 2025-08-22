import { AcDatagridApi, IAcDatagridColumnDefinition } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";

export interface IAcDDEDatagridBeforeColumnsSetInitHookArgs{
  editorApi:AcDDEApi,
  datagridApi:AcDatagridApi,
  columnDefinitions:IAcDatagridColumnDefinition[],
  instance:any
}
