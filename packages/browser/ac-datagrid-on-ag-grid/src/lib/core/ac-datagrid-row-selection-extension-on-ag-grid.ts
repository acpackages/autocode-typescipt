/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridRowSelectionExtension, AcEnumDatagridExtension, AcEnumDatagridHook, AcEnumDatagridRowSelectionHook, IAcDatagridExtensionEnabledHookArgs, IAcDatagridRowSelectionChangeEvent, IAcDatagridSelectionMultipleRowsChangeEvent } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { GridApi, IRowNode, RowSelectedEvent } from "ag-grid-community";

export class AcDatagridRowSelectionExtensionOnAgGrid {
  agGridExtension!: AcDatagridOnAgGridExtension;
  allowRowSelection: boolean = false;
  datagridApi!: AcDatagridApi;
  gridApi!: GridApi;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.agGridExtension = agGridExtension;
    this.gridApi = agGridExtension.gridApi;
    this.datagridApi = agGridExtension.datagridApi;
    if (this.datagridApi.extensions[AcEnumDatagridExtension.RowSelection]) {
      this.rowSelectionExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowSelection] as AcDatagridRowSelectionExtension;
    }
    this.datagridApi.hooks.subscribeAllHooks({
      callback: (hookName: string, hookArgs: any) => {
        this.handleHook({ hookName: hookName, hookArgs: hookArgs });
      }
    });
    this.gridApi.addEventListener('rowSelected', (args: RowSelectedEvent) => {
      this.handleAgGridRowSelected(args);
    });
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    if (args.extensionName == AcEnumDatagridExtension.RowSelection) {
      this.rowSelectionExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowSelection] as AcDatagridRowSelectionExtension;
      this.setRowSelection();
    }
  }

  handleAgGridRowSelected(args: RowSelectedEvent) {
    this.rowSelectionExtension.setRowSelection({ isSelected: args.node.isSelected() == true, rowId: args.data[this.agGridExtension.rowKey] });
  }

  handleHook({ hookName, hookArgs }: { hookName: string, hookArgs: any }): void {
    if (hookName == AcEnumDatagridHook.ExtensionEnabled) {
      this.handleExtensionEnabled(hookArgs);
    }
    else if (hookName == AcEnumDatagridRowSelectionHook.RowSelectionChange) {
      this.handleRowSelectionChange(hookArgs);
    }
    else if (hookName == AcEnumDatagridRowSelectionHook.MultipleRowSelectionChange) {
      this.handleMultipleRowSelectionChange(hookArgs);
    }
    else if ([
      AcEnumDatagridRowSelectionHook.AllowMultipleSelectionChange,
      AcEnumDatagridRowSelectionHook.AllowSelectionChange
    ].includes(hookName)) {
      this.setRowSelection();
    }
  }

  private handleMultipleRowSelectionChange(args: IAcDatagridSelectionMultipleRowsChangeEvent) {
    const nodes:IRowNode[] = [];
    for(const datagridRow of args.datagridRows){
      const rowNode = this.gridApi.getRowNode(datagridRow.acRowId);
      if (rowNode) {
        nodes.push(rowNode);
      }
    }
    if (nodes.length > 0) {
      this.gridApi.setNodesSelected({ newValue: args.isSelected, nodes: nodes });
    }
  }

  private handleRowSelectionChange(args: IAcDatagridRowSelectionChangeEvent) {
    const rowNode = this.gridApi.getRowNode(args.datagridRow.acRowId);
    if (rowNode) {
      this.gridApi.setNodesSelected({ newValue: args.isSelected, nodes: [rowNode] });
    }
  }

  private setRowSelection() {
    const selectionOption: any = {};
    this.gridApi.setGridOption('rowSelection', selectionOption);
    if (this.rowSelectionExtension) {
      if (this.rowSelectionExtension.allowSelection) {
        if (this.rowSelectionExtension.allowMultipleSelection) {
          selectionOption.mode = 'multiRow';
        }
        else {
          selectionOption.mode = 'singleRow';
        }
      }
    }
  }
}
