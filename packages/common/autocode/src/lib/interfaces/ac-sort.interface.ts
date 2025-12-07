import { AcEnumSortOrder } from "../enums/ac-enum-sort-order.enum";

export interface IAcSort {
  key: string;
  order: AcEnumSortOrder;
}
