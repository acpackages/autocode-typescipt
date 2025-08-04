/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { AcEnumDatagridColumnsCustomizerHook } from "../enums/ac-enum-datagrid-columns-customizer-hook.enum";
import { IAcDatagridColumnsCustomizerHookArgs } from "../interfaces/ac-datagrid-columns-customizer-hook-args.interface";

export class AcDatagridColumnsCustomizerExtension extends AcDatagridExtension {
  private _showColumnCustomizerPanel:boolean = false;
  get showColumnCustomizerPanel():boolean{
    return this._showColumnCustomizerPanel;
  }
  set showColumnCustomizerPanel(value:boolean){
    this._showColumnCustomizerPanel = value;
    const hookArgs:IAcDatagridColumnsCustomizerHookArgs = {
      datagridApi:this.datagridApi,
      datagridColumnsCustomizerExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridColumnsCustomizerHook.ShowColumnsCustomizerPanelChange,args:hookArgs});
  }

  private _isCustomizerOpen:boolean = false;
  get isCustomizerOpen():boolean{
    return this._isCustomizerOpen;
  }
  set isCustomizerOpen(value:boolean){
    this._isCustomizerOpen = value;
    const hookArgs:IAcDatagridColumnsCustomizerHookArgs = {
      datagridApi:this.datagridApi,
      datagridColumnsCustomizerExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridColumnsCustomizerHook.IsCustomizerOpenChange,args:hookArgs});
  }

  toggleColumnsCustomizer() {
    this.isCustomizerOpen = !this.isCustomizerOpen;
    const hookArgs:IAcDatagridColumnsCustomizerHookArgs = {
      datagridApi:this.datagridApi,
      datagridColumnsCustomizerExtension:this,
      value:this.isCustomizerOpen
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridColumnsCustomizerHook.ToggleColumnsCustomizerPanel,args:hookArgs});
  }
}

export const AcColumnsCustomizerDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.ColumnsCustomizer,
  extensionClass: AcDatagridColumnsCustomizerExtension
}
