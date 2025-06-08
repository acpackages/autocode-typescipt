export const AcEnumWebResponseType = {
  DOWNLOAD: "download",
  FILE: "file",
  HTML: "html",
  JSON: "json",
  REDIRECT: "redirect",
  RAW: "raw",
  TEXT: "text",
  VIEW: "view",
} as const;

export type AcEnumWebResponseType = typeof AcEnumWebResponseType[keyof typeof AcEnumWebResponseType];
