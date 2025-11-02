/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridRowDraggingExtension, AcDatagridTreeTableExtension, AcEnumDatagridExtension, AcEnumDatagridHook, AcEnumDatagridRowDraggingHook, IAcDatagridExtensionEnabledHookArgs } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { ColDef, GridApi, RowDragCancelEvent, RowDragEndEvent, RowDragEnterEvent, RowDragLeaveEvent, RowDragMoveEvent } from "ag-grid-community";
import { AcEnumDatagridOnAgGridHook } from "../enums/ac-enum-datagrid-on-ag-grid-hook.enum";
import { IAcDatagriOnAgGridColDefsChangeHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-col-defs-set-hook-args.interface";
import { AcLogger } from "@autocode-ts/autocode";

export class AcDatagridRowDraggingExtensionOnAgGrid {
  agGridExtension!: AcDatagridOnAgGridExtension;
  allowRowDragging: boolean = false;
  // this.allowRowDragging = this.datagridApi.extensions[AcEnumDatagridExtension.RowDragging] != undefined;/
  datagridApi!: AcDatagridApi;
  private draggingRow: any;
  gridApi!: GridApi;
  private previousGroupChildIndex: number = -1;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  treeTableExtension?: AcDatagridTreeTableExtension;
  logger!:AcLogger;

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.logger = agGridExtension.logger;
    this.logger.log("[AcDatagridOnAgGridExtension] Constructor: Logger assigned.");
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Starting initialization.");
    this.agGridExtension = agGridExtension;
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: AgGridExtension assigned.");
    this.gridApi = agGridExtension.gridApi;
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: GridApi assigned.");
    this.datagridApi = agGridExtension.datagridApi;
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: DatagridApi assigned.");
    this.setExtension();
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Extension set.");
    if (this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable]) {
      this.treeTableExtension = this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable] as AcDatagridTreeTableExtension;
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: TreeTableExtension assigned.");
    } else {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: No TreeTableExtension available.");
    }
    this.datagridApi.hooks.subscribeAllHooks({
      callback: (hook: string, args: any) => {
        this.handleHook({ hook: hook, args: args });
      }
    });
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Hooks subscribed.");
    this.gridApi.addEventListener('rowDragEnter', (args: RowDragEnterEvent) => {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragEnter: Event triggered.");
      this.handleAgGridRowDragStart(args);
    });
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Registered rowDragEnter listener.");
    this.gridApi.addEventListener('rowDragEnd', (args: RowDragEndEvent) => {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragEnd: Event triggered.");
      this.handleAgGridRowDragEnd(args);
    });
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Registered rowDragEnd listener.");
    this.gridApi.addEventListener('rowDragCancel', (args: RowDragCancelEvent) => {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragCancel: Event triggered.");
      const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: args });
      if (datagridRow) {
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragCancel: DatagridRow found, handling drag cancel.");
        this.rowDraggingExtension.rowDraggingEventHandler.handleRowDragCancel({ datagridRow, event: args.event });
      } else {
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragCancel: No DatagridRow found, skipping handler.");
      }
    });
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Registered rowDragCancel listener.");
    this.gridApi.addEventListener('rowDragLeave', (args: RowDragLeaveEvent) => {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragLeave: Event triggered.");
      const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: args });
      if (datagridRow) {
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragLeave: DatagridRow found, handling drag leave.");
        this.rowDraggingExtension.rowDraggingEventHandler.handleRowDragLeave({ datagridRow, event: args.event });
      } else {
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragLeave: No DatagridRow found, skipping handler.");
      }
    });
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Registered rowDragLeave listener.");
    this.gridApi.addEventListener('rowDragMove', (args: RowDragMoveEvent) => {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragMove: Event triggered.");
      const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: args });
      if (datagridRow) {
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragMove: DatagridRow found, handling drag over.");
        this.rowDraggingExtension.rowDraggingEventHandler.handleRowDragOver({ datagridRow, event: args.event });
      } else {
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] rowDragMove: No DatagridRow found, skipping handler.");
      }
    });
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: Registered rowDragMove listener.");
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] Constructor: All listeners registered. Exiting constructor.");
  }

  private handleAgGridRowDragEnd(event: RowDragEndEvent) {
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Entering.");
    const node = event.node;
    let currentGroupChildIndex: number = -1;
    if (this.treeTableExtension && this.treeTableExtension.isTreeTable) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: TreeTable mode detected.");
      const oldParentId = node.data[this.treeTableExtension.treeDataParentKey];
      let newIntParentId: any = null;
      let newParentId: any = null;
      if (node.parent) {
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Node has parent.");
        const parentNode = node.parent;
        if (parentNode.data) {
          newIntParentId = parentNode.data[this.agGridExtension.rowKey];
          newParentId = parentNode.data[this.treeTableExtension.treeDataParentKey];
          this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Set new parent IDs - newIntParentId=${newIntParentId}, newParentId=${newParentId}.`);
        }
        if (parentNode.childrenAfterGroup) {
          let index = 0;
          for (const child of parentNode.childrenAfterGroup) {
            if (child.data) {
              if (child.data[this.agGridExtension.rowKey] == node.data[this.agGridExtension.rowKey]) {
                currentGroupChildIndex = index;
                this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Found currentGroupChildIndex=${currentGroupChildIndex}.`);
                break;
              }
            }
            index++;
          }
        }
      }
      if (node.data[this.treeTableExtension.treeDataChildKey] != newParentId) {
        node.data[this.treeTableExtension.treeDataChildKey] = newParentId;
        node.data[this.agGridExtension.rowParentKey] = newIntParentId;
        this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Updated node data with new parent keys.");
      }
      this.draggingRow = null;
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Cleared draggingRow.");
      const eventParams = {
        currentGroupChildIndex: currentGroupChildIndex,
        data: node.data,
        event: event,
        newParentId: newParentId,
        oldParentId: oldParentId,
        previousGroupChildIndex: this.previousGroupChildIndex
      };
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Prepared eventParams for treeTable handling.");
    } else {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Non-treeTable mode.");
    }
    const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
    if (datagridRow) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: DatagridRow found, handling drag end.");
      this.rowDraggingExtension.rowDraggingEventHandler.handleRowDragEnd({ datagridRow, event: event.event });
    } else {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: No DatagridRow found, skipping handler.");
    }
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragEnd: Exiting.");
  }

  private handleAgGridRowDragStart(event: RowDragEnterEvent) {
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragStart: Entering.");
    this.draggingRow = event;
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragStart: Set draggingRow.");
    const node = event.node;
    this.previousGroupChildIndex = -1;
    if (node.parent) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragStart: Node has parent.");
      const parentNode = node.parent;
      if (parentNode.childrenAfterGroup) {
        let index = 0;
        for (const child of parentNode.childrenAfterGroup) {
          if (child.data) {
            if (child.data[this.agGridExtension.rowKey] == node.data[this.agGridExtension.rowKey]) {
              this.previousGroupChildIndex = index;
              this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragStart: Found previousGroupChildIndex=${this.previousGroupChildIndex}.`);
              break;
            }
          }
          index++;
        }
      }
    }
    const datagridRow = this.agGridExtension.getDatagridRowFromEvent({ event: event });
    if (datagridRow) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragStart: DatagridRow found, handling drag start.");
      this.rowDraggingExtension.rowDraggingEventHandler.handleRowDragStart({ datagridRow, event: event.event });
    } else {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragStart: No DatagridRow found, skipping handler.");
    }
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleAgGridRowDragStart: Exiting.");
  }

  private handleBeforeColDefsChange(event: IAcDatagriOnAgGridColDefsChangeHookArgs) {
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleBeforeColDefsChange: Entering.");
    if (this.allowRowDragging) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleBeforeColDefsChange: Row dragging allowed, adding internal action column.");
      const internalActionColumns: ColDef = {
        rowDrag: this.allowRowDragging,
        field: '_ac_internal_actions',
        headerName: '',
        sortable: false,
        filter: false,
        pinned: true,
        suppressHeaderMenuButton: true,
        suppressHeaderContextMenu: true,
        width: 50,
        resizable: false
      }
      event.colDefs.push(internalActionColumns);
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleBeforeColDefsChange: Internal action column pushed to colDefs.");
    } else {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleBeforeColDefsChange: Row dragging not allowed, skipping column addition.");
    }
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleBeforeColDefsChange: Exiting.");
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] handleExtensionEnabled: Entering with extensionName=${args.extensionName}.`);
    if (args.extensionName == AcEnumDatagridExtension.RowDragging) {
      this.setExtension();
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleExtensionEnabled: Handled RowDragging extension enable.");
    }
    else if (args.extensionName == AcEnumDatagridExtension.TreeTable) {
      this.treeTableExtension = this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable] as AcDatagridTreeTableExtension;
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleExtensionEnabled: Assigned TreeTable extension.");
    } else {
      this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] handleExtensionEnabled: Unknown extension ${args.extensionName}, skipping.`);
    }
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleExtensionEnabled: Exiting.");
  }

  handleHook({ hook, args }: { hook: string, args: any }): void {
    this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] handleHook: Entering with hook=${hook}.`);
    if (hook == AcEnumDatagridHook.ExtensionEnable) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleHook: Handling ExtensionEnable.");
      this.handleExtensionEnabled(args);
    }
    else if (hook == AcEnumDatagridRowDraggingHook.AllowRowDraggingChange) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleHook: Handling AllowRowDraggingChange.");
      this.setAllowRowDragging();
    }
    else if (hook == AcEnumDatagridOnAgGridHook.BeforeColDefsChange) {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleHook: Handling BeforeColDefsChange.");
      this.handleBeforeColDefsChange(args);
    }
    else {
      this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] handleHook: Unknown hook ${hook}, skipping.`);
    }
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] handleHook: Exiting.");
  }

  setExtension() {
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setExtension: Entering.");
    if (this.datagridApi && this.datagridApi.extensions[AcEnumDatagridExtension.RowDragging]) {
      this.rowDraggingExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowDragging] as AcDatagridRowDraggingExtension;
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setExtension: RowDraggingExtension assigned.");
      this.setAllowRowDragging();
    } else {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setExtension: No RowDragging extension available, skipping.");
    }
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setExtension: Exiting.");
  }

  setAllowRowDragging() {
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setAllowRowDragging: Entering.");
    this.allowRowDragging = this.rowDraggingExtension.allowRowDragging;
    this.logger.log(`[AcDatagridRowDraggingExtensionOnAgGrid] setAllowRowDragging: Set allowRowDragging=${this.allowRowDragging}.`);
    if (this.allowRowDragging) {
      this.gridApi.setGridOption('rowDragManaged', true);
      this.gridApi.setGridOption('rowDragEntireRow', true);
      this.gridApi.setGridOption('suppressMoveWhenRowDragging', true);
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setAllowRowDragging: Enabled row dragging grid options.");
    } else {
      this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setAllowRowDragging: Row dragging disabled, no grid options changes.");
    }
    this.logger.log("[AcDatagridRowDraggingExtensionOnAgGrid] setAllowRowDragging: Exiting.");
  }

}
