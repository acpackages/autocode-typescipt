export const AcEnumProgrammingLanguage = {
  TYPESCRIPT : 'typescript',
  JAVASCRIPT : 'javascript',
  DART : 'dart',
  PHP : 'php',
  CSHARP : 'csharp',
  JAVA : 'java',
  PYTHON : 'python',
  GO : 'go',
  KOTLIN : 'kotlin',
  SWIFT : 'swift',
  RUBY : 'ruby',
  RUST : 'rust',
  C : 'c',
  CPP : 'cpp',
  OBJECTIVEC : 'objectivec',
  SCALA : 'scala',
  PERL : 'perl',
  HASKELL : 'haskell',
  SQL : 'sql',
  SHELL : 'shell',
  YAML : 'yaml',
  JSON : 'json'
} as const;

export type AcEnumProgrammingLanguage = typeof AcEnumProgrammingLanguage[keyof typeof AcEnumProgrammingLanguage];
