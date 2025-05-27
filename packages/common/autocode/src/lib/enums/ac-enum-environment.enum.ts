export const AcEnumEnvironment = {
  DEVELOPMENT: 'development',
  LOCAL: 'local',
  PRODUCTION: 'production',
  STAGING: 'staging',
} as const;

export type AcEnumEnvironment = typeof AcEnumEnvironment[keyof typeof AcEnumEnvironment];
