import { AcDataDictionary, AcDDTable, AcDDTableColumn, AcDDTableColumnProperty,AcEnumDDColumnType,AcEnumDDColumnProperty } from "@autocode-ts/ac-data-dictionary";
/* Keys Start */
/* Table Keys Start */

export class Tables {
	static readonly DataDictionaries = "data_dictionaries";
	static readonly Functions = "functions";
	static readonly Relationships = "relationships";
	static readonly StoredProcedures = "stored_procedures";
	static readonly TableColumns = "table_columns";
	static readonly Tables = "tables";
	static readonly Triggers = "triggers";
	static readonly ViewColumns = "view_columns";
	static readonly Views = "views";
	static readonly State = "state";
}

export class TblDataDictionaries {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly DataDictionaryName = "dataDictionaryName";
	static readonly DataDictionaryVersion = "dataDictionaryVersion";
	static readonly ExtensionsData = "extensions_data";
}
export class TblFunctions {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly FunctionId = "functionId";
	static readonly FunctionName = "functionName";
	static readonly FunctionCode = "functionCode";
}
export class TblRelationships {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly CascadeDeleteDestination = "cascadeDeleteDestination";
	static readonly CascadeDeleteSource = "cascadeDeleteSource";
	static readonly DestinationColumnId = "destinationColumnId";
	static readonly DestinationTableId = "destinationTableId";
	static readonly RelationshipId = "relationshipId";
	static readonly SourceColumnId = "sourceColumnId";
	static readonly SourceTableId = "sourceTableId";
}
export class TblStoredProcedures {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly StoredProcedureCode = "storedProcedureCode";
	static readonly StoredProcedureId = "storedProcedureId";
	static readonly StoredProcedureName = "storedProcedureName";
}
export class TblTableColumns {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly AutoIncrement = "auto_increment";
	static readonly AutoNumberLength = "auto_number_length";
	static readonly AutoNumberPrefix = "auto_number_prefix";
	static readonly CheckInAutoNumber = "check_in_auto_number";
	static readonly CheckInModify = "check_in_modify";
	static readonly CheckInSave = "check_in_save";
	static readonly ColumnId = "columnId";
	static readonly ColumnName = "columnName";
	static readonly ColumnProperties = "columnProperties";
	static readonly ColumnTitle = "column_title";
	static readonly ColumnType = "columnType";
	static readonly DefaultValue = "default_value";
	static readonly ForeignKey = "foreign_key";
	static readonly Format = "format";
	static readonly InSearchKey = "in_search_key";
	static readonly IsSelectDistinct = "is_select_distinct";
	static readonly NotNull = "not_null";
	static readonly PrimaryKey = "primary_key";
	static readonly Remarks = "remarks";
	static readonly Required = "required";
	static readonly SelectOptions = "select_options";
	static readonly SetNullBeforeDelete = "set_null_before_delete";
	static readonly Size = "size";
	static readonly TableId = "tableId";
	static readonly UniqueKey = "unique_key";
	static readonly ColumnIndex = "column_index";
}
export class TblTables {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly AdditionalFilterColumns = "additional_filter_columns";
	static readonly TableIndex = "table_index";
	static readonly OrderBy = "order_by";
	static readonly PluralName = "plural_name";
	static readonly SelectQuery = "select_query";
	static readonly SelectQueryColumns = "select_query_columns";
	static readonly SelectRequestColumns = "select_request_columns";
	static readonly SingularName = "singular_name";
	static readonly ViewId = "viewId";
	static readonly TableId = "tableId";
	static readonly TableName = "tableName";
	static readonly TableProperties = "tableProperties";
}
export class TblTriggers {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly RowOperation = "rowOperation";
	static readonly TableId = "tableId";
	static readonly TriggerCode = "triggerCode";
	static readonly TriggerExecution = "triggerExecution";
	static readonly TriggerId = "triggerId";
	static readonly TriggerName = "triggerName";
}
export class TblViewColumns {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly ColumnId = "columnId";
	static readonly ColumnName = "columnName";
	static readonly ColumnProperties = "columnProperties";
	static readonly ColumnSource = "columnSource";
	static readonly ColumnSourceName = "columnSourceName";
	static readonly ColumnType = "columnType";
	static readonly ViewId = "viewId";
	static readonly ColumnIndex = "column_index";
}
export class TblViews {
	static readonly DataDictionaryId = "dataDictionaryId";
	static readonly ExtensionsData = "extensions_data";
	static readonly ViewId = "viewId";
	static readonly ViewName = "viewName";
	static readonly ViewQuery = "viewQuery";
	static readonly ViewIndex = "view_index";
}
export class TblState {
	static readonly StateId = "state_id";
	static readonly StateKey = "state_key";
	static readonly StateValue = "state_value";
}

