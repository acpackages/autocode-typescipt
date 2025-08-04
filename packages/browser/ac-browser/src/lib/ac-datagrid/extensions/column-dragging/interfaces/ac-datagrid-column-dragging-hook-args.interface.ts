import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridColumnDraggingExtension } from "../core/ac-datagrid-column-dragging-extension";

export interface IAcDatagridColumnDraggingHookArgs {
  datagridApi: AcDatagridApi,
  datagridColumnDraggingExtension: AcDatagridColumnDraggingExtension,
  value: any
}
