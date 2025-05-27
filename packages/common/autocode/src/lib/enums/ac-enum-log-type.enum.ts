export const AcEnumLogType = {
  CONSOLE: 'console',
  PRINT: 'print',
  HTML: 'html',
  SQLITE: 'sqlite',
  TEXT: 'text',
} as const;

export type AcEnumLogType = typeof AcEnumLogType[keyof typeof AcEnumLogType];
