/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridTreeTableExtension, AC_DATAGRID_EXTENSION_NAME, AC_DATAGRID_HOOK, AcEnumDatagridTreeTableHook, IAcDatagridExtensionEnabledHookArgs } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { GridApi } from "ag-grid-community";
import { AcEnumDatagridOnAgGridHook } from "../enums/ac-enum-datagrid-on-ag-grid-hook.enum";
import { IAcDatagriOnAgGridColDefsChangeHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-col-defs-set-hook-args.interface";
import { arrayRemove } from "@autocode-ts/ac-extensions";
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

  private handleHook:Function = ({ hook, args }: { hook: string, args: any }): void => {
    if (hook === AC_DATAGRID_HOOK.ExtensionEnable) {
      this.handleExtensionEnabled(args);
    } else if (hook === AcEnumDatagridOnAgGridHook.ColDefsChange) {
      this.handleColDefsChange(args);
    } else if (hook === AcEnumDatagridOnAgGridHook.DataChange) {
      this.handleDataChange(args);
    } else if (hook === AcEnumDatagridOnAgGridHook.BeforeRowAdd) {
      this.handleRowAdd(args);
    } else if (hook === AcEnumDatagridOnAgGridHook.BeforeRowUpdate) {
      this.handleRowUpdate(args);
    } else if ([
      AcEnumDatagridTreeTableHook.TreeDataChildKeyChange,
      AcEnumDatagridTreeTableHook.TreeDataDisplayKeyChange,
      AcEnumDatagridTreeTableHook.TreeDataParentKeyChange
    ].includes(hook as any)) {
      this.handleTreeDataKeyChangeChange();
    }
  }

  destroy(){
    this.destroy();
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

  private handleColDefsChange(args: IAcDatagriOnAgGridColDefsChangeHookArgs) {
    if (this.agGridExtension && this.gridApi && args.colDefs.length > 0 && this.isTreeTable) {
      for (const colDef of this.agGridExtension.colDefs) {
        if (colDef.field === this.treeDataDisplayKey) {
          this.gridApi.setGridOption('autoGroupColumnDef', colDef);
          this.agGridExtension.colDefs = arrayRemove(this.agGridExtension.colDefs, colDef);
          break;
        }
      }
    }
  }

  private handleDataChange(args: IAcDatagriOnAgGridDataChangeHookArgs) {
    if (this.agGridExtension && args.data.length > 0 && this.isTreeTable) {
      const treeParentIndexes: Record<string, any> = {};
      for (const rowData of args.data) {
        if (rowData[this.treeDataParentKey]) {
          treeParentIndexes[rowData[this.treeDataParentKey]] = rowData[this.agGridExtension.rowKey];
        }
      }

      for (const row of args.data) {
        if (row[this.treeDataChildKey] && treeParentIndexes[row[this.treeDataChildKey]]) {
          row[this.agGridExtension.rowParentKey] = treeParentIndexes[row[this.treeDataChildKey]];
        } else {
          row[this.agGridExtension.rowParentKey] = null;
        }
      }
    }
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    if (args.extensionName === AC_DATAGRID_EXTENSION_NAME.TreeTable) {
      this.setExtension();
    }
  }

  private handleRowAdd(args: IAcDatagriOnAgGridRowAddHookArgs) {
    if (this.agGridExtension && this.datagridApi && this.isTreeTable && this.treeDataParentKey && this.treeDataChildKey) {
      const data: any = args.data;
      if (data[this.treeDataChildKey]) {
        for (const datagridRow of this.datagridApi.datagridRows) {
          const rowData = datagridRow.data;
          if (rowData[this.treeDataParentKey] === data[this.treeDataChildKey]) {
            data[this.agGridExtension.rowParentKey] = datagridRow.rowId;
            break;
          }
        }
      }
    }
  }

  private handleRowUpdate(args: IAcDatagriOnAgGridRowUpdateHookArgs) {
    if (this.datagridApi && this.agGridExtension && this.isTreeTable && this.treeDataParentKey && this.treeDataChildKey) {
      const data: any = args.data;
      if (data[this.treeDataChildKey]) {
        for (const datagridRow of this.datagridApi.datagridRows) {
          const rowData = datagridRow.data;
          if (rowData[this.treeDataParentKey] === data[this.treeDataChildKey]) {
            data[this.agGridExtension.rowParentKey] = datagridRow.rowId;
            break;
          }
        }
      }
    }
  }

  private handleTreeDataKeyChangeChange() {
    if(this.datagridApi && this.agGridExtension){
      const treeTableExtension: AcDatagridTreeTableExtension = this.datagridApi.extensions[AC_DATAGRID_EXTENSION_NAME.TreeTable] as AcDatagridTreeTableExtension;
      this.treeDataChildKey = treeTableExtension.treeDataChildKey;
      this.treeDataDisplayKey = treeTableExtension.treeDataDisplayKey;
      this.treeDataParentKey = treeTableExtension.treeDataParentKey;

      if (this.treeDataChildKey !== '' && this.treeDataDisplayKey !== '' && this.treeDataParentKey !== '' && this.gridApi) {
        this.isTreeTable = true;
        this.gridApi.setGridOption('treeData', true);
        this.gridApi.setGridOption('treeDataParentIdField', this.agGridExtension.rowParentKey);
        this.agGridExtension.setColumnDefs();
      }
    }

  }

  init({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }){
    this.agGridExtension = agGridExtension;
    this.datagridApi = agGridExtension.datagridApi;
    this.datagridApi.hooks.subscribeAllHooks({callback: this.handleHook});
    if(this.agGridExtension.gridApi){
      this.gridApi = this.agGridExtension.gridApi;
      this.setExtension();
    }
  }

  private setExtension(){
    if(this.datagridApi){
      this.treeTableExtension = this.datagridApi.extensions[AC_DATAGRID_EXTENSION_NAME.TreeTable] as AcDatagridTreeTableExtension;
    }
  }
}
