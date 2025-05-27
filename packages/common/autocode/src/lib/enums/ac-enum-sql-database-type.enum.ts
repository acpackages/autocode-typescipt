export const AcEnumSqlDatabaseType = {
  MARIADB: "mariadb",
  MSSQL: "mssql",
  MYSQL: "mysql",
  ORACLE: "oracle",
  POSTGRESQL: "postgresql",
  SQLITE: "sqlite",
  UNKNOWN: "unknown",
} as const;

export type AcEnumSqlDatabaseType = typeof AcEnumSqlDatabaseType[keyof typeof AcEnumSqlDatabaseType];
