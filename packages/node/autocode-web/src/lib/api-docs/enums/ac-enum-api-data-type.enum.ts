export const AcEnumApiDataType = {
  ARRAY: "array",
  BOOLEAN: "boolean",
  INTEGER: "integer",
  OBJECT: "object",
  STRING: "string",
  NUMBER: "number",
} as const;

export type AcEnumApiDataType = typeof AcEnumApiDataType[keyof typeof AcEnumApiDataType];
