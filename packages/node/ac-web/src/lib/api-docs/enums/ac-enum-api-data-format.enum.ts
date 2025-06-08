export const AcEnumApiDataFormat = {
  BYTE: "byte",
  BINARY: "binary",
  DATE: "date",
  DATETIME: "date-time",
  PASSWORD: "password",
  FLOAT: "float",
  DOUBLE: "double",
  INT32: "int32",
  INT64: "int64",
} as const;

export type AcEnumApiDataFormat = typeof AcEnumApiDataFormat[keyof typeof AcEnumApiDataFormat];
