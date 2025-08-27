import { AcDatagridApi } from "../../core/ac-datagrid-api";

export interface IAcDatagridExtensionEnabledHookArgs{
  datagridApi:AcDatagridApi,
  extensionName:string,
}
