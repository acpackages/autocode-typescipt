import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridDataExportXlsxExtension } from "../core/ac-datagrid-data-export-xlsx-extension";

export interface IAcDatagridDataExportXlsxHookArgs {
  datagridApi: AcDatagridApi,
  datagridDataExportXlsxExtension: AcDatagridDataExportXlsxExtension,
  value: any
}
