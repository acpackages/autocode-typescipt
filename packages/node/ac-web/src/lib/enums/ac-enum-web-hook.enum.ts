export const AcEnumWebHook = {
  AC_WEB_CREATED: "ac_web_created",
} as const;

export type AcEnumWebHook = typeof AcEnumWebHook[keyof typeof AcEnumWebHook];
