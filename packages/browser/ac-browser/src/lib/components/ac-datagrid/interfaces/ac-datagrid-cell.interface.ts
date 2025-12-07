/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcDatagridCellElement } from "../elements/ac-datagrid-cell.element";
import { IAcDatagridRow } from "../interfaces/ac-datagrid-row.interface";
import { IAcDatagridColumn } from "./ac-datagrid-column.interface";

export interface IAcDatagridCell {
  isActive?: boolean;
  cellId: string;
  datagridRow: IAcDatagridRow;
  datagridColumn: IAcDatagridColumn;
  extensionData?: Record<string, any>;
  isPinnedLeft?: boolean;
  isPinnedRight?: boolean;
  element?: AcDatagridCellElement;
}
