/* eslint-disable @typescript-eslint/no-inferrable-types */
import { IAcDataRow } from "@autocode-ts/autocode";
import { AcDatagridRowElement } from "../elements/ac-datagrid-row.element";
import { IAcDatagridCell } from "./ac-datagrid-cell.interface";

export interface IAcDatagridRow extends IAcDataRow {
  isActive?:boolean;
  element?: AcDatagridRowElement;
  datagridCells: IAcDatagridCell[];
  isLast?:boolean;
  isFirst?:boolean;
}
