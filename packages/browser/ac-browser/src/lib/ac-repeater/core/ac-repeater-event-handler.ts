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
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.PaginationChange, args: eventArgs });
  }

  handleRowBlur({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowBlur, args: eventArgs });
  }

  handleRowClick({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowClick, args: eventArgs });
  }

  handleRowDataChange({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowDataChange, args: eventArgs });
  }

  handleRowDoubleClick({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowDoubleClick, args: eventArgs });
  }

  handleRowEditingStart({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowEditingStart, args: eventArgs });
  }

  handleRowEditingStop({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowEditingStop, args: eventArgs });
  }

  handleRowFocus({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowFocus, args: eventArgs });
  }

  handleRowKeyDown({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowKeyDown, args: eventArgs });
  }

  handleRowKeyPress({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowKeyPress, args: eventArgs });
  }

  handleRowMouseDown({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowMouseDown, args: eventArgs });
  }

  handleRowMouseEnter({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowMouseEnter, args: eventArgs });
    const hoverEventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowHover, args: hoverEventArgs });
  }

  handleRowMouseLeave({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowMouseLeave, args: eventArgs });
  }

  handleRowMouseMove({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowMouseMove, args: eventArgs });
  }

  handleRowMouseOver({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowMouseOver, args: eventArgs });
  }

  handleRowMouseUp({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowMouseUp, args: eventArgs });
  }

  handleRowSelectionChange({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowSelectionChange, args: eventArgs });
  }

  handleRowTouchCancel({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowTouchCancel, args: eventArgs });
  }

  handleRowTouchEnd({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowTouchEnd, args: eventArgs });
  }

  handleRowTouchMove({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowTouchMove, args: eventArgs });
  }

  handleRowTouchStart({ repeaterRow, event }: { repeaterRow: AcRepeaterRow, event?: any }) {
    const eventArgs: IAcRepeaterRowEvent = {
      repeaterApi: this.repeaterApi,
      repeaterRow: repeaterRow,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.RowTouchStart, args: eventArgs });
  }

  handleSortOrderChange() {
    const eventArgs: IAcRepeaterSortOrderChangeEvent = {
      repeaterApi: this.repeaterApi,
      sortOrder: this.repeaterApi.sortOrder!,
      event: event
    };
    this.repeaterApi.events.execute({ eventName: AcEnumRepeaterEvent.SortOrderChange, args: eventArgs });
  }

}
