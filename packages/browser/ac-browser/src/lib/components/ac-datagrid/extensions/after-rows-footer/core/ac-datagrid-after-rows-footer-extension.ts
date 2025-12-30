/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AC_DATAGRID_EXTENSION_NAME } from "../../../consts/ac-datagrid-extension-name.const";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { AcEnumDatagridAfterRowsFooterHook } from "../enums/ac-enum-datagrid-after-rows-footer-hook.enum";
import { IAcDatagridAfterRowsFooterHookArgs } from "../interfaces/ac-datagrid-after-rows-footer-hook-args.interface";

export class AcDatagridAfterRowsFooterExtension extends AcDatagridExtension {
  private _footerElement?: HTMLElement;
  get footerElement(): HTMLElement | undefined {
    return this._footerElement;
  }
  set footerElement(value: HTMLElement) {
    this._footerElement = value;
    if (this.datagridApi) {
      const hookArgs: IAcDatagridAfterRowsFooterHookArgs = {
        datagridApi: this.datagridApi,
        datagridAfterRowsFooterExtension: this,
        value: value
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridAfterRowsFooterHook.AfterRowsFooterElementChange, args: hookArgs });
    }
  }
}

export const AC_DATAGRID_AFTER_ROWS_FOOTER_EXTENSION: IAcDatagridExtension = {
  extensionName: AC_DATAGRID_EXTENSION_NAME.AfterRowsFooter,
  extensionClass: AcDatagridAfterRowsFooterExtension
}
