/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { AcEnumDatagridColumnDraggingHook } from "../enums/ac-enum-datagrid-column-dragging-hook.enum";
import { IAcDatagridColumnDraggingHookArgs } from "../interfaces/ac-datagrid-column-dragging-hook-args.interface";


export class AcDatagridColumnDraggingExtension extends AcDatagridExtension {
  private _allowColumnDragging:boolean = true;
  get allowColumnDragging():boolean{
    return this._allowColumnDragging;
  }
  set allowColumnDragging(value:boolean){
    this._allowColumnDragging = value;
    const hookArgs:IAcDatagridColumnDraggingHookArgs = {
      datagridApi:this.datagridApi,
      datagridColumnDraggingExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridColumnDraggingHook.AllowColumnDraggingChange,args:hookArgs});
  }
}

export const AcColumnDraggingDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.ColumnDragging,
  extensionClass: AcDatagridColumnDraggingExtension
}
