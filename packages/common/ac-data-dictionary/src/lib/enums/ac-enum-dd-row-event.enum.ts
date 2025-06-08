
export const AcEnumDDRowEvent = {
  AFTER_DELETE: "after_delete",
  AFTER_FORMAT: "after_format",
  AFTER_INSERT: "after_insert",
  AFTER_MODIFY: "after_modify",
  AFTER_SAVE: "after_save",
  AFTER_UPDATE: "after_update",
  BEFORE_DELETE: "before_delete",
  BEFORE_FORMAT: "before_format",
  BEFORE_INSERT: "before_insert",
  BEFORE_MODIFY: "before_modify",
  BEFORE_SAVE: "before_save",
  BEFORE_UPDATE: "before_update",
  UNKNOWN: "unknown",
} as const;

export type AcEnumDDRowEvent = typeof AcEnumDDRowEvent[keyof typeof AcEnumDDRowEvent];
