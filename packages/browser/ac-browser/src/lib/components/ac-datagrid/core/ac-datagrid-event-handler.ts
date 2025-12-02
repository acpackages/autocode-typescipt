import { AC_DATAGRID_ATTRIBUTE, AcDatagridColumn, AcEnumDatagridHook, IAcDatagridActiveRowChangeEvent, IAcDatagridCellHookArgs, IAcDatagridColumnEvent, IAcDatagridPaginationChangeEvent, IAcDatagridSortOrderChangeEvent } from "../_ac-datagrid.export";
import { AcEnumDatagridEvent } from "../enums/ac-enum-datagrid-event.enum";
import { IAcDatagridCellEvent } from "../interfaces/event-args/ac-datagrid-cell-event.interface";
import { IAcDatagridRowEvent } from "../interfaces/event-args/ac-datagrid-row-event.interface";
import { IAcDatagridStateChangeEvent } from "../interfaces/event-args/ac-datagrid-state-change-event.interface";
import { AcDatagridCell } from "../models/ac-datagrid-cell.model";
import { AcDatagridRow } from "../models/ac-datagrid-row.model";
import { AcDatagridApi } from "./ac-datagrid-api";

export class AcDatagridEventHandler {
  columnResizeTimeouts: any = {};
  datagridApi!: AcDatagridApi;
  constructor({ datagridApi }: { datagridApi: AcDatagridApi }) {
    this.datagridApi = datagridApi;
  }

