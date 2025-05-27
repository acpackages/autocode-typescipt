export const AcEnumCssUnit = {
  PX: 'px',
  CM: 'cm',
  MM: 'mm',
  IN: 'in',
  PT: 'pt',
  PC: 'pc',
} as const;

export type AcEnumCssUnit = typeof AcEnumCssUnit[keyof typeof AcEnumCssUnit];
