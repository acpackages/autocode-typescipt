export const AcEnumStringCase  = {
  CAMEL : 'camel',
  CAMEL_SNAKE : 'camel_snake',
  CAPITAL : 'capital',
  CAPITAL_SNAKE : 'capital_snake',
  COBOL : 'cobol',
  DOT : 'dot',
  KEBAB : 'kebab',
  LOWER : 'lower',
  PASCAL : 'pascal',
  PASCAL_SNAKE : 'pascal_snake',
  SCREAMING_SNAKE : 'screaming_snake',
  SENTENCE : 'sentence',
  SNAKE : 'snake',
  TRAIN : 'train',
  UPPER : 'upper',
}  as const;

export type AcEnumStringCase = typeof AcEnumStringCase[keyof typeof AcEnumStringCase];
