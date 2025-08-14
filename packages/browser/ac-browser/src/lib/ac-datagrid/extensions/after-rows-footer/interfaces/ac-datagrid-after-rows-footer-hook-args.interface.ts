import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridAfterRowsFooterExtension } from "../core/ac-datagrid-after-rows-footer-extension";

export interface IAcDatagridAfterRowsFooterHookArgs {
  datagridApi: AcDatagridApi,
  datagridAfterRowsFooterExtension: AcDatagridAfterRowsFooterExtension,
  value: any
}
