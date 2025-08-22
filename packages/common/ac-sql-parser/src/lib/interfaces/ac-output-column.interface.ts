import { IAcColumnReference } from "./ac-column-reference.interface";

export interface IAcOutputColumn extends IAcColumnReference {
  columnIndex: number;
}
