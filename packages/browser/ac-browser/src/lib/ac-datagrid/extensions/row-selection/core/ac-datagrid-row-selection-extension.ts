/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridExtension } from "../../../core/ac-datagrid-extension";
import { AcEnumDatagridExtension } from "../../../enums/ac-enum-datagrid-extensions.enum";
import { AcEnumDatagridHook } from "../../../enums/ac-enum-datagrid-hooks.enum";
import { IAcDatagridExtension } from "../../../interfaces/ac-datagrid-extension.interface";
import { IAcDatagridHeaderHookArgs } from "../../../interfaces/hook-args/ac-datagrid-header-hook-args.interface";
import { IAcDatagridRowHookArgs } from "../../../interfaces/hook-args/ac-datagrid-row-hook-args.interface";
import { AcDatagridInternalColumn } from "../../../models/ac-datagrid-internal-column.model";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";
import { AcDatagridRowSelectionCell } from "../elements/ac-row-selection-cell.element";
import { AcDatagridRowSelectionHeaderCell } from "../elements/ac-row-selection-header-cell.element";
import { AcEnumDatagridRowSelectionEvent } from "../enums/ac-enum-datagrid-row-selection-event.enum";
import { AcEnumDatagridRowSelectionHook } from "../enums/ac-enum-datagrid-row-selection-hook.enum";
import { IAcDatagridRowSelectionChangeEvent } from "../interfaces/ac-datagrid-row-selection-change-event.interface";
import { IAcDatagridRowSelectionData } from "../interfaces/ac-datagrid-row-selection-data.interface";
import { IAcDatagridRowSelectionHookArgs } from "../interfaces/ac-datagrid-row-selection-hook-args.interface";
import { IAcDatagridSelectionMultipleRowsChangeEvent } from "../interfaces/ac-datagrid-row-selection-multiple-rows-change-event.interface";

