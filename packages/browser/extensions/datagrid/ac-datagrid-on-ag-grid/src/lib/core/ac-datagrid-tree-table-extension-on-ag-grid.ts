/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridTreeTableExtension, AC_DATAGRID_EXTENSION_NAME, AC_DATAGRID_HOOK, AcEnumDatagridTreeTableHook, IAcDatagridExtensionEnabledHookArgs } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { GridApi } from "ag-grid-community";
import { AcEnumDatagridOnAgGridHook } from "../enums/ac-enum-datagrid-on-ag-grid-hook.enum";
import { IAcDatagriOnAgGridColDefsChangeHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-col-defs-set-hook-args.interface";
import { arrayRemove, stringEqualsIgnoreCase } from "@autocode-ts/ac-extensions";
import { IAcDatagriOnAgGridDataChangeHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-data-set-hook-args.interface";
import { IAcDatagriOnAgGridRowAddHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-row-add-hook-args.interface";
import { IAcDatagriOnAgGridRowUpdateHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-row-update-hook-args.interface";

export class AcDatagridTreeTableExtensionOnAgGrid {
  agGridExtension?: AcDatagridOnAgGridExtension|null;
  datagridApi?: AcDatagridApi|null;
  gridApi?: GridApi|null;
  isTreeTable: boolean = false;
  treeDataChildKey: string = '';
  treeDataDisplayKey: string = '';
  treeDataParentKey: string = '';
  treeTableExtension?: AcDatagridTreeTableExtension|null;

  private handleHook:Function = (hook: string, args: any): void => {
    if (stringEqualsIgnoreCase(hook,AC_DATAGRID_HOOK.ExtensionEnable)) {
      this.handleExtensionEnabled(args);
    } else if (stringEqualsIgnoreCase(hook,AcEnumDatagridOnAgGridHook.ColDefsChange)) {
      this.setGroupColumnDef();
    } else if (
      stringEqualsIgnoreCase(hook,AcEnumDatagridTreeTableHook.TreeDataChildKeyChange)
      || stringEqualsIgnoreCase(hook,AcEnumDatagridTreeTableHook.TreeDataDisplayKeyChange)
      || stringEqualsIgnoreCase(hook,AcEnumDatagridTreeTableHook.TreeDataParentKeyChange)
    ) {
      this.handleTreeDataKeyChangeChange();
    }
  }

  destroy(){
    if(this.agGridExtension){
      this.agGridExtension = null;
    }
    if(this.gridApi){
      this.gridApi = null;
    }
    if(this.treeTableExtension){
      this.treeTableExtension = null;
    }
    if(this.datagridApi){
      this.datagridApi.hooks.unsubscribeAllHooks({callback:this.handleHook});
      this.datagridApi = null;
    }
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    if (args.extensionName === AC_DATAGRID_EXTENSION_NAME.TreeTable) {
      this.setExtension();
    }
  }

  private handleTreeDataKeyChangeChange() {
    if(this.datagridApi && this.agGridExtension && this.treeTableExtension){
      this.treeDataChildKey = this.treeTableExtension.treeDataChildKey;
      this.treeDataDisplayKey = this.treeTableExtension.treeDataDisplayKey;
      this.treeDataParentKey = this.treeTableExtension.treeDataParentKey;
      if (this.treeDataChildKey !== '' && this.treeDataDisplayKey !== '' && this.treeDataParentKey !== '') {
        this.isTreeTable = true;
        this.datagridApi.dataManager.assignUniqueIdToData = true;
        this.datagridApi.dataManager.assignUniqueParentIdToData = true;
        this.datagridApi.dataManager.dataUniqueValueKey = this.treeDataChildKey;
        this.datagridApi.dataManager.dataParentUniqueValueKey = this.treeDataParentKey;
        this.agGridExtension.gridOptions['treeData'] = true;
        this.agGridExtension.gridOptions['treeDataParentIdField'] = this.agGridExtension.rowParentKey;
        if(this.gridApi){
          this.gridApi.setGridOption('treeData', true);
          this.gridApi.setGridOption('treeDataParentIdField', this.agGridExtension.rowParentKey);
        }
        this.setGroupColumnDef();
      }
    }

  }

  init({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }){
    this.destroy();
    this.agGridExtension = agGridExtension;
    this.datagridApi = agGridExtension.datagridApi;
    this.datagridApi.hooks.subscribeAllHooks({callback: this.handleHook});
    if(this.agGridExtension.gridApi){
      this.gridApi = this.agGridExtension.gridApi;
    }
    this.setExtension();
  }

  private setExtension(){
    if(this.datagridApi){
      this.treeTableExtension = this.datagridApi.extensions[AC_DATAGRID_EXTENSION_NAME.TreeTable] as AcDatagridTreeTableExtension;
      this.handleTreeDataKeyChangeChange();
      this.setGroupColumnDef();
    }
  }

  private setGroupColumnDef() {
    if (this.agGridExtension && this.agGridExtension.colDefs.length > 0 && this.isTreeTable) {
      for (const colDef of this.agGridExtension.colDefs) {
        if (colDef.field === this.treeDataDisplayKey) {
          this.agGridExtension.gridOptions['autoGroupColumnDef'] = colDef;
          this.agGridExtension.colDefs = arrayRemove(this.agGridExtension.colDefs, colDef);
          if(this.gridApi){
            this.gridApi.setGridOption('autoGroupColumnDef', colDef);
          }
          break;
        }
      }
    }
  }
}
