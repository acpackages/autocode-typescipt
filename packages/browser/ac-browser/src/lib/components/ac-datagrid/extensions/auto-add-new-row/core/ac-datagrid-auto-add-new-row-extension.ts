/* eslint-disable @typescript-eslint/no-inferrable-types */
import { stringEqualsIgnoreCase } from "@autocode-ts/ac-extensions";
import { AcDatagridCell, AcDatagridRow, AcEnumDatagridHook } from "../../../_ac-datagrid.export";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
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
      if(stringEqualsIgnoreCase(hook,AcEnumDatagridHook.CellValueChange)){
        const datagridCell:AcDatagridCell = args.datagridCell;
        const datagridRow:AcDatagridRow = datagridCell.datagridRow;
        if(datagridRow.isLast){
          this.datagridApi.addRow();
        }
      }
    }
  }
}

export const AcAutoAddNewRowDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.AutoAddNewRow,
  extensionClass: AcDatagridAutoAddNewRowExtension
}
