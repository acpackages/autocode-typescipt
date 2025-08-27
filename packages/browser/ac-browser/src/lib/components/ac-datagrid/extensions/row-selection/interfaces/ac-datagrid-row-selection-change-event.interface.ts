import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridRow } from "../../../models/ac-datagrid-row.model";
import { AcDatagridRowSelectionExtension } from "../core/ac-datagrid-row-selection-extension";

export interface IAcDatagridRowSelectionChangeEvent{
  datagridApi:AcDatagridApi,
  datagridRow:AcDatagridRow,
  datagridRowSelectionExtension: AcDatagridRowSelectionExtension,
  isSelected:boolean,
}
