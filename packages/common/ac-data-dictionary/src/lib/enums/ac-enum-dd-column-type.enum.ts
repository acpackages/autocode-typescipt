
export const AcEnumDDColumnType = {
  AUTO_INCREMENT: "auto_increment",
  AUTO_NUMBER: "auto_number",
  BLOB: "blob",
  DATE: "date",
  DATETIME: "datetime",
  DOUBLE: "double",
  ENCRYPTED: "encrypted",
  INTEGER: "integer",
  JSON: "json",
  MEDIA_JSON: "media_json",
  PASSWORD: "password",
  STRING: "string",
  TEXT: "text",
  TIME: "time",
  TIMESTAMP: "timestamp",
  USER_DEFINED_FUNCTION: "user_defined_function",
  UUID: "uuid",
} as const;

export type AcEnumDDColumnType = typeof AcEnumDDColumnType[keyof typeof AcEnumDDColumnType];
