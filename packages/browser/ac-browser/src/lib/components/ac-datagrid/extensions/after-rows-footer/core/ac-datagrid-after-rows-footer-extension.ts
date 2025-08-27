/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { AcEnumDatagridAfterRowsFooterHook } from "../enums/ac-enum-datagrid-after-rows-footer-hook.enum";
import { IAcDatagridAfterRowsFooterHookArgs } from "../interfaces/ac-datagrid-after-rows-footer-hook-args.interface";

export class AcDatagridAfterRowsFooterExtension extends AcDatagridExtension {
  private _footerElement?:HTMLElement;
  get footerElement():HTMLElement|undefined{
    return this._footerElement;
  }
  set footerElement(value:HTMLElement){
    this._footerElement = value;
    const hookArgs:IAcDatagridAfterRowsFooterHookArgs = {
      datagridApi:this.datagridApi,
      datagridAfterRowsFooterExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hook:AcEnumDatagridAfterRowsFooterHook.AfterRowsFooterElementChange,args:hookArgs});
  }
}

export const AcAfterRowsFooterDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.AfterRowsFooter,
  extensionClass: AcDatagridAfterRowsFooterExtension
}
