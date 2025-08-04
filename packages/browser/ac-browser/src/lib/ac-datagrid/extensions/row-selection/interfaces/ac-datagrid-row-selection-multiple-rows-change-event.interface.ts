import { AcDatagridApi, AcDatagridRow, AcDatagridRowSelectionExtension } from "../../../_ac-datagrid.export";

export interface IAcDatagridSelectionMultipleRowsChangeEvent{
  datagridApi:AcDatagridApi,
  datagridRows:AcDatagridRow[],
  datagridRowSelectionExtension:AcDatagridRowSelectionExtension,
  isSelected:boolean;
}
