import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridDataExportXlsxExtension } from "../core/ac-datagrid-data-export-xlsx-extension";
import { IAcDatagridDataExportXlsxExportCallArgs } from "./ac-datagrid-data-export-xlsx-export-call-args.interface";

export interface IAcDatagridDataExportXlsxExportCallHookArgs {
  datagridApi: AcDatagridApi,
  datagridDataExportXlsxExtension: AcDatagridDataExportXlsxExtension,
  args:IAcDatagridDataExportXlsxExportCallArgs;
}
