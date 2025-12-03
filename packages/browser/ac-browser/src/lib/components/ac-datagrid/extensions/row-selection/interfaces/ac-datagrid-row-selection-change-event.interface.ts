import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { IAcDatagridRow } from "../../../interfaces/ac-datagrid-row.interface";
import { AcDatagridRowSelectionExtension } from "../core/ac-datagrid-row-selection-extension";

export interface IAcDatagridRowSelectionChangeEvent{
  datagridApi:AcDatagridApi,
  datagridRow:IAcDatagridRow,
  datagridRowSelectionExtension: AcDatagridRowSelectionExtension,
  isSelected:boolean,
}
