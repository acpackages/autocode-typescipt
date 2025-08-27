import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridAutoAddNewRowExtension } from "../core/ac-datagrid-auto-add-new-row-extension";

export interface IAcDatagridAutoAddNewRowHookArgs {
  datagridApi: AcDatagridApi,
  datagridAutoAddNewRowExtension: AcDatagridAutoAddNewRowExtension,
  value: any
}
