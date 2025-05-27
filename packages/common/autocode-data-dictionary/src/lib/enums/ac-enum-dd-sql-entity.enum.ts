
export const AcEnumDDSqlEntity = {
  FUNCTION: "function",
  RELATIONSHIP: "relationship",
  STORED_PROCEDURE: "stored_procedure",
  TABLE: "table",
  TRIGGER: "trigger",
  VIEW: "view",
} as const;

export type AcEnumDDSqlEntity = typeof AcEnumDDSqlEntity[keyof typeof AcEnumDDSqlEntity];
