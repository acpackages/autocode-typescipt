import { AcDataDictionary, AcDDFunction, AcDDRelationship, AcDDStoredProcedure, AcDDTable, AcDDTableColumn, AcDDTrigger, AcDDView, AcDDViewColumn, AcEnumDDColumnProperty, AcEnumDDTableProperty } from "@autocode-ts/ac-data-dictionary";

export class Tables {
  static readonly dataDictionaries = 'data_dictionaries';
  static readonly functions = 'functions';
  static readonly relationships = 'relationships';
  static readonly storedProcedures = 'stored_procedures';
  static readonly tableColumns = 'table_columns';
  static readonly tables = 'tables';
  static readonly triggers = 'triggers';
  static readonly viewColumns = 'view_columns';
  static readonly views = 'views';
}
export class TblDataDictionaries {
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly  dataDictionaryName = 'data_dictionary_name';
  static readonly  dataDictionaryVersion = 'data_dictionary_version';
  static readonly  extensionsData = 'extensions_data';
}
export class TblFunctions {
  static readonly  dataDictionaryId = TblDataDictionaries.dataDictionaryId;
  static readonly  functionId = 'function_id';
  static readonly  functionName = AcDDFunction.KeyFunctionName;
  static readonly  functionCode = AcDDFunction.KeyFunctionCode;
  static readonly  extensionsData = 'extensions_data';
}
export class TblRelationships {
  static readonly cascadeDeleteDestination = AcDDRelationship.KeyCascadeDeleteDestination;
  static readonly cascadeDeleteSource = AcDDRelationship.KeyCascadeDeleteSource;
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly destinationColumnId = 'destination_column_id';
  static readonly destinationTableId = 'destination_table_id';
  static readonly relationshipId = 'relationship_id';
  static readonly sourceColumnId = 'source_column_id';
  static readonly sourceTableId = 'source_table_id';
  static readonly extensionsData = 'extensions_data';
}
export class TblStoredProcedures {
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly storedProcedureCode = AcDDStoredProcedure.KeyStoredProcedureCode;
  static readonly storedProcedureId = 'stored_procedure_id';
  static readonly storedProcedureName = AcDDStoredProcedure.KeyStoredProcedureName;
  static readonly extensionsData = 'extensions_data';
}
export class TblTableColumns {
  static readonly autoIncrement = AcEnumDDColumnProperty.AutoIncrement;
  static readonly autoNumberLength = AcEnumDDColumnProperty.AutoNumberLength;
  static readonly autoNumberPrefix = AcEnumDDColumnProperty.AutoNumberPrefix;
  static readonly checkInAutoNumber = AcEnumDDColumnProperty.CheckInAutoNumber;
  static readonly checkInModify = AcEnumDDColumnProperty.CheckInModify;
  static readonly checkInSave = AcEnumDDColumnProperty.CheckInSave;
  static readonly columnId = 'column_id';
  static readonly columnName = AcDDTableColumn.KeyColumnName;
  static readonly columnProperties = AcDDTableColumn.KeyColumnProperties;
  static readonly columnTitle = AcEnumDDColumnProperty.ColumnTitle;
  static readonly columnType = AcDDTableColumn.KeyColumnType;
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly defaultValue = AcEnumDDColumnProperty.DefaultValue;
  static readonly foreignKey = AcEnumDDColumnProperty.ForeignKey;
  static readonly format = AcEnumDDColumnProperty.Format;
  static readonly inSearchQuery = AcEnumDDColumnProperty.InSearchQuery;
  static readonly isSelectDistinct = AcEnumDDColumnProperty.IsSelectDistinct;
  static readonly notNull = AcEnumDDColumnProperty.NotNull;
  static readonly primaryKey = AcEnumDDColumnProperty.PrimaryKey;
  static readonly remarks = AcEnumDDColumnProperty.Remarks;
  static readonly required = AcEnumDDColumnProperty.Required;
  static readonly selectOptions = AcEnumDDColumnProperty.SelectOptions;
  static readonly setNullBeforeDelete = AcEnumDDColumnProperty.SetNullBeforeDelete;
  static readonly size = AcEnumDDColumnProperty.Size;
  static readonly tableId = 'table_id';
  static readonly uniqueKey = AcEnumDDColumnProperty.UniqueKey;
  static readonly extensionsData = 'extensions_data'
}
export class TblTables {
  static readonly additionalFilterColumns = AcEnumDDTableProperty.AdditionalFilterColumns;
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly index = AcEnumDDTableProperty.Index;
  static readonly orderBy = AcEnumDDTableProperty.OrderBy;
  static readonly pluralName = AcEnumDDTableProperty.PluralName;
  static readonly selectQuery = AcEnumDDTableProperty.SelectQuery;
  static readonly selectQueryColumns = AcEnumDDTableProperty.SelectQueryColumns;
  static readonly selectRequestColumns = AcEnumDDTableProperty.SelectRequestColumns;
  static readonly singularName = AcEnumDDTableProperty.SingularName;
  static readonly viewId = 'view_id';
  static readonly tableId = 'table_id';
  static readonly tableName = AcDDTable.KeyTableName;
  static readonly tableProperties = AcDDTable.KeyTableProperties;
  static readonly extensionsData = 'extensions_data'
}
export class TblTriggers {
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly rowOperation = AcDDTrigger.KeyRowOperation;
  static readonly tableId = 'table_id';
  static readonly triggerCode = AcDDTrigger.KeyTriggerCode;
  static readonly triggerExecution = AcDDTrigger.KeyTriggerExecution;
  static readonly triggerId = 'trigger_id';
  static readonly triggerName = AcDDTrigger.KeyTriggerName;
  static readonly extensionsData = 'extensions_data'
}
export class TblViewColumns {
  static readonly columnId = 'column_id';
  static readonly columnName = AcDDViewColumn.KeyColumnName;
  static readonly columnProperties = AcDDViewColumn.KeyColumnProperties;
  static readonly columnSource = AcDDViewColumn.KeyColumnSource;
  static readonly columnSourceName = AcDDViewColumn.KeyColumnSourceName;
  static readonly columnType = AcDDViewColumn.KeyColumnType;
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly viewId = 'view_id';
  static readonly extensionsData = 'extensions_data'
}
export class TblViews {
  static readonly dataDictionaryId = 'data_dictionary_id';
  static readonly viewId = 'view_id';
  static readonly viewName = AcDDView.KeyViewName;
  static readonly viewQuery = AcDDView.KeyViewQuery;
  static readonly extensionsData = 'extensions_data'
}


export const acDDEDataDictionary = {
  [AcDataDictionary.KeyVersion] : 1,
  [AcDataDictionary.KeyTables] : {
    [Tables.tables]:{
      [AcDDTable.KeyTableName] : [Tables.tables],
      [AcDDTable.KeyTableColumns] : {
        [TblTables.additionalFilterColumns]:{
          [AcDDTableColumn.KeyColumnName]:[TblTables.additionalFilterColumns],
          // [AcDDTableColumn.KeyColumnName]:[TblTables.additionalFilterColumns],
        }
      }
    }
  }
}
