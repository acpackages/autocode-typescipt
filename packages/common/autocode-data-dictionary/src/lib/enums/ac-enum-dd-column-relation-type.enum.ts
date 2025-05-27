export const AcEnumDDColumnRelationType = {
  ANY: "any",
  SOURCE: "source",
  DESTINATION: "destination",
} as const;

export type AcEnumDDColumnRelationType = typeof AcEnumDDColumnRelationType[keyof typeof AcEnumDDColumnRelationType];
