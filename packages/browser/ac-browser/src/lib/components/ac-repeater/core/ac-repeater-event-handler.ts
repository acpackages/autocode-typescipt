import { AcEnumRepeaterEvent } from "../enums/ac-enum-repeater-event.enum";
import { IAcRepeaterPaginationChangeEvent } from "../interfaces/event-args/ac-repeater-pagination-change-event.interface";
import { IAcRepeaterRowEvent } from "../interfaces/event-args/ac-repeater-row-event.interface";
import { IAcRepeaterSortOrderChangeEvent } from "../interfaces/event-args/ac-repeater-sort-order-change-event.interface";
import { IAcRepeaterStateChangeEvent } from "../interfaces/event-args/ac-repeater-state-change-event.interface";
import { AcRepeaterRow } from "../models/ac-repeater-row.model";
import { AcRepeaterApi } from "./ac-repeater-api";


export class AcRepeaterEventHandler {
  repeaterApi!: AcRepeaterApi;
  constructor({ repeaterApi }: { repeaterApi: AcRepeaterApi }) {
    this.repeaterApi = repeaterApi;
  }

  handlePaginationChange() {
    const eventArgs: IAcRepeaterPaginationChangeEvent = {
      repeaterApi: this.repeaterApi,
      pagination: this.repeaterApi.pagination!,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.PaginationChange, args: eventArgs });
  }

  handleRowBlur({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowBlur, args: eventArgs });
  }

  handleRowClick({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowClick, args: eventArgs });
  }

  handleRowDataChange({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowDataChange, args: eventArgs });
  }

  handleRowDoubleClick({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowDoubleClick, args: eventArgs });
  }

  handleRowEditingStart({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowEditingStart, args: eventArgs });
  }

  handleRowEditingStop({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowEditingStop, args: eventArgs });
  }

  handleRowFocus({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowFocus, args: eventArgs });
  }

  handleRowKeyDown({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowKeyDown, args: eventArgs });
  }

  handleRowKeyPress({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowKeyPress, args: eventArgs });
  }

  handleRowMouseDown({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowMouseDown, args: eventArgs });
  }

  handleRowMouseEnter({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowMouseEnter, args: eventArgs });
    const hoverEventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowHover, args: hoverEventArgs });
  }

  handleRowMouseLeave({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowMouseLeave, args: eventArgs });
  }

  handleRowMouseMove({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowMouseMove, args: eventArgs });
  }

  handleRowMouseOver({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowMouseOver, args: eventArgs });
  }

  handleRowMouseUp({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowMouseUp, args: eventArgs });
  }

  handleRowSelectionChange({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowSelectionChange, args: eventArgs });
  }

  handleRowTouchCancel({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowTouchCancel, args: eventArgs });
  }

  handleRowTouchEnd({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowTouchEnd, args: eventArgs });
  }

  handleRowTouchMove({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowTouchMove, args: eventArgs });
  }

  handleRowTouchStart({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.RowTouchStart, args: eventArgs });
  }

  handleSortOrderChange() {
    const eventArgs: IAcRepeaterSortOrderChangeEvent = {
      repeaterApi: this.repeaterApi,
      sortOrder: this.repeaterApi.sortOrder!,
      event: event
    };
    this.repeaterApi.events.execute({ event: AcEnumRepeaterEvent.SortOrderChange, args: eventArgs });
  }

}
