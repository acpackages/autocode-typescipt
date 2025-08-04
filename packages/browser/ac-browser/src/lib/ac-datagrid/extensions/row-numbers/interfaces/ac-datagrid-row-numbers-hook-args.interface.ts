import { AcDatagridApi } from "../../../core/ac-datagrid-api";
import { AcDatagridRowNumbersExtension } from "../_row-numbers.export";

export interface IAcDatagridRowNumbersHookArgs {
  datagridApi: AcDatagridApi,
  datagridRowNumbersExtension: AcDatagridRowNumbersExtension
  value: any
}
