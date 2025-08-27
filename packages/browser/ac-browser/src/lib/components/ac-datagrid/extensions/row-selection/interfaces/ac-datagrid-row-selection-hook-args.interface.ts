import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridRowSelectionExtension } from "../core/ac-datagrid-row-selection-extension";

export interface IAcDatagridRowSelectionHookArgs {
  datagridApi: AcDatagridApi,
  datagridRowSelectionExtension: AcDatagridRowSelectionExtension,
  value: any
}
