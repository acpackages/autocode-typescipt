/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDraggableSort } from "../../../../ac-draggable/_ac-draggable.export";
import { AcDraggableApi } from "../../../../ac-draggable/core/ac-draggable-api";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { AcEnumDatagridHook } from "../../../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { IAcDatagridHeaderHookArgs } from "../../../interfaces/hook-args/ac-datagrid-header-hook-args.interface";
import { IAcDatagridRowHookArgs } from "../../../interfaces/hook-args/ac-datagrid-row-hook-args.interface";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcEnumDatagridRowDraggingHook } from "../_row-dragging.export";
import { AcDatagridRowDraggingCell } from "../elements/ac-row-dragging-cell.element";
import { AcDatagridRowDraggingHeaderCell } from "../elements/ac-row-dragging-header-cell.element";
import { IAcDatagridRowDraggingHookArgs } from "../interfaces/ac-datagrid-row-dragging-hook-args.interface";

export class AcDatagridRowDraggingExtension extends AcDatagridExtension {
  private _allowRowDragging:boolean = false;
  get allowRowDragging():boolean{
    return this._allowRowDragging;
  }
  set allowRowDragging(value:boolean){
    this._allowRowDragging = value;
    const hookArgs:IAcDatagridRowDraggingHookArgs = {
      datagridApi:this.datagridApi,
      datagridRowDraggingExtension:this,
      value:value
    };
    this.datagridApi.hooks.execute({hookName:AcEnumDatagridRowDraggingHook.AllowRowDraggingChange,args:hookArgs});
  }

  draggableApi!:AcDraggableApi;
  datagridInternalColumn: AcDatagridInternalColumn = new AcDatagridInternalColumn({
    width: 35,
  });

  override init(): void {
    const draggableSort = new AcDraggableSort({element:this.datagridApi.datagrid.datagridBody.element});
    this.draggableApi = draggableSort.draggableApi;
  }

  override handleHook({ hookName, hookArgs }: { hookName: string; hookArgs: any; }): void {
    if (hookName == AcEnumDatagridHook.BeforeRowCellsCreated) {
      this.handleBeforeRowCellsCreated(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.BeforeHeaderColumnCellsCreated) {
      this.handleBeforeHeaderColumnCellsCreated(hookArgs);
    }
  }

  handleBeforeHeaderColumnCellsCreated(args: IAcDatagridHeaderHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridHeader = args.datagridHeader;
    const datagriRowNumberCell = new AcDatagridRowDraggingHeaderCell({ datagridApi: datagridApi, datagridInternalColumn: this.datagridInternalColumn });
    datagridHeader.headerRowElement.append(datagriRowNumberCell.element);
  }

  handleBeforeRowCellsCreated(args: IAcDatagridRowHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridRow = args.datagridRow;

    if (datagridRow.instance) {
      const datagridCell = new AcDatagridRowDraggingCell({ datagridApi: datagridApi, datagridRow: datagridRow, datagridInternalColumn: this.datagridInternalColumn, extension:this });
      datagridRow.instance.element.append(datagridCell.element);
    }
  }

}

export const AcRowDraggingDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.RowDragging,
  extensionClass: AcDatagridRowDraggingExtension
}
