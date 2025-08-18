import { AcDatagridColumn, AcEnumDatagridHook, IAcDatagridActiveRowChangeEvent, IAcDatagridCellHookArgs, IAcDatagridColumnEvent, IAcDatagridColumnHookArgs, IAcDatagridPaginationChangeEvent, IAcDatagridSortOrderChangeEvent } from "../_ac-datagrid.export";
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
    if (datagridCell.isFocused) {
      datagridCell.isFocused = false;
      if (datagridCell.instance) {
        datagridCell.instance.blur();
      }
      const eventArgs: IAcDatagridCellEvent = {
        datagridApi: this.datagridApi,
        datagridCell: datagridCell,
        event: event
      };
      this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellBlur, args: eventArgs });
    }
  }

  handleCellClick({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellClick, args: eventArgs });
  }

  handleCellDoubleClick({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellDoubleClick, args: eventArgs });
  }

  handleCellEditingStart({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellEditingStart, args: eventArgs });
  }

  handleCellEditingStop({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellEditingStop, args: eventArgs });
  }

  handleCellFocus({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    if (!datagridCell.isFocused) {
      datagridCell.isFocused = true;
      if (datagridCell.instance) {
        datagridCell.instance.focus();
      }
      const eventArgs: IAcDatagridCellEvent = {
        datagridApi: this.datagridApi,
        datagridCell: datagridCell,
        event: event
      };
      this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellFocus, args: eventArgs });
      const datagridRow = datagridCell.datagridRow;
      if (this.datagridApi.activeDatagridRow == undefined || this.datagridApi.activeDatagridRow.acRowId != datagridRow.acRowId) {
        const activeEventParams: IAcDatagridActiveRowChangeEvent = {
          oldActiveDatagridRow: this.datagridApi.activeDatagridRow,
          activeDatagridRow: datagridRow,
          datagridApi: this.datagridApi,
          event: event
        };
        this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.ActiveRowChange, args: activeEventParams });
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
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellKeyDown, args: eventArgs });
  }

  handleCellKeyPress({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellKeyPress, args: eventArgs });
  }

  handleCellKeyUp({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellKeyUp, args: eventArgs });
  }

  handleCellMouseDown({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellMouseDown, args: eventArgs });
  }

  handleCellMouseEnter({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellMouseEnter, args: eventArgs });
    const hoverEventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellHover, args: hoverEventArgs });
  }

  handleCellMouseLeave({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellMouseLeave, args: eventArgs });
  }

  handleCellMouseMove({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellMouseMove, args: eventArgs });
  }

  handleCellMouseOver({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellMouseOver, args: eventArgs });
  }

  handleCellMouseUp({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellMouseUp, args: eventArgs });
  }

  handleCellTouchCancel({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellTouchCancel, args: eventArgs });
  }

  handleCellTouchEnd({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellTouchEnd, args: eventArgs });
  }

  handleCellTouchMove({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellTouchMove, args: eventArgs });
  }

  handleCellTouchStart({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellTouchStart, args: eventArgs });
  }

  handleCellValueChange({ datagridCell, event }: { datagridCell: AcDatagridCell, event?: any }) {
    const hookArgs: IAcDatagridCellHookArgs = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.hooks.execute({ hookName: AcEnumDatagridHook.CellValueChange, args: hookArgs });
    const eventArgs: IAcDatagridCellEvent = {
      datagridApi: this.datagridApi,
      datagridCell: datagridCell,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.CellValueChange, args: eventArgs });
  }

  handleColumnHeaderClick({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.ColumnHeaderClick, args: eventArgs });
  }

  handleColumnPositionChange({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.ColumnPositionChange, args: eventArgs });
    this.notifyStateChange();
  }

  handleColumnResize({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    if (this.columnResizeTimeouts[datagridColumn.acColumnId]) {
      clearTimeout(this.columnResizeTimeouts[datagridColumn.acColumnId]);
    }
    this.columnResizeTimeouts[datagridColumn.acColumnId] = setTimeout(() => {
      const eventArgs: IAcDatagridColumnEvent = {
        datagridApi: this.datagridApi,
        datagridColumn: datagridColumn,
        event: event
      };
      this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.ColumnResize, args: eventArgs });
      delete this.columnResizeTimeouts[datagridColumn.acColumnId];
      this.notifyStateChange();
    }, 300);

  }

  handleColumnDataChange({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.ColumnDataChange, args: eventArgs });
  }

  handleColumnVisibilityChange({ datagridColumn, event }: { datagridColumn: AcDatagridColumn, event?: any }) {
    const eventArgs: IAcDatagridColumnEvent = {
      datagridApi: this.datagridApi,
      datagridColumn: datagridColumn,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.ColumnVisibilityChange, args: eventArgs });
    this.notifyStateChange();
  }

  handlePaginationChange() {
    const eventArgs: IAcDatagridPaginationChangeEvent = {
      datagridApi: this.datagridApi,
      pagination: this.datagridApi.pagination!,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.PaginationChange, args: eventArgs });
  }

  handleRowBlur({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowBlur, args: eventArgs });
  }

  handleRowClick({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowClick, args: eventArgs });
  }

  handleRowDataChange({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDataChange, args: eventArgs });
  }

  handleRowDoubleClick({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDoubleClick, args: eventArgs });
  }

  handleRowEditingStart({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowEditingStart, args: eventArgs });
  }

  handleRowEditingStop({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowEditingStop, args: eventArgs });
  }

  handleRowFocus({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowFocus, args: eventArgs });
  }

  handleRowKeyDown({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowKeyDown, args: eventArgs });
  }

  handleRowKeyPress({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowKeyPress, args: eventArgs });
  }

  handleRowMouseDown({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowMouseDown, args: eventArgs });
  }

  handleRowMouseEnter({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowMouseEnter, args: eventArgs });
    const hoverEventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowHover, args: hoverEventArgs });
  }

  handleRowMouseLeave({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowMouseLeave, args: eventArgs });
  }

  handleRowMouseMove({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowMouseMove, args: eventArgs });
  }

  handleRowMouseOver({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowMouseOver, args: eventArgs });
  }

  handleRowMouseUp({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowMouseUp, args: eventArgs });
  }

  handleRowSelectionChange({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowSelectionChange, args: eventArgs });
  }

  handleRowTouchCancel({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowTouchCancel, args: eventArgs });
  }

  handleRowTouchEnd({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowTouchEnd, args: eventArgs });
  }

  handleRowTouchMove({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowTouchMove, args: eventArgs });
  }

  handleRowTouchStart({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowTouchStart, args: eventArgs });
  }

  handleSortOrderChange() {
    const eventArgs: IAcDatagridSortOrderChangeEvent = {
      datagridApi: this.datagridApi,
      sortOrder: this.datagridApi.sortOrder!,
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.SortOrderChange, args: eventArgs });
  }

  private notifyStateChange(){
    this.datagridApi.datagridState.refresh();
    const eventArgs: IAcDatagridStateChangeEvent = {
      datagridApi: this.datagridApi,
      datagridStateJson: this.datagridApi.datagridState.toJson(),
      event: event
    };
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.StateChange, args: eventArgs });
  }

}
