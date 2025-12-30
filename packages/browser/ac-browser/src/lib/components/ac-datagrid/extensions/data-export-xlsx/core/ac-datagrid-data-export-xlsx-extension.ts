/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AC_DATAGRID_EXTENSION_NAME } from "../../../consts/ac-datagrid-extension-name.const";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { AcEnumDatagridDataExportXlsxHook } from "../enums/ac-enum-datagrid-data-export-xlsx-hook.enum";
import { IAcDatagridDataExportXlsxExportCallArgs } from "../interfaces/ac-datagrid-data-export-xlsx-export-call-args.interface";
import { IAcDatagridDataExportXlsxExportCallHookArgs } from "../interfaces/ac-datagrid-data-export-xlsx-export-call-hook-args.interface";
import { IAcDatagridDataExportXlsxHookArgs } from "../interfaces/ac-datagrid-data-export-xlsx-hook-args.interface";

export class AcDatagridDataExportXlsxExtension extends AcDatagridExtension {
  private _allowXlsxExport: boolean = false;
  get allowXlsxExport(): boolean {
    return this._allowXlsxExport;
  }
  set allowXlsxExport(value: boolean) {
    this._allowXlsxExport = value;
    if (this.datagridApi) {
      const hookArgs: IAcDatagridDataExportXlsxHookArgs = {
        datagridApi: this.datagridApi,
        datagridDataExportXlsxExtension: this,
        value: value
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridDataExportXlsxHook.AllowXlsxExportChange, args: hookArgs });
    }
  }

  exportData(args: IAcDatagridDataExportXlsxExportCallArgs) {
    if (this.datagridApi) {
      const hookArgs: IAcDatagridDataExportXlsxExportCallHookArgs = {
        datagridApi: this.datagridApi,
        datagridDataExportXlsxExtension: this,
        args: args
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridDataExportXlsxHook.ExportData, args: hookArgs });
    }
  }
}

export const AC_DATAGRID_DATA_EXPORT_XLSX_EXTENSION: IAcDatagridExtension = {
  extensionName: AC_DATAGRID_EXTENSION_NAME.DataExportXlsx,
  extensionClass: AcDatagridDataExportXlsxExtension
}
