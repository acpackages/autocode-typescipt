import { AcDDTable,AcDDTableColumn, AcDDTableColumnProperty, AcEnumDDColumnProperty, AcEnumDDColumnType } from "@autocode-ts/ac-data-dictionary";

export class AcSchemaManagerTables {
  static readonly SchemaDetails = "_ac_schema_details";
  static readonly SchemaLogs = "_ac_schema_logs";
}

export class TblSchemaDetails {
  static readonly AcSchemaDetailId = "ac_schema_detail_id";
  static readonly AcSchemaDetailKey = "ac_schema_detail_key";
  static readonly AcSchemaDetailStringValue = "ac_schema_detail_string_value";
  static readonly AcSchemaDetailNumericValue = "ac_schema_detail_numeric_value";
}

export class TblSchemaLogs {
  static readonly AcSchemaLogId = "ac_schema_log_id";
  static readonly AcSchemaOperation = "ac_schema_operation";
  static readonly AcSchemaEntityType = "ac_schema_entity_type";
  static readonly AcSchemaEntityName = "ac_schema_entity_name";
  static readonly AcSchemaOperationStatement = "ac_schema_operation_statement";
  static readonly AcSchemaOperationResult = "ac_schema_operation_result";
  static readonly AcSchemaOperationTimestamp = "ac_schema_operation_timestamp";
}

export class SchemaDetails {
  static readonly KeyCreatedOn = "CREATED_ON";
  static readonly KeyDataDictionaryVersion = "DATA_DICTIONARY_VERSION";
  static readonly KeyLastUpdatedOn = "LAST_UPDATED_ON";
}

// Simulated enum references (these should be actual enum definitions in your codebase)
// const AcEnumDDColumnType = {
//   AUTO_INCREMENT: "AUTO_INCREMENT",
//   STRING: "STRING",
//   TEXT: "TEXT",
//   DOUBLE: "DOUBLE",
//   TIMESTAMP: "TIMESTAMP"
// };

// const AcEnumDDColumnProperty = {
//   PrimaryKey: "PrimaryKey",
//   CheckInSave: "CheckInSave"
// };

// const AcDDTable = {
//   KeyTableName: "tableName",
//   KeyTableColumns: "columns"
// };

// const AcDDTableColumn = {
//   KeyColumnName: "columnName",
//   KeyColumnType: "columnType",
//   KeyColumnProperties: "properties"
// };

// const AcDDTableColumnProperty = {
//   KeyPropertyName: "propertyName",
//   KeyPropertyValue: "propertyValue"
// };

export class AcSMDataDictionary {
  static readonly DataDictionaryName = "_ac_schema";

  static readonly DATA_DICTIONARY = {
    version: 1,
    tables: {
      [AcSchemaManagerTables.SchemaDetails]: {
        [AcDDTable.KeyTableName]: AcSchemaManagerTables.SchemaDetails,
        [AcDDTable.KeyTableColumns]: {
          [TblSchemaDetails.AcSchemaDetailId]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaDetails.AcSchemaDetailId,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.AutoIncrement,
            [AcDDTableColumn.KeyColumnProperties]: {
              [AcEnumDDColumnProperty.PrimaryKey]: {
                [AcDDTableColumnProperty.KeyPropertyName]: AcEnumDDColumnProperty.PrimaryKey,
                [AcDDTableColumnProperty.KeyPropertyValue]: true,
              }
            }
          },
          [TblSchemaDetails.AcSchemaDetailKey]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaDetails.AcSchemaDetailKey,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.String,
            [AcDDTableColumn.KeyColumnProperties]: {
              [AcEnumDDColumnProperty.CheckInSave]: {
                [AcDDTableColumnProperty.KeyPropertyName]: AcEnumDDColumnProperty.CheckInSave,
                [AcDDTableColumnProperty.KeyPropertyValue]: true,
              }
            }
          },
          [TblSchemaDetails.AcSchemaDetailStringValue]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaDetails.AcSchemaDetailStringValue,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.Text,
            [AcDDTableColumn.KeyColumnProperties]: {}
          },
          [TblSchemaDetails.AcSchemaDetailNumericValue]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaDetails.AcSchemaDetailNumericValue,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.Double,
            [AcDDTableColumn.KeyColumnProperties]: {}
          }
        }
      },
      [AcSchemaManagerTables.SchemaLogs]: {
        [AcDDTable.KeyTableName]: AcSchemaManagerTables.SchemaLogs,
        [AcDDTable.KeyTableColumns]: {
          [TblSchemaLogs.AcSchemaLogId]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaLogs.AcSchemaLogId,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.AutoIncrement,
            [AcDDTableColumn.KeyColumnProperties]: {
              [AcEnumDDColumnProperty.PrimaryKey]: {
                [AcDDTableColumnProperty.KeyPropertyName]: AcEnumDDColumnProperty.PrimaryKey,
                [AcDDTableColumnProperty.KeyPropertyValue]: true,
              }
            }
          },
          [TblSchemaLogs.AcSchemaOperation]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaLogs.AcSchemaOperation,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.String,
            [AcDDTableColumn.KeyColumnProperties]: {}
          },
          [TblSchemaLogs.AcSchemaEntityType]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaLogs.AcSchemaEntityType,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.Text,
            [AcDDTableColumn.KeyColumnProperties]: {}
          },
          [TblSchemaLogs.AcSchemaEntityName]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaLogs.AcSchemaEntityName,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.Text,
            [AcDDTableColumn.KeyColumnProperties]: {}
          },
          [TblSchemaLogs.AcSchemaOperationStatement]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaLogs.AcSchemaOperationStatement,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.Text,
            [AcDDTableColumn.KeyColumnProperties]: {}
          },
          [TblSchemaLogs.AcSchemaOperationResult]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaLogs.AcSchemaOperationResult,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.Text,
            [AcDDTableColumn.KeyColumnProperties]: {}
          },
          [TblSchemaLogs.AcSchemaOperationTimestamp]: {
            [AcDDTableColumn.KeyColumnName]: TblSchemaLogs.AcSchemaOperationTimestamp,
            [AcDDTableColumn.KeyColumnType]: AcEnumDDColumnType.Timestamp,
            [AcDDTableColumn.KeyColumnProperties]: {}
          }
        }
      }
    }
  };
}
