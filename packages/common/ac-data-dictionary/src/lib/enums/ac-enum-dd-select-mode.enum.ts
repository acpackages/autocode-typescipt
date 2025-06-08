
export const AcEnumDDSelectMode = {
  ALL: "all",
  COUNT: "count",
  FIRST: "first",
  LIST: "list",
  LIST_WITH_COUNT: "list_with_count",
} as const;

export type AcEnumDDSelectMode = typeof AcEnumDDSelectMode[keyof typeof AcEnumDDSelectMode];
