import { AcDatagridApi, AcDatagridRow, AcEnumDatagridEvent, IAcDatagridRowEvent } from "../../../_ac-datagrid.export";
import { AcDatagridRowDraggingExtension } from "./_core.export";

export class AcDatagridRowDraggingEventHandler {
  datagridApi!: AcDatagridApi;
  rowDraggingExtension!: AcDatagridRowDraggingExtension;
  constructor({ rowDraggingExtension }: { rowDraggingExtension: AcDatagridRowDraggingExtension }) {
    this.rowDraggingExtension = rowDraggingExtension;
    this.datagridApi = rowDraggingExtension.datagridApi;
  }

  handleRowDrag({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDrag, args: eventArgs });
  }

   handleRowDragCancel({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDragEnd, args: eventArgs });
  }

  handleRowDragDrop({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDragDrop, args: eventArgs });
  }

  handleRowDragEnd({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDragEnd, args: eventArgs });
  }

  handleRowDragEnter({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDragEnter, args: eventArgs });
  }

  handleRowDragLeave({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDragLeave, args: eventArgs });
  }

  handleRowDragOver({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDragOver, args: eventArgs });
  }

  handleRowDragStart({ datagridRow, event }: { datagridRow: AcDatagridRow, event?: any }) {
    const eventArgs: IAcDatagridRowEvent = {
      datagridApi: this.datagridApi,
      datagridRow: datagridRow,
      event: event
    };
    console.log(eventArgs);
    this.datagridApi.events.execute({ eventName: AcEnumDatagridEvent.RowDragStart, args: eventArgs });
  }
}
