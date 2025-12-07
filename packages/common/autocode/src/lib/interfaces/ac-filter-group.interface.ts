import { AcEnumLogicalOperator } from "../enums/ac-enum-logical-operator.enum";
import { IAcFilter } from "./ac-filter.interface";

export interface IAcFilterGroup {
  filters?: IAcFilter[];
  operator: AcEnumLogicalOperator;
  filterGroups?:IAcFilterGroup[];
}
