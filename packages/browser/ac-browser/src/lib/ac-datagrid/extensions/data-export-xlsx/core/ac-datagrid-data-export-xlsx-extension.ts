/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { AcEnumDatagridDataExportXlsxHook } from "../enums/ac-enum-datagrid-data-export-xlsx-hook.enum";
import { IAcDatagridDataExportXlsxExportCallArgs } from "../interfaces/ac-datagrid-data-export-xlsx-export-call-args.interface";
import { IAcDatagridDataExportXlsxExportCallHookArgs } from "../interfaces/ac-datagrid-data-export-xlsx-export-call-hook-args.interface";
import { IAcDatagridDataExportXlsxHookArgs } from "../interfaces/ac-datagrid-data-export-xlsx-hook-args.interface";

export class AcDatagridDataExportXlsxExtension extends AcDatagridExtension {
  private _allowXlsxExport:boolean = false;
  get allowXlsxExport():boolean{
    return this._allowXlsxExport;
  }
  set allowXlsxExport(value:boolean){
    this._allowXlsxExport = value;
    const hookArgs:IAcDatagridDataExportXlsxHookArgs = {
      datagridApi:this.datagridApi,
      datagridDataExportXlsxExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridDataExportXlsxHook.AllowXlsxExportChange,args:hookArgs});
  }

  exportData(args:IAcDatagridDataExportXlsxExportCallArgs){
    const hookArgs:IAcDatagridDataExportXlsxExportCallHookArgs = {
      datagridApi:this.datagridApi,
      datagridDataExportXlsxExtension:this,
      args:args
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridDataExportXlsxHook.ExportData,args:hookArgs});
  }
}

export const AcDataExportXlsxDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.DataExportXlsx,
  extensionClass: AcDatagridDataExportXlsxExtension
}
