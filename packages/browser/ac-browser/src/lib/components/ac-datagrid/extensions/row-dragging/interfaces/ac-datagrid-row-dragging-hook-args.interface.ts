import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridRowDraggingExtension } from "../core/ac-datagrid-row-dragging-extension";

export interface IAcDatagridRowDraggingHookArgs {
  datagridApi: AcDatagridApi,
  datagridRowDraggingExtension: AcDatagridRowDraggingExtension,
  value: any
}
