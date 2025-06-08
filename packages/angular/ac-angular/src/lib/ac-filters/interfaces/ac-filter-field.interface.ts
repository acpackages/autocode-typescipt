import { AcEnumFilterFieldType } from "../enums/ac-filter-field-types.enum"
import { AcEnumFilterComparisonOperator, AcEnumFilterLogicalOperator } from "../enums/ac-filter-operators.enum"

export interface IAcFilterField{
  field?:string,
  type?:AcEnumFilterFieldType,
  title?:string
}

export interface IAcFilterGroup{
  operator: AcEnumFilterLogicalOperator
  conditions?:IAcFilterCondition[],
  filterGroups?:IAcFilterGroup[]
}

export interface IAcFilterCondition{
  operator:AcEnumFilterComparisonOperator
  field:string,
  value:any,
}
