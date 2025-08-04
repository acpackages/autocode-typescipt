import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridColumnsCustomizerExtension } from "../core/ac-datagrid-columns-customizer-extension";

export interface IAcDatagridColumnsCustomizerHookArgs {
  datagridApi: AcDatagridApi,
  datagridColumnsCustomizerExtension: AcDatagridColumnsCustomizerExtension,
  value?: any
}
