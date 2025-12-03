import { AcDatagridApi, IAcDatagridRow, AcDatagridRowSelectionExtension } from "../../../_ac-datagrid.export";

export interface IAcDatagridSelectionMultipleRowsChangeEvent{
  datagridApi:AcDatagridApi,
  datagridRows:IAcDatagridRow[],
  datagridRowSelectionExtension:AcDatagridRowSelectionExtension,
  isSelected:boolean;
}