export class AcDatagridRowSelectionExtension extends AcDatagridExtension {
  private _allowMultipleSelection: boolean = true;
  get allowMultipleSelection(): boolean {
    return this._allowMultipleSelection;
  }
  set allowMultipleSelection(value: boolean) {
    this._allowMultipleSelection = value;
    const hookArgs: IAcDatagridRowSelectionHookArgs = {
      datagridApi: this.datagridApi,
      datagridRowSelectionExtension: this,
      value: value
    };
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridRowSelectionHook.AllowMultipleSelectionChange, args: hookArgs });
  }

  private _allowSelection: boolean = true;
  get allowSelection(): boolean {
    return this._allowSelection;
  }
  set allowSelection(value: boolean) {
    this._allowSelection = value;
    const hookArgs: IAcDatagridRowSelectionHookArgs = {
      datagridApi: this.datagridApi,
      datagridRowSelectionExtension: this,
      value: value
    };
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridRowSelectionHook.AllowSelectionChange, args: hookArgs });
  }

  datagridInternalColumn: AcDatagridInternalColumn = new AcDatagridInternalColumn({
    width: 35,
  });

  clearSelection() {
    this.setAllRowsSelection({isSelected:false});
  }

  getSelectedRows(): AcDatagridRow[] {
    const selectedRows: AcDatagridRow[] = [];
    for (const row of this.datagridApi.datagridRows) {
      if (row.extensionData[AcEnumDatagridExtension.RowSelection].isSelected) {
        selectedRows.push(row);
      }
    }
    return selectedRows;
  }

  getSelectedRowsData(): any[] {
    const selectedData: any[] = [];
    for (const row of this.datagridApi.datagridRows) {
      if (row.extensionData[AcEnumDatagridExtension.RowSelection].isSelected) {
        selectedData.push(row.data);
      }
    }
    return selectedData;
  }

  getSelectedRowsDataKeyValues({ key }: { key: string }): any[] {
    const selectedKeyValues: any[] = [];
    for (const row of this.datagridApi.datagridRows) {
      if (row.extensionData[AcEnumDatagridExtension.RowSelection] && row.data[key] != undefined) {
        selectedKeyValues.push(row.data[key]);
      }
    }
    return selectedKeyValues;
  }

  private handleBeforeHeaderColumnCellsCreated(args: IAcDatagridHeaderHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridHeader = args.datagridHeader;
    const datagriRowNumberCell = new AcDatagridRowSelectionHeaderCell({ datagridApi: datagridApi, datagridInternalColumn: this.datagridInternalColumn });
    datagridHeader.headerRowElement.append(datagriRowNumberCell.element);
  }

  private handleBeforeRowCellsCreated(args: IAcDatagridRowHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridRow = args.datagridRow;
    if (datagridRow.instance) {
      const datagriRowNumberCell = new AcDatagridRowSelectionCell({ datagridApi: datagridApi, datagridRow: datagridRow, datagridInternalColumn: this.datagridInternalColumn });
      datagridRow.instance.element.append(datagriRowNumberCell.element);
    }
  }

  private handleDatagridRowCreated(args: IAcDatagridRowHookArgs) {
    const datagridApi = args.datagridApi;
    const datagridRow = args.datagridRow;
    const rowExtensionData: IAcDatagridRowSelectionData = {
      isSelected: false
    };
    datagridRow.extensionData[AcEnumDatagridExtension.RowSelection] = rowExtensionData;
    if (datagridRow.instance) {
      const datagriRowNumberCell = new AcDatagridRowSelectionCell({ datagridApi: datagridApi, datagridRow: datagridRow, datagridInternalColumn: this.datagridInternalColumn });
      datagridRow.instance.element.append(datagriRowNumberCell.element);
    }
  }

  override handleHook({ hookName, hookArgs }: { hookName: string; hookArgs: any; }): void {
    if (hookName == AcEnumDatagridHook.BeforeRowCellsCreated) {
      this.handleBeforeRowCellsCreated(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.BeforeHeaderColumnCellsCreated) {
      this.handleBeforeHeaderColumnCellsCreated(hookArgs);
    }
    else if (hookName == AcEnumDatagridHook.DatagridRowCreated) {
      this.handleDatagridRowCreated(hookArgs);
    }
  }

  setAllRowsSelection({ isSelected }: { isSelected: boolean }) {
    for (const datagridRow of this.datagridApi.datagridRows) {
      datagridRow.extensionData[AcEnumDatagridExtension.RowSelection].isSelected = isSelected;
      const rowEventArgs: IAcDatagridRowSelectionChangeEvent = {
        datagridApi: this.datagridApi,
        datagridRow: datagridRow,
        isSelected: isSelected,
        datagridRowSelectionExtension: this
      };
      datagridRow.hooks.execute({ hookName: AcEnumDatagridRowSelectionHook.RowSelectionChange, args: rowEventArgs });
    }
    const eventArgs: IAcDatagridSelectionMultipleRowsChangeEvent = {
      datagridApi: this.datagridApi,
      datagridRows: this.datagridApi.datagridRows,
      isSelected: isSelected,
      datagridRowSelectionExtension: this
    };
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridRowSelectionHook.MultipleRowSelectionChange, args: eventArgs });
  }

  setRowSelection({ datagridRow, isSelected, rowId, key, value }: { datagridRow?: AcDatagridRow, rowId?: string, key?: string, value?: any, isSelected: boolean }) {
    if (datagridRow == undefined && rowId) {
      datagridRow = this.datagridApi.getRowById({ rowId: rowId });
    }
    else if (datagridRow == undefined && key && value) {
      datagridRow = this.datagridApi.getRowByKeyValue({ key: key, value: value });
    }
    if (datagridRow) {
      datagridRow.extensionData[AcEnumDatagridExtension.RowSelection].isSelected = isSelected;
      const eventArgs: IAcDatagridRowSelectionChangeEvent = {
        datagridApi: this.datagridApi,
        datagridRow: datagridRow,
        isSelected: isSelected,
        datagridRowSelectionExtension: this
      };
      this.datagridApi.hooks.execute({ hookName: AcEnumDatagridRowSelectionHook.RowSelectionChange, args: eventArgs });
      datagridRow.hooks.execute({ hookName: AcEnumDatagridRowSelectionHook.RowSelectionChange, args: eventArgs });
      this.datagridApi.events.execute({ eventName: AcEnumDatagridRowSelectionEvent.RowSelectionChange, args: eventArgs });
    }
  }

}

export const AcRowSelectionDatagridExtension: IAcDatagridExtension = {
  extensionName: AcEnumDatagridExtension.RowSelection,
  extensionClass: AcDatagridRowSelectionExtension
}
