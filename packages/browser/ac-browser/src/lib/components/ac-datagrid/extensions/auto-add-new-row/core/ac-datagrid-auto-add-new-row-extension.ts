/* eslint-disable @typescript-eslint/no-inferrable-types */
import { stringEqualsIgnoreCase } from "@autocode-ts/ac-extensions";
import { IAcDatagridCell, IAcDatagridRow, AC_DATAGRID_HOOK } from "../../../_ac-datagrid.export";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AC_DATAGRID_EXTENSION_NAME } from "../../../consts/ac-datagrid-extension-name.const";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { AcEnumDatagridAutoAddNewRowHook } from "../enums/ac-enum-datagrid-auto-add-new-row-hook.enum";
import { IAcDatagridAutoAddNewRowHookArgs } from "../interfaces/ac-datagrid-auto-add-new-row-hook-args.interface";

export class AcDatagridAutoAddNewRowExtension extends AcDatagridExtension {
  private _autoAddNewRow:boolean = false;
  get autoAddNewRow():boolean{
    return this._autoAddNewRow;
  }
  set autoAddNewRow(value:boolean){
    this._autoAddNewRow = value;
    const hookArgs:IAcDatagridAutoAddNewRowHookArgs = {
      datagridApi:this.datagridApi,
      datagridAutoAddNewRowExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hook:AcEnumDatagridAutoAddNewRowHook.AutoAddNewRowValueChange,args:hookArgs});
  }

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
    if(this.autoAddNewRow) {
      if(stringEqualsIgnoreCase(hook,AC_DATAGRID_HOOK.CellValueChange)){
        const datagridCell:IAcDatagridCell = args.datagridCell;
        const datagridRow:IAcDatagridRow = datagridCell.datagridRow;
        if(datagridRow.index == this.datagridApi.dataManager.totalRows - 1){
          this.datagridApi.addRow();
        }
      }
    }
  }
}

export const AcAutoAddNewRowDatagridExtension: IAcDatagridExtension = {
  extensionName: AC_DATAGRID_EXTENSION_NAME.AutoAddNewRow,
  extensionClass: AcDatagridAutoAddNewRowExtension
}
