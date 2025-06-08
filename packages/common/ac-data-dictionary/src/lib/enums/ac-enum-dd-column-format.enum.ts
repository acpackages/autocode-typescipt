
export const AcEnumDDColumnFormat = {
  DATE: "date",
  ENCRYPT: "encrypt",
  HIDE_COLUMN: "hide_column",
  JSON: "json",
  LOWERCASE: "lowercase",
  UPPERCASE: "uppercase",
} as const;

export type AcEnumDDColumnFormat = typeof AcEnumDDColumnFormat[keyof typeof AcEnumDDColumnFormat];
