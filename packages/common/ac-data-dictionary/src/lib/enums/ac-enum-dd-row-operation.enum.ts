export const AcEnumDDRowOperation = {
  DELETE: "delete",
  FORMAT: "format",
  INSERT: "insert",
  SAVE: "save",
  SELECT: "select",
  UPDATE: "update",
  UNKNOWN: "unknown",
} as const;

export type AcEnumDDRowOperation = typeof AcEnumDDRowOperation[keyof typeof AcEnumDDRowOperation];
