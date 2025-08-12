/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridTreeTableExtension, AcEnumDatagridExtension, AcEnumDatagridHook, AcEnumDatagridTreeTableHook, IAcDatagridExtensionEnabledHookArgs } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { GridApi } from "ag-grid-community";
import { AcEnumDatagridOnAgGridHook } from "../enums/ac-enum-datagrid-on-ag-grid-hook.enum";
import { IAcDatagriOnAgGridColDefsChangeHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-col-defs-set-hook-args.interface";
import { arrayRemove } from "@autocode-ts/ac-extensions";
import { IAcDatagriOnAgGridDataChangeHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-data-set-hook-args.interface";
import { IAcDatagriOnAgGridRowAddHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-row-add-hook-args.interface";
import { IAcDatagriOnAgGridRowUpdateHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-row-update-hook-args.interface";

export class AcDatagridTreeTableExtensionOnAgGrid {
  agGridExtension!: AcDatagridOnAgGridExtension;
  datagridApi!: AcDatagridApi;
  gridApi!: GridApi;
  isTreeTable: boolean = false;
  treeDataChildKey: string = '';
  treeDataDisplayKey: string = '';
  treeDataParentKey: string = '';
  treeTableExtension!: AcDatagridTreeTableExtension;

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.agGridExtension = agGridExtension;
    this.gridApi = agGridExtension.gridApi;
    this.datagridApi = agGridExtension.datagridApi;
    if (this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable]) {
      this.treeTableExtension = this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable] as AcDatagridTreeTableExtension;
    }
    this.datagridApi.hooks.subscribeAllHooks({
      callback: (hookName: string, hookArgs: any) => {
        this.handleHook({ hookName: hookName, hookArgs: hookArgs });
      }
    });
  }

  private handleColDefsChange(args: IAcDatagriOnAgGridColDefsChangeHookArgs) {
    if (args.colDefs.length > 0 && this.isTreeTable) {
      for (const colDef of this.agGridExtension.colDefs) {
        if (colDef.field == this.treeDataDisplayKey) {
          // if (colDef.cellRendererParams == undefined) {
          //   colDef.cellRendererParams = {};
          // }
          // const innerRendererParams = { ...colDef.cellRendererParams }
          // if (colDef.cellRenderer) {
          //   colDef.cellRendererParams.innerRenderer = colDef.cellRenderer;
          //   colDef.cellRendererParams.innerRendererParams = innerRendererParams;
          //   colDef.cellRenderer = 'agGroupCellRenderer';
          // }
          this.gridApi.setGridOption('autoGroupColumnDef', colDef);
          this.agGridExtension.colDefs = arrayRemove(this.agGridExtension.colDefs, colDef);
          break;
        }
      }
    }
  }

  private handleDataChange(args: IAcDatagriOnAgGridDataChangeHookArgs) {
    if (args.data.length > 0 && this.isTreeTable) {
      const treeParentIndexes: any = {};
      for (const rowData of args.data) {
        if (this.isTreeTable && rowData[this.treeDataParentKey]) {
          treeParentIndexes[rowData[this.treeDataParentKey]] = rowData[this.agGridExtension.rowKey];
        }
      }
      if (this.isTreeTable) {
        for (const row of args.data) {
          if (row[this.treeDataChildKey] && treeParentIndexes[row[this.treeDataChildKey]]) {
            row[this.agGridExtension.rowParentKey] = treeParentIndexes[row[this.treeDataChildKey]];
          }
          else {
            row[this.agGridExtension.rowParentKey] = null;
          }
        }
      }
    }
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    if (args.extensionName == AcEnumDatagridExtension.TreeTable) {
      this.treeTableExtension = this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable] as AcDatagridTreeTableExtension;
    }
  }

  handleHook({ hookName, hookArgs }: { hookName: string, hookArgs: any }): void {
    if (hookName == AcEnumDatagridHook.ExtensionEnabled) {
      this.handleExtensionEnabled(hookArgs);
    }
    else if (hookName == AcEnumDatagridOnAgGridHook.ColDefsChange) {
      this.handleColDefsChange(hookArgs);
    }
    else if (hookName == AcEnumDatagridOnAgGridHook.DataChange) {
      this.handleDataChange(hookArgs);
    }
    else if (hookName == AcEnumDatagridOnAgGridHook.BeforeRowAdd) {
      this.handleRowAdd(hookArgs);
    }
    else if (hookName == AcEnumDatagridOnAgGridHook.BeforeRowUpdate) {
      this.handleRowUpdate(hookArgs);
    }
    else if ([
      AcEnumDatagridTreeTableHook.TreeDataChildKeyChange,
      AcEnumDatagridTreeTableHook.TreeDataDisplayKeyChange,
      AcEnumDatagridTreeTableHook.TreeDataParentKeyChange
    ].includes(hookName as any)) {
      this.handleTreeDataKeyChangeChange();
    }
  }

  private handleRowAdd(args: IAcDatagriOnAgGridRowAddHookArgs) {
    if (this.isTreeTable && this.treeDataParentKey && this.treeDataChildKey) {
      const data: any = args.data;
      if (data[this.treeDataChildKey]) {
        for (const datagridRow of this.datagridApi.datagridRows) {
          const rowData = datagridRow.data;
          if (rowData[this.treeDataParentKey] == data[this.treeDataChildKey]) {
            data[this.agGridExtension.rowParentKey] = datagridRow.acRowId;
            break;
          }
        }
      }
    }
  }

  private handleRowUpdate(args: IAcDatagriOnAgGridRowUpdateHookArgs) {
    if (this.isTreeTable && this.treeDataParentKey && this.treeDataChildKey) {
      const data: any = args.data;
      if (data[this.treeDataChildKey]) {
        for (const datagridRow of this.datagridApi.datagridRows) {
          const rowData = datagridRow.data;
          if (rowData[this.treeDataParentKey] == data[this.treeDataChildKey]) {
            data[this.agGridExtension.rowParentKey] = datagridRow.acRowId;
            break;
          }
        }
      }
    }
  }

  private handleTreeDataKeyChangeChange() {
    const treeTableExtension: AcDatagridTreeTableExtension = this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable] as AcDatagridTreeTableExtension;
    this.treeDataChildKey = treeTableExtension.treeDataChildKey;
    this.treeDataDisplayKey = treeTableExtension.treeDataDisplayKey;
    this.treeDataParentKey = treeTableExtension.treeDataParentKey;
    if (this.treeDataChildKey != '' && this.treeDataDisplayKey != '' && this.treeDataParentKey != '') {
      this.isTreeTable = true;
      this.gridApi.setGridOption('treeData', true);
      this.gridApi.setGridOption('treeDataParentIdField', this.agGridExtension.rowParentKey);
      this.agGridExtension.setColumnDefs();
    }
  }


}
