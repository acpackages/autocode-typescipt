export declare const AcEnumSqlDatabaseType: {
    readonly MARIADB: "mariadb";
    readonly MSSQL: "mssql";
    readonly MYSQL: "mysql";
    readonly ORACLE: "oracle";
    readonly POSTGRESQL: "postgresql";
    readonly SQLITE: "sqlite";
    readonly UNKNOWN: "unknown";
};
export type AcEnumSqlDatabaseType = typeof AcEnumSqlDatabaseType[keyof typeof AcEnumSqlDatabaseType];
