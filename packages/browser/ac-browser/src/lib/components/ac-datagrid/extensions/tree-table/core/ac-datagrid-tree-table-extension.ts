/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcSortable } from "../../../../ac-draggable/_ac-draggable.export";
import { AcDraggableApi } from "../../../../ac-draggable/core/ac-draggable-api";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { AcEnumDatagridHook } from "../../../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { IAcDatagridHeaderHookArgs } from "../../../interfaces/hook-args/ac-datagrid-header-hook-args.interface";
import { IAcDatagridRowHookArgs } from "../../../interfaces/hook-args/ac-datagrid-row-hook-args.interface";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridTreeTableChildrenToggleCell } from "../elements/ac-datagrid-tree-table-children-toggle-cell.element";
import { AcDatagridTreeTableChildrenToggleHeaderCell } from "../elements/ac-datagrid-tree-table-children-toggle-header-cell.element";
import { AcEnumDatagridTreeTableHook } from "../enums/ac-enum-datagrid-tree-table-hook.enum";
import { IAcDatagridTreeTableHookArgs } from "../interfaces/ac-datagrid-tree-table-hook-args.interface";

export class AcDatagridTreeTableExtension extends AcDatagridExtension {
  get isTreeTable(): boolean {
    return this.treeDataChildKey != '' && this.treeDataParentKey != '';
  }

  private _treeDataChildKey: string = '';
  get treeDataChildKey(): string {
    return this._treeDataChildKey;
  }
  set treeDataChildKey(value: string) {
    this._treeDataChildKey = value;
    const hookArgs: IAcDatagridTreeTableHookArgs = {
      datagridApi: this.datagridApi,
      datagridTreeTableExtension: this,
      value: value
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridTreeTableHook.TreeDataChildKeyChange, args: hookArgs });
  }

  private _treeDataDisplayKey: string = '';
  get treeDataDisplayKey(): string {
    return this._treeDataDisplayKey;
  }
  set treeDataDisplayKey(value: string) {
    this._treeDataDisplayKey = value;
    const hookArgs: IAcDatagridTreeTableHookArgs = {
      datagridApi: this.datagridApi,
      datagridTreeTableExtension: this,
      value: value
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridTreeTableHook.TreeDataDisplayKeyChange, args: hookArgs });
  }

  private _treeDataParentKey: string = '';
  get treeDataParentKey(): string {
    return this._treeDataParentKey;
  }
  set treeDataParentKey(value: string) {
    this._treeDataParentKey = value;
    const hookArgs: IAcDatagridTreeTableHookArgs = {
      datagridApi: this.datagridApi,
      datagridTreeTableExtension: this,
      value: value
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridTreeTableHook.TreeDataParentKeyChange, args: hookArgs });
  }

  draggableApi!: AcDraggableApi;
  datagridInternalColumn: AcDatagridInternalColumn = new AcDatagridInternalColumn({
    width: 35,
  });

  override init(): void {
    // const draggableSort = new AcDraggableSort({ element: this.datagridApi.datagrid.datagridBody.element });
    const draggableSort = new AcSortable();
    this.draggableApi = draggableSort.draggableApi;
    console.log(this, this.datagridApi.datagrid.datagridBody.element);
  }

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
    if (hook == AcEnumDatagridHook.BeforeRowCellsCreate) {
      this.handleBeforeRowCellsCreated(args);
    }
    else if (hook == AcEnumDatagridHook.BeforeHeaderColumnCellsCreate) {
      this.handleBeforeHeaderColumnCellsCreated(args);
    }
  }

  getNestedDataTree({childrenKey = 'children'}:{childrenKey?:string} = {}) {
    const rootData: any[] = [];
    const parentDataMap: any = {};
    for (const datagridRow of this.datagridApi.datagridRows) {
      const data = datagridRow.data;
      const parentId: any = data[this.treeDataChildKey];
      if (parentId) {
        if (parentDataMap[parentId] == undefined) {
          parentDataMap[parentId] = [];
        }
        parentDataMap[parentId].push(data)
      }
      else {
        rootData.push(data);
      }
    }
    const setChildData: Function = (data: any): void => {
      if (parentDataMap[data[this.treeDataParentKey]]) {
        data[childrenKey] = parentDataMap[data[this.treeDataParentKey]];
        for (const childData of data[childrenKey]) {
          setChildData(childData);
        }
      }
    };
    for (const childData of rootData) {
      setChildData(childData);
    }
    return rootData;
  }

  handleBeforeHeaderColumnCellsCreated(args: IAcDatagridHeaderHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridHeader = args.datagridHeader;
    const datagriRowNumberCell = new AcDatagridTreeTableChildrenToggleHeaderCell({ datagridApi: datagridApi, datagridInternalColumn: this.datagridInternalColumn });
    datagridHeader.headerRowElement.append(datagriRowNumberCell.element);
  }

  handleBeforeRowCellsCreated(args: IAcDatagridRowHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridRow = args.datagridRow;

    if (datagridRow.instance) {
      const datagridCell = new AcDatagridTreeTableChildrenToggleCell({ datagridApi: datagridApi, datagridRow: datagridRow, datagridInternalColumn: this.datagridInternalColumn, extension: this });
      datagridRow.instance.element.append(datagridCell.element);
    }
  }



}

export const AcTreeTableDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.TreeTable,
  extensionClass: AcDatagridTreeTableExtension
}
