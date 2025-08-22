import { AcDatagridApi, AcDatagridCell } from "@autocode-ts/ac-browser";
import { AcDDEApi } from "../../core/ac-dde-api";

export interface IAcDDEDatagridCellInitHookArgs{
  editorApi:AcDDEApi,
  datagridApi:AcDatagridApi,
  datagridCell:AcDatagridCell,
  eventArgs:any
  instance:any
}