/* Table Keys End */
/* Keys End */


export const DataDictionary = {
	[AcDataDictionary.KeyName] : "ac_dde",
	[AcDataDictionary.KeyVersion] : 1,
	[AcDataDictionary.KeyTables] : {
		[Tables.DataDictionaries] : {
			[AcDDTable.KeyTableName] : Tables.DataDictionaries,
			[AcDDTable.KeyTableColumns] : {
				[TblDataDictionaries.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblDataDictionaries.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblDataDictionaries.DataDictionaryName] : {
					[AcDDTableColumn.KeyColumnName] : TblDataDictionaries.DataDictionaryName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblDataDictionaries.DataDictionaryVersion] : {
					[AcDDTableColumn.KeyColumnName] : TblDataDictionaries.DataDictionaryVersion,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Integer,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblDataDictionaries.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblDataDictionaries.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				}
			}
		},
		[Tables.Functions] : {
			[AcDDTable.KeyTableName] : Tables.Functions,
			[AcDDTable.KeyTableColumns] : {
				[TblFunctions.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblFunctions.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblFunctions.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblFunctions.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblFunctions.FunctionId] : {
					[AcDDTableColumn.KeyColumnName] : TblFunctions.FunctionId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblFunctions.FunctionName] : {
					[AcDDTableColumn.KeyColumnName] : TblFunctions.FunctionName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblFunctions.FunctionCode] : {
					[AcDDTableColumn.KeyColumnName] : TblFunctions.FunctionCode,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				}
			}
		},
		[Tables.Relationships] : {
			[AcDDTable.KeyTableName] : Tables.Relationships,
			[AcDDTable.KeyTableColumns] : {
				[TblRelationships.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblRelationships.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblRelationships.CascadeDeleteDestination] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.CascadeDeleteDestination,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblRelationships.CascadeDeleteSource] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.CascadeDeleteSource,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblRelationships.DestinationColumnId] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.DestinationColumnId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblRelationships.DestinationTableId] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.DestinationTableId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblRelationships.RelationshipId] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.RelationshipId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblRelationships.SourceColumnId] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.SourceColumnId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblRelationships.SourceTableId] : {
					[AcDDTableColumn.KeyColumnName] : TblRelationships.SourceTableId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				}
			}
		},
		[Tables.StoredProcedures] : {
			[AcDDTable.KeyTableName] : Tables.StoredProcedures,
			[AcDDTable.KeyTableColumns] : {
				[TblStoredProcedures.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblStoredProcedures.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblStoredProcedures.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblStoredProcedures.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblStoredProcedures.StoredProcedureCode] : {
					[AcDDTableColumn.KeyColumnName] : TblStoredProcedures.StoredProcedureCode,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblStoredProcedures.StoredProcedureId] : {
					[AcDDTableColumn.KeyColumnName] : TblStoredProcedures.StoredProcedureId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblStoredProcedures.StoredProcedureName] : {
					[AcDDTableColumn.KeyColumnName] : TblStoredProcedures.StoredProcedureName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				}
			}
		},
		[Tables.TableColumns] : {
			[AcDDTable.KeyTableName] : Tables.TableColumns,
			[AcDDTable.KeyTableColumns] : {
				[TblTableColumns.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTableColumns.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.AutoIncrement] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.AutoIncrement,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.AutoNumberLength] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.AutoNumberLength,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Integer,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.AutoNumberPrefix] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.AutoNumberPrefix,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.CheckInAutoNumber] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.CheckInAutoNumber,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.CheckInModify] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.CheckInModify,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.CheckInSave] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.CheckInSave,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.ColumnId] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ColumnId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTableColumns.ColumnName] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ColumnName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTableColumns.ColumnProperties] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ColumnProperties,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.ColumnTitle] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ColumnTitle,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.ColumnType] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ColumnType,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.DefaultValue] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.DefaultValue,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.ForeignKey] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ForeignKey,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.Format] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.Format,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.InSearchKey] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.InSearchKey,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.IsSelectDistinct] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.IsSelectDistinct,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.NotNull] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.NotNull,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.PrimaryKey] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.PrimaryKey,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.Remarks] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.Remarks,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.Required] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.Required,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.SelectOptions] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.SelectOptions,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.SetNullBeforeDelete] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.SetNullBeforeDelete,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.Size] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.Size,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Integer,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.TableId] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.TableId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTableColumns.UniqueKey] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.UniqueKey,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.YesNo,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTableColumns.ColumnIndex] : {
					[AcDDTableColumn.KeyColumnName] : TblTableColumns.ColumnIndex,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Integer,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				}
			}
		},
		[Tables.Tables] : {
			[AcDDTable.KeyTableName] : Tables.Tables,
			[AcDDTable.KeyTableColumns] : {
				[TblTables.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTables.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.AdditionalFilterColumns] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.AdditionalFilterColumns,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.TableIndex] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.TableIndex,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Integer,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.OrderBy] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.OrderBy,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.PluralName] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.PluralName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.SelectQuery] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.SelectQuery,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.SelectQueryColumns] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.SelectQueryColumns,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.SelectRequestColumns] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.SelectRequestColumns,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.SingularName] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.SingularName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.ViewId] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.ViewId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTables.TableId] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.TableId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTables.TableName] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.TableName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTables.TableProperties] : {
					[AcDDTableColumn.KeyColumnName] : TblTables.TableProperties,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				}
			}
		},
		[Tables.Triggers] : {
			[AcDDTable.KeyTableName] : Tables.Triggers,
			[AcDDTable.KeyTableColumns] : {
				[TblTriggers.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTriggers.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTriggers.RowOperation] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.RowOperation,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTriggers.TableId] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.TableId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTriggers.TriggerCode] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.TriggerCode,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTriggers.TriggerExecution] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.TriggerExecution,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblTriggers.TriggerId] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.TriggerId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblTriggers.TriggerName] : {
					[AcDDTableColumn.KeyColumnName] : TblTriggers.TriggerName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				}
			}
		},
		[Tables.ViewColumns] : {
			[AcDDTable.KeyTableName] : Tables.ViewColumns,
			[AcDDTable.KeyTableColumns] : {
				[TblViewColumns.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblViewColumns.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViewColumns.ColumnId] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ColumnId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblViewColumns.ColumnName] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ColumnName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViewColumns.ColumnProperties] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ColumnProperties,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViewColumns.ColumnSource] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ColumnSource,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViewColumns.ColumnSourceName] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ColumnSourceName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViewColumns.ColumnType] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ColumnType,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViewColumns.ViewId] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ViewId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblViewColumns.ColumnIndex] : {
					[AcDDTableColumn.KeyColumnName] : TblViewColumns.ColumnIndex,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Integer,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				}
			}
		},
		[Tables.Views] : {
			[AcDDTable.KeyTableName] : Tables.Views,
			[AcDDTable.KeyTableColumns] : {
				[TblViews.DataDictionaryId] : {
					[AcDDTableColumn.KeyColumnName] : TblViews.DataDictionaryId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblViews.ExtensionsData] : {
					[AcDDTableColumn.KeyColumnName] : TblViews.ExtensionsData,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViews.ViewId] : {
					[AcDDTableColumn.KeyColumnName] : TblViews.ViewId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblViews.ViewName] : {
					[AcDDTableColumn.KeyColumnName] : TblViews.ViewName,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblViews.ViewQuery] : {
					[AcDDTableColumn.KeyColumnName] : TblViews.ViewQuery,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Text,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				},
				[TblViews.ViewIndex] : {
					[AcDDTableColumn.KeyColumnName] : TblViews.ViewIndex,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Integer,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				}
			}
		},
		[Tables.State] : {
			[AcDDTable.KeyTableName] : Tables.State,
			[AcDDTable.KeyTableColumns] : {
				[TblState.StateId] : {
					[AcDDTableColumn.KeyColumnName] : TblState.StateId,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Uuid,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.PrimaryKey] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.PrimaryKey,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblState.StateKey] : {
					[AcDDTableColumn.KeyColumnName] : TblState.StateKey,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.String,
					[AcDDTableColumn.KeyColumnProperties] : {
						[AcEnumDDColumnProperty.CheckInSave] : {
							[AcDDTableColumnProperty.KeyPropertyName] : AcEnumDDColumnProperty.CheckInSave,
							[AcDDTableColumnProperty.KeyPropertyValue] : true
						}
					}
				},
				[TblState.StateValue] : {
					[AcDDTableColumn.KeyColumnName] : TblState.StateValue,
					[AcDDTableColumn.KeyColumnType] : AcEnumDDColumnType.Json,
					[AcDDTableColumn.KeyColumnProperties] : {
					}
				}
			}
		}
	},
	[AcDataDictionary.KeyViews] : {

	},
	[AcDataDictionary.KeyRelationships] : {

	},
	[AcDataDictionary.KeyTriggers] : {

	},
	[AcDataDictionary.KeyStoredProcedures] : {

	},
	[AcDataDictionary.KeyFunctions] : {

	}
};