  handleCellBlur({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    if (datagridCell.isActive) {
      if (datagridCell.element) {
        datagridCell.element.blur();
      }
      const eventArgs: IAcDatagridCellEvent = {
        datagridApi: this.datagridApi,
        datagridCell: datagridCell,
        event: event
      };
      this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellBlur, args: eventArgs });
    }
  }

  handleCellClick({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellClick, args: eventArgs });
  }

  handleCellDoubleClick({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellDoubleClick, args: eventArgs });
  }

  handleCellEditingStart({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellEditingStart, args: eventArgs });
  }

  handleCellEditingStop({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellEditingStop, args: eventArgs });
  }

  handleCellFocus({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    if (!datagridCell.isActive) {
      this.datagridApi.setActiveCell({datagridCell});
      const eventArgs: IAcDatagridCellEvent = {
        datagridApi: this.datagridApi,
        datagridCell: datagridCell,
        event: event
      };
      this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.CellFocus, args: eventArgs });
      this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellFocus, args: eventArgs });
      const datagridRow = datagridCell.datagridRow;
      if (this.datagridApi.activeDatagridRow == undefined || this.datagridApi.activeDatagridRow.rowId != datagridRow.rowId) {
        const activeEventParams: IAcDatagridActiveRowChangeEvent = {
          oldActiveDatagridRow: this.datagridApi.activeDatagridRow,
          activeDatagridRow: datagridRow,
          datagridApi: this.datagridApi,
          event: event
        };
        this.datagridApi.events.execute({ event: AcEnumDatagridEvent.ActiveRowChange, args: activeEventParams });
        this.datagridApi.activeDatagridRow = datagridRow;
      }
    }
  }

  handleCellKeyDown({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.CellKeyDown, args: eventArgs });
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellKeyDown, args: eventArgs });
  }

  handleCellKeyPress({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.CellKeyPress, args: eventArgs });
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellKeyPress, args: eventArgs });
  }

  handleCellKeyUp({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellKeyUp, args: eventArgs });
  }

  handleCellMouseDown({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellMouseDown, args: eventArgs });
  }

  handleCellMouseEnter({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellMouseEnter, args: eventArgs });
    const hoverEventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    if (datagridCell.element) {
      datagridCell.element.setAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridCellHover, 'true');
    }
    if (datagridCell.datagridColumn.headerCellElement) {
      datagridCell.datagridColumn.headerCellElement.setAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridColumnHover, 'true');
    }
    if (datagridCell.datagridRow.element) {
      datagridCell.datagridRow.element.setAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridRowHover, 'true');
    }
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellHover, args: hoverEventArgs });
  }

  handleCellMouseLeave({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    if (datagridCell.element) {
      datagridCell.element.removeAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridCellHover);
    }
    if (datagridCell.datagridColumn.headerCellElement) {
      datagridCell.datagridColumn.headerCellElement.removeAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridColumnHover);
    }
    if (datagridCell.datagridRow.element) {
      datagridCell.datagridRow.element.removeAttribute(AC_DATAGRID_ATTRIBUTE.acDatagridRowHover);
    }
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellMouseLeave, args: eventArgs });
  }

  handleCellMouseMove({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellMouseMove, args: eventArgs });
  }

  handleCellMouseOver({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellMouseOver, args: eventArgs });
  }

  handleCellMouseUp({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellMouseUp, args: eventArgs });
  }

  handleCellTouchCancel({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellTouchCancel, args: eventArgs });
  }

  handleCellTouchEnd({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellTouchEnd, args: eventArgs });
  }

  handleCellTouchMove({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellTouchMove, args: eventArgs });
  }

  handleCellTouchStart({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellTouchStart, args: eventArgs });
  }

  handleCellValueChange({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const hookArgs: IAcDatagridCellHookArgs = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.hooks.execute({ hook: AcEnumDatagridHook.CellValueChange, args: hookArgs });
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    datagridCell.events.execute({ event: AcEnumDatagridEvent.CellValueChange, args: eventArgs });
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.CellValueChange, args: eventArgs });
    this.notifyRowDataChange();
  }

  handleColumnHeaderClick({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.ColumnHeaderClick, args: eventArgs });
  }

  handleColumnPositionChange({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.ColumnPositionChange, args: eventArgs });
    this.notifyStateChange();
  }

  handleColumnResize({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    if (this.columnResizeTimeouts[datagridColumn.columnId]) {
      clearTimeout(this.columnResizeTimeouts[datagridColumn.columnId]);
    }
    this.columnResizeTimeouts[datagridColumn.columnId] = setTimeout(() => {
      const eventArgs: IAcDatagridColumnEvent = {
        datagridApi: this.datagridApi,
        datagridColumn: datagridColumn,
        event: event
      };
      this.datagridApi.events.execute({ event: AcEnumDatagridEvent.ColumnResize, args: eventArgs });
      delete this.columnResizeTimeouts[datagridColumn.columnId];
      this.notifyStateChange();
    }, 300);

  }

  handleColumnDataChange({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.ColumnDataChange, args: eventArgs });
  }

  handleColumnVisibilityChange({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.ColumnVisibilityChange, args: eventArgs });
    this.notifyStateChange();
  }

  handlePaginationChange() {
    const eventArgs: IAcDatagridPaginationChangeEvent = {
      datagridApi: this.datagridApi,
      pagination: this.datagridApi.pagination!,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.PaginationChange, args: eventArgs });
  }

  handleRowBlur({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowBlur, args: eventArgs });
  }

  handleRowClick({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowClick, args: eventArgs });
  }

  handleRowDataChange({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowDataChange, args: eventArgs });
  }

  handleRowDoubleClick({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowDoubleClick, args: eventArgs });
  }

  handleRowEditingStart({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowEditingStart, args: eventArgs });
  }

  handleRowEditingStop({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowEditingStop, args: eventArgs });
  }

  handleRowFocus({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowFocus, args: eventArgs });
  }

  handleRowKeyDown({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowKeyDown, args: eventArgs });

  }

  handleRowKeyPress({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowKeyPress, args: eventArgs });
  }

  handleRowMouseDown({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowMouseDown, args: eventArgs });
  }

  handleRowMouseEnter({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowMouseEnter, args: eventArgs });
    const hoverEventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowHover, args: hoverEventArgs });
  }

  handleRowMouseLeave({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowMouseLeave, args: eventArgs });
  }

  handleRowMouseMove({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowMouseMove, args: eventArgs });
  }

  handleRowMouseOver({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowMouseOver, args: eventArgs });
  }

  handleRowMouseUp({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowMouseUp, args: eventArgs });
  }

  handleRowSelectionChange({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowSelectionChange, args: eventArgs });
  }

  handleRowTouchCancel({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowTouchCancel, args: eventArgs });
  }

  handleRowTouchEnd({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowTouchEnd, args: eventArgs });
  }

  handleRowTouchMove({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowTouchMove, args: eventArgs });
  }

  handleRowTouchStart({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowTouchStart, args: eventArgs });
  }

  handleSortOrderChange() {
    const eventArgs: IAcDatagridSortOrderChangeEvent = {
      datagridApi: this.datagridApi,
      sortOrder: this.datagridApi.dataManager.sortOrder!,
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.SortOrderChange, args: eventArgs });
  }

  private notifyRowDataChange(){
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: this.datagridApi.activeDatagridRow!,
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.RowDataChange, args: eventArgs });
  }

  private notifyStateChange() {
    this.datagridApi.datagridState.refresh();
    const eventArgs: IAcDatagridStateChangeEvent = {
      datagridApi: this.datagridApi,
      datagridState: this.datagridApi.datagridState.toJson(),
      event: event
    };
    this.datagridApi.events.execute({ event: AcEnumDatagridEvent.StateChange, args: eventArgs });
  }
}
