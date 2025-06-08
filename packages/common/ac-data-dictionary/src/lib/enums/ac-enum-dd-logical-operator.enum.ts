
export const AcEnumDDLogicalOperator = {
  AND: "and",
  OR: "or",
} as const;

export type AcEnumDDLogicalOperator = typeof AcEnumDDLogicalOperator[keyof typeof AcEnumDDLogicalOperator];
