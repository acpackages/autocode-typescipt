/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridApi, AcDatagridRowDraggingExtension, AcDatagridTreeTableExtension, AcEnumDatagridExtension, AcEnumDatagridHook, AcEnumDatagridRowDraggingHook, IAcDatagridExtensionEnabledHookArgs } from "@autocode-ts/ac-browser";
import { AcDatagridOnAgGridExtension } from "./ac-datagrid-on-ag-grid-extension";
import { ColDef, GridApi, RowDragEndEvent, RowDragEnterEvent } from "ag-grid-community";
import { AcEnumDatagridOnAgGridHook } from "../enums/ac-enum-datagrid-on-ag-grid-hook.enum";
import { IAcDatagriOnAgGridColDefsChangeHookArgs } from "../interfaces/ac-datagrid-on-ag-grid-col-defs-set-hook-args.interface";

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

  constructor({ agGridExtension }: { agGridExtension: AcDatagridOnAgGridExtension }) {
    this.agGridExtension = agGridExtension;
    this.gridApi = agGridExtension.gridApi;
    this.datagridApi = agGridExtension.datagridApi;
    this.setExtension();
    if (this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable]) {
      this.treeTableExtension = this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable] as AcDatagridTreeTableExtension;
    }
    this.datagridApi.hooks.subscribeAllHooks({
      callback: (hookName: string, hookArgs: any) => {
        this.handleHook({ hookName: hookName, hookArgs: hookArgs });
      }
    });
    this.gridApi.addEventListener('rowDragEnter', (args: RowDragEnterEvent) => {
      this.handleAgGridRowDragStart(args);
    });
    this.gridApi.addEventListener('rowDragEnd', (args: RowDragEndEvent) => {
      this.handleAgGridRowDragEnd(args);
    });
  }

  private handleAgGridRowDragEnd(event: RowDragEndEvent) {
    const node = event.node;
    let currentGroupChildIndex: number = -1;
    if (this.treeTableExtension && this.treeTableExtension.isTreeTable) {
      const oldParentId = node.data[this.treeTableExtension.treeDataParentKey];
      let newIntParentId: any = null;
      let newParentId: any = null;
      if (node.parent) {
        const parentNode = node.parent;
        if (parentNode.data) {
          newIntParentId = parentNode.data[this.agGridExtension.rowKey];
          newParentId = parentNode.data[this.treeTableExtension.treeDataParentKey];
        }
        if (parentNode.childrenAfterGroup) {
          let index = 0;
          for (const child of parentNode.childrenAfterGroup) {
            if (child.data) {
              if (child.data[this.agGridExtension.rowKey] == node.data[this.agGridExtension.rowKey]) {
                currentGroupChildIndex = index;
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
      }
      this.draggingRow = null;
      const eventParams = {
        currentGroupChildIndex: currentGroupChildIndex,
        data: node.data,
        event: event,
        newParentId: newParentId,
        oldParentId: oldParentId,
        previousGroupChildIndex: this.previousGroupChildIndex
      };
      console.log(eventParams);
    }
    // this.onRowDragEnd.emit(eventParams);
  }

  private handleAgGridRowDragStart(event: RowDragEnterEvent) {
    this.draggingRow = event;
    const node = event.node;
    this.previousGroupChildIndex = -1;
    if (node.parent) {
      const parentNode = node.parent;
      if (parentNode.childrenAfterGroup) {
        let index = 0;
        for (const child of parentNode.childrenAfterGroup) {
          if (child.data) {
            if (child.data[this.agGridExtension.rowKey] == node.data[this.agGridExtension.rowKey]) {
              this.previousGroupChildIndex = index;
              break;
            }
          }
          index++;
        }
      }
    }
    const eventParams = {
      currentGroupChildIndex: this.previousGroupChildIndex,
      data: node.data,
      event: event,
    };
    console.log(eventParams);
    // this.onRowDragStart.emit(eventParams);
  }

  private handleBeforeColDefsChange(event: IAcDatagriOnAgGridColDefsChangeHookArgs) {
    if (this.allowRowDragging) {
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
        resizable:false
      }
      event.colDefs.push(internalActionColumns);
    }
  }

  private handleExtensionEnabled(args: IAcDatagridExtensionEnabledHookArgs) {
    if (args.extensionName == AcEnumDatagridExtension.RowDragging) {
      this.setExtension();
    }
    else if (args.extensionName == AcEnumDatagridExtension.TreeTable) {
      this.treeTableExtension = this.datagridApi.extensions[AcEnumDatagridExtension.TreeTable] as AcDatagridTreeTableExtension;
    }
  }

  handleHook({ hookName, hookArgs }: { hookName: string, hookArgs: any }): void {
    if (hookName == AcEnumDatagridHook.ExtensionEnabled) {
      this.handleExtensionEnabled(hookArgs);
    }
    else if (hookName == AcEnumDatagridRowDraggingHook.AllowRowDraggingChange) {
      this.setAllowRowDragging();
    }
    else if (hookName == AcEnumDatagridOnAgGridHook.BeforeColDefsChange) {
      this.handleBeforeColDefsChange(hookArgs);
    }
  }

  setExtension() {
    if (this.datagridApi && this.datagridApi.extensions[AcEnumDatagridExtension.RowDragging]) {
      this.rowDraggingExtension = this.datagridApi.extensions[AcEnumDatagridExtension.RowDragging] as AcDatagridRowDraggingExtension;
      this.setAllowRowDragging();
    }
  }

  setAllowRowDragging() {
    this.allowRowDragging = this.rowDraggingExtension.allowRowDragging;
    if(this.allowRowDragging){
      this.gridApi.setGridOption('rowDragManaged',true);
      this.gridApi.setGridOption('rowDragEntireRow',true);
      this.gridApi.setGridOption('suppressMoveWhenRowDragging',true);
    }
  }

}
