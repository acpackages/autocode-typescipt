/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcSortable } from "../../../../ac-draggable/_ac-draggable.export";
import { AcDraggableApi } from "../../../../ac-draggable/core/ac-draggable-api";
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AC_DATAGRID_EXTENSION_NAME } from "../../../consts/ac-datagrid-extension-name.const";
import { AC_DATAGRID_HOOK } from "../../../consts/ac-datagrid-hook.const";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { IAcDatagridHeaderHookArgs } from "../../../interfaces/hook-args/ac-datagrid-header-hook-args.interface";
import { IAcDatagridRowHookArgs } from "../../../interfaces/hook-args/ac-datagrid-row-hook-args.interface";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcEnumDatagridRowDraggingHook } from "../_row-dragging.export";
import { AcDatagridRowDraggingCell } from "../elements/ac-row-dragging-cell.element";
import { AcDatagridRowDraggingHeaderCell } from "../elements/ac-row-dragging-header-cell.element";
import { IAcDatagridRowDraggingHookArgs } from "../interfaces/ac-datagrid-row-dragging-hook-args.interface";
import { AcDatagridRowDraggingEventHandler } from "./ac-datagrid-row-dragging-event-handler";

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
    this.datagridApi.hooks.execute({hook:AcEnumDatagridRowDraggingHook.AllowRowDraggingChange,args:hookArgs});
  }

  draggableApi!:AcDraggableApi;
  datagridInternalColumn: AcDatagridInternalColumn = new AcDatagridInternalColumn({
    width: 35,
  });
  rowDraggingEventHandler?:AcDatagridRowDraggingEventHandler;

  override destroy(): void {
    if(this.rowDraggingEventHandler){
      this.rowDraggingEventHandler.destroy();
    }
    super.destroy();
  }

  override init(): void {
    // const draggableSort = new AcDraggableSort({element:this.datagridApi.datagrid.datagridBody.element});
    // const draggableSort = new AcSortable();
    // this.draggableApi = draggableSort.draggableApi;
    // this.rowDraggingEventHandler = new AcDatagridRowDraggingEventHandler({rowDraggingExtension:this});
  }

  override handleHook({ hook, args }: { hook: string; args: any; }): void {
    if (hook == AC_DATAGRID_HOOK.BeforeRowCellsCreate) {
      this.handleBeforeRowCellsCreated(args);
    }
    else if (hook == AC_DATAGRID_HOOK.BeforeHeaderColumnCellsCreate) {
      this.handleBeforeHeaderColumnCellsCreated(args);
    }
  }

  handleBeforeHeaderColumnCellsCreated(args: IAcDatagridHeaderHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridHeader = args.datagridHeader;
    const datagriRowNumberCell = new AcDatagridRowDraggingHeaderCell({ datagridApi: datagridApi, datagridInternalColumn: this.datagridInternalColumn });
    datagridHeader.append(datagriRowNumberCell.element);
  }

  handleBeforeRowCellsCreated(args: IAcDatagridRowHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridRow = args.datagridRow;

    if (datagridRow.element) {
      const datagridCell = new AcDatagridRowDraggingCell({ datagridApi: datagridApi, datagridRow: datagridRow, datagridInternalColumn: this.datagridInternalColumn, extension:this });
      datagridRow.element.append(datagridCell.element);
    }
  }

}

export const AC_DATAGRID_ROW_DRAGGING_EXTENSION: IAcDatagridExtension = {
  extensionName: AC_DATAGRID_EXTENSION_NAME.RowDragging,
  extensionClass: AcDatagridRowDraggingExtension
}
