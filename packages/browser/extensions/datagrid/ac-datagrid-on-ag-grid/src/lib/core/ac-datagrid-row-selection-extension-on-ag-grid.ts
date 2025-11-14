/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridRowSelectionExtension, AcEnumDatagridExtension, AcEnumDatagridHook, AcEnumDatagridRowSelectionHook, IAcDatagridExtensionEnabledHookArgs, IAcDatagridRowSelectionChangeEvent, IAcDatagridSelectionMultipleRowsChangeEvent } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { GridApi, IRowNode, RowSelectedEvent } from "ag-grid-community";
import { AcLogger } from "@autocode-ts/autocode";

export class AcDatagridRowSelectionExtensionOnAgGrid {
  agGridExtension!: AcDatagridOnAgGridExtension;
  allowRowSelection: boolean = false;
  datagridApi!: AcDatagridApi;
  gridApi!: GridApi;
  rowSelectionExtension!: AcDatagridRowSelectionExtension;
  logger!:AcLogger;

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.logger = agGridExtension.logger;
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: Logger assigned.");
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: Starting initialization.");
    this.agGridExtension = agGridExtension;
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: AgGridExtension assigned.");
    this.gridApi = agGridExtension.gridApi;
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: GridApi assigned.");
    this.datagridApi = agGridExtension.datagridApi;
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: DatagridApi assigned.");
    if (this.datagridApi.extensions[AcEnumDatagridExtension.RowSelection]) {
      this.rowSelectionExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowSelection] as AcDatagridRowSelectionExtension;
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: RowSelectionExtension assigned.");
    } else {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: No RowSelectionExtension available.");
    }
    this.datagridApi.hooks.subscribeAllHooks({
      callback: (hook: string, args: any) => {
        this.handleHook({ hook: hook, args: args });
      }
    });
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: Hooks subscribed.");
    this.gridApi.addEventListener('rowSelected', (args: RowSelectedEvent) => {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] rowSelected: Event triggered.");
      this.handleAgGridRowSelected(args);
    });
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: Registered rowSelected listener.");
    // this.gridApi.addEventListener('selectionChanged', (event: SelectionChangedEvent) => {
    //   this.datagridApi.eventHandler.handleSelectionChange({ datagridCell: this.agGridExtension.getDatagridCellFromEvent({ event: event }), event: event.event as any });
    // });
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: Skipped selectionChanged listener (commented).");
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] Constructor: Exiting constructor.");
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleExtensionEnabled: Entering with extensionName=${args.extensionName}.`);
    if (args.extensionName == AcEnumDatagridExtension.RowSelection) {
      this.rowSelectionExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowSelection] as AcDatagridRowSelectionExtension;
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleExtensionEnabled: RowSelectionExtension assigned.");
      this.setRowSelection();
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleExtensionEnabled: Row selection set.");
    } else {
      this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleExtensionEnabled: Unknown extension ${args.extensionName}, skipping.`);
    }
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleExtensionEnabled: Exiting.");
  }

  handleAgGridRowSelected(args: RowSelectedEvent) {
    this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleAgGridRowSelected: Entering with rowId=${args.data[this.agGridExtension.rowKey]}, isSelected=${args.node.isSelected()}.`);
    this.rowSelectionExtension.setRowSelection({ isSelected: args.node.isSelected() == true, rowId: args.data[this.agGridExtension.rowKey] });
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleAgGridRowSelected: Updated row selection in extension. Exiting.");
  }

  handleHook({ hook, args }: { hook: string, args: any }): void {
    this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleHook: Entering with hook=${hook}.`);
    if (hook == AcEnumDatagridHook.ExtensionEnable) {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleHook: Handling ExtensionEnable.");
      this.handleExtensionEnabled(args);
    }
    else if (hook == AcEnumDatagridRowSelectionHook.RowSelectionChange) {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleHook: Handling RowSelectionChange.");
      this.handleRowSelectionChange(args);
    }
    else if (hook == AcEnumDatagridRowSelectionHook.MultipleRowSelectionChange) {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleHook: Handling MultipleRowSelectionChange.");
      this.handleMultipleRowSelectionChange(args);
    }
    else if ([
      AcEnumDatagridRowSelectionHook.AllowMultipleSelectionChange,
      AcEnumDatagridRowSelectionHook.AllowSelectionChange
    ].includes(hook)) {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleHook: Handling selection mode change.");
      this.setRowSelection();
    }
    else {
      this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleHook: Unknown hook ${hook}, skipping.`);
    }
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleHook: Exiting.");
  }

  private handleMultipleRowSelectionChange(args: IAcDatagridSelectionMultipleRowsChangeEvent) {
    this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleMultipleRowSelectionChange: Entering with isSelected=${args.isSelected}, rowsCount=${args.datagridRows.length}.`);
    const nodes:IRowNode[] = [];
    for(const datagridRow of args.datagridRows){
      const rowNode = this.gridApi.getRowNode(datagridRow.rowId);
      if (rowNode) {
        nodes.push(rowNode);
        this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleMultipleRowSelectionChange: Added node for rowId=${datagridRow.rowId}.`);
      } else {
        this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleMultipleRowSelectionChange: No node found for rowId=${datagridRow.rowId}.`);
      }
    }
    if (nodes.length > 0) {
      this.gridApi.setNodesSelected({ newValue: args.isSelected, nodes: nodes });
      this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleMultipleRowSelectionChange: Set selection for ${nodes.length} nodes.`);
    } else {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleMultipleRowSelectionChange: No nodes to select, skipping.");
    }
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleMultipleRowSelectionChange: Exiting.");
  }

  private handleRowSelectionChange(args: IAcDatagridRowSelectionChangeEvent) {
    this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleRowSelectionChange: Entering with rowId=${args.datagridRow.rowId}, isSelected=${args.isSelected}.`);
    const rowNode = this.gridApi.getRowNode(args.datagridRow.rowId);
    if (rowNode) {
      this.gridApi.setNodesSelected({ newValue: args.isSelected, nodes: [rowNode] });
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleRowSelectionChange: Set selection for row node.");
    } else {
      this.logger.log(`[AcDatagridRowSelectionExtensionOnAgGrid] handleRowSelectionChange: No rowNode found for rowId=${args.datagridRow.rowId}, skipping.`);
    }
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] handleRowSelectionChange: Exiting.");
  }

  private setRowSelection() {
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: Entering.");
    const selectionOption: any = {};
    this.gridApi.setGridOption('rowSelection', selectionOption);
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: Initialized selectionOption.");
    if (this.rowSelectionExtension) {
      if (this.rowSelectionExtension.allowSelection) {
        this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: Selection allowed.");
        if (this.rowSelectionExtension.allowMultipleSelection) {
          selectionOption.mode = 'multiRow';
          this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: Set mode to multiRow.");
        }
        else {
          selectionOption.mode = 'singleRow';
          this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: Set mode to singleRow.");
        }
      } else {
        this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: Selection not allowed, no mode set.");
      }
    } else {
      this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: No RowSelectionExtension, no options set.");
    }
    this.logger.log("[AcDatagridRowSelectionExtensionOnAgGrid] setRowSelection: Exiting.");
  }
}
