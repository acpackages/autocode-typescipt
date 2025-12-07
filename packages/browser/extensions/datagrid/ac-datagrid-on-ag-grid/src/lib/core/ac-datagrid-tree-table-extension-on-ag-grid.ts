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
import { AcLogger } from "@autocode-ts/autocode";

export class AcDatagridTreeTableExtensionOnAgGrid {
  agGridExtension!: AcDatagridOnAgGridExtension;
  datagridApi!: AcDatagridApi;
  gridApi!: GridApi;
  isTreeTable: boolean = false;
  treeDataChildKey: string = '';
  treeDataDisplayKey: string = '';
  treeDataParentKey: string = '';
  treeTableExtension!: AcDatagridTreeTableExtension;
  logger!:AcLogger;

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.logger = agGridExtension.logger;
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: Logger assigned.");
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: Starting initialization.");
    this.agGridExtension = agGridExtension;
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: AgGridExtension assigned.");
    this.gridApi = agGridExtension.gridApi;
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: GridApi assigned.");
    this.datagridApi = agGridExtension.datagridApi;
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: DatagridApi assigned.");
    if (this.datagridApi.extensions[AC_DATAGRID_EXTENSION_NAME.TreeTable]) {
      this.treeTableExtension = this.datagridApi.extensions[AC_DATAGRID_EXTENSION_NAME.TreeTable] as AcDatagridTreeTableExtension;
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: TreeTableExtension assigned.");
    } else {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: No TreeTableExtension available.");
    }
    this.datagridApi.hooks.subscribeAllHooks({
      callback: (hook: string, args: any) => {
        this.handleHook({ hook: hook, args: args });
      }
    });
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: Hooks subscribed.");
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] Constructor: Exiting constructor.");
  }

  private handleColDefsChange(args: IAcDatagriOnAgGridColDefsChangeHookArgs) {
    this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleColDefsChange: Entering with colDefs.length=${args.colDefs.length}.`);
    if (args.colDefs.length > 0 && this.isTreeTable) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleColDefsChange: TreeTable mode with colDefs available.");
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
          this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleColDefsChange: Found displayKey colDef=${colDef.field}, setting autoGroupColumnDef.`);
          this.gridApi.setGridOption('autoGroupColumnDef', colDef);
          this.agGridExtension.colDefs = arrayRemove(this.agGridExtension.colDefs, colDef);
          this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleColDefsChange: Removed colDef from agGridExtension.colDefs.");
          break;
        }
      }
    } else {
      this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleColDefsChange: Skipping - colDefs empty or not TreeTable (colDefs=${args.colDefs.length}, isTreeTable=${this.isTreeTable}).`);
    }
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleColDefsChange: Exiting.");
  }

  private handleDataChange(args: IAcDatagriOnAgGridDataChangeHookArgs) {
    this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleDataChange: Entering with data.length=${args.data.length}.`);
    if (args.data.length > 0 && this.isTreeTable) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleDataChange: TreeTable mode with data available.");
      const treeParentIndexes: any = {};
      for (const rowData of args.data) {
        if (this.isTreeTable && rowData[this.treeDataParentKey]) {
          treeParentIndexes[rowData[this.treeDataParentKey]] = rowData[this.agGridExtension.rowKey];
          this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleDataChange: Indexed parent ${rowData[this.treeDataParentKey]} to ${rowData[this.agGridExtension.rowKey]}.`);
        }
      }
      if (this.isTreeTable) {
        for (const row of args.data) {
          if (row[this.treeDataChildKey] && treeParentIndexes[row[this.treeDataChildKey]]) {
            row[this.agGridExtension.rowParentKey] = treeParentIndexes[row[this.treeDataChildKey]];
            this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleDataChange: Set rowParentKey for row to ${row[this.agGridExtension.rowParentKey]}.`);
          }
          else {
            row[this.agGridExtension.rowParentKey] = null;
            this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleDataChange: Set rowParentKey to null for root row.`);
          }
        }
      }
    } else {
      this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleDataChange: Skipping - data empty or not TreeTable (data=${args.data.length}, isTreeTable=${this.isTreeTable}).`);
    }
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleDataChange: Exiting.");
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleExtensionEnabled: Entering with extensionName=${args.extensionName}.`);
    if (args.extensionName == AC_DATAGRID_EXTENSION_NAME.TreeTable) {
      this.treeTableExtension = this.datagridApi.extensions[AC_DATAGRID_EXTENSION_NAME.TreeTable] as AcDatagridTreeTableExtension;
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleExtensionEnabled: TreeTableExtension assigned.");
    } else {
      this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleExtensionEnabled: Unknown extension ${args.extensionName}, skipping.`);
    }
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleExtensionEnabled: Exiting.");
  }

  handleHook({ hook, args }: { hook: string, args: any }): void {
    this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Entering with hook=${hook}.`);
    if (hook == AC_DATAGRID_HOOK.ExtensionEnable) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Handling ExtensionEnable.");
      this.handleExtensionEnabled(args);
    }
    else if (hook == AcEnumDatagridOnAgGridHook.ColDefsChange) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Handling ColDefsChange.");
      this.handleColDefsChange(args);
    }
    else if (hook == AcEnumDatagridOnAgGridHook.DataChange) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Handling DataChange.");
      this.handleDataChange(args);
    }
    else if (hook == AcEnumDatagridOnAgGridHook.BeforeRowAdd) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Handling BeforeRowAdd.");
      this.handleRowAdd(args);
    }
    else if (hook == AcEnumDatagridOnAgGridHook.BeforeRowUpdate) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Handling BeforeRowUpdate.");
      this.handleRowUpdate(args);
    }
    else if ([
      AcEnumDatagridTreeTableHook.TreeDataChildKeyChange,
      AcEnumDatagridTreeTableHook.TreeDataDisplayKeyChange,
      AcEnumDatagridTreeTableHook.TreeDataParentKeyChange
    ].includes(hook as any)) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Handling TreeDataKeyChange.");
      this.handleTreeDataKeyChangeChange();
    }
    else {
      this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Unknown hook ${hook}, skipping.`);
    }
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleHook: Exiting.");
  }

  private handleRowAdd(args: IAcDatagriOnAgGridRowAddHookArgs) {
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowAdd: Entering.");
    if (this.isTreeTable && this.treeDataParentKey && this.treeDataChildKey) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowAdd: TreeTable mode with keys available.");
      const data: any = args.data;
      if (data[this.treeDataChildKey]) {
        this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleRowAdd: Row has childKey=${data[this.treeDataChildKey]}.`);
        for (const datagridRow of this.datagridApi.datagridRows) {
          const rowData = datagridRow.data;
          if (rowData[this.treeDataParentKey] == data[this.treeDataChildKey]) {
            data[this.agGridExtension.rowParentKey] = datagridRow.rowId;
            this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleRowAdd: Set rowParentKey to ${datagridRow.rowId}.`);
            break;
          }
        }
      } else {
        this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowAdd: Row has no childKey, skipping parent lookup.");
      }
    } else {
      this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleRowAdd: Skipping - not TreeTable or keys missing (isTreeTable=${this.isTreeTable}, parentKey=${!!this.treeDataParentKey}, childKey=${!!this.treeDataChildKey}).`);
    }
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowAdd: Exiting.");
  }

  private handleRowUpdate(args: IAcDatagriOnAgGridRowUpdateHookArgs) {
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowUpdate: Entering.");
    if (this.isTreeTable && this.treeDataParentKey && this.treeDataChildKey) {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowUpdate: TreeTable mode with keys available.");
      const data: any = args.data;
      if (data[this.treeDataChildKey]) {
        this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleRowUpdate: Row has childKey=${data[this.treeDataChildKey]}.`);
        for (const datagridRow of this.datagridApi.datagridRows) {
          const rowData = datagridRow.data;
          if (rowData[this.treeDataParentKey] == data[this.treeDataChildKey]) {
            data[this.agGridExtension.rowParentKey] = datagridRow.rowId;
            this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleRowUpdate: Set rowParentKey to ${datagridRow.rowId}.`);
            break;
          }
        }
      } else {
        this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowUpdate: Row has no childKey, skipping parent lookup.");
      }
    } else {
      this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleRowUpdate: Skipping - not TreeTable or keys missing (isTreeTable=${this.isTreeTable}, parentKey=${!!this.treeDataParentKey}, childKey=${!!this.treeDataChildKey}).`);
    }
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleRowUpdate: Exiting.");
  }

  private handleTreeDataKeyChangeChange() {
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleTreeDataKeyChangeChange: Entering.");
    const treeTableExtension: AcDatagridTreeTableExtension = this.datagridApi.extensions[AC_DATAGRID_EXTENSION_NAME.TreeTable] as AcDatagridTreeTableExtension;
    this.treeDataChildKey = treeTableExtension.treeDataChildKey;
    this.treeDataDisplayKey = treeTableExtension.treeDataDisplayKey;
    this.treeDataParentKey = treeTableExtension.treeDataParentKey;
    this.logger.log(`[AcDatagridTreeTableExtensionOnAgGrid] handleTreeDataKeyChangeChange: Updated keys - childKey=${this.treeDataChildKey}, displayKey=${this.treeDataDisplayKey}, parentKey=${this.treeDataParentKey}.`);
    if (this.treeDataChildKey != '' && this.treeDataDisplayKey != '' && this.treeDataParentKey != '') {
      this.isTreeTable = true;
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleTreeDataKeyChangeChange: All keys valid, enabling TreeTable mode.");
      this.gridApi.setGridOption('treeData', true);
      this.gridApi.setGridOption('treeDataParentIdField', this.agGridExtension.rowParentKey);
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleTreeDataKeyChangeChange: Set grid options for treeData.");
      this.agGridExtension.setColumnDefs();
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleTreeDataKeyChangeChange: Updated column defs.");
    } else {
      this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleTreeDataKeyChangeChange: Incomplete keys, TreeTable mode not enabled.");
    }
    this.logger.log("[AcDatagridTreeTableExtensionOnAgGrid] handleTreeDataKeyChangeChange: Exiting.");
  }

}
