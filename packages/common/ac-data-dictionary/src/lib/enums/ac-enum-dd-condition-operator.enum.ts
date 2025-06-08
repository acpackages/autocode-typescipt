
export const AcEnumDDConditionOperator = {
  BETWEEN: "between",
  CONTAINS: "contains",
  ENDS_WITH: "ends_with",
  EQUAL_TO: "equal_to",
  GREATER_THAN: "greater_than",
  GREATER_THAN_EQUAL_TO: "greater_than_equal_to",
  IN: "in",
  IS_EMPTY: "is_empty",
  IS_NOT_NULL: "is_not_null",
  IS_NULL: "is_null",
  LESS_THAN: "less_than",
  LESS_THAN_EQUAL_TO: "less_than_equal_to",
  NOT_IN: "not_in",
  NOT_EQUAL_TO: "not_equal_to",
  STARTS_WITH: "starts_with",
} as const;

export type AcEnumDDConditionOperator = typeof AcEnumDDConditionOperator[keyof typeof AcEnumDDConditionOperator];
