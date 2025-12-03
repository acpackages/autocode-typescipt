import { AcDatagridApi, IAcDatagridCell } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";

export interface IAcDDEDatagridCellInitHookArgs{
  editorApi:AcDDEApi,
  datagridApi:AcDatagridApi,
  datagridCell:IAcDatagridCell,
  eventArgs:any
  instance:any
}
