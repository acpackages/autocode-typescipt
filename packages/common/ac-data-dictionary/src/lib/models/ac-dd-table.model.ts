/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDataDictionary, AcDDTableColumn, AcDDTableProperty, AcEnumDDTableProperty } from "../..";


export class AcDDTable {
  static readonly KEY_TABLE_COLUMNS = "table_columns";
  static readonly KEY_TABLE_NAME = "table_name";
  static readonly KEY_TABLE_PROPERTIES = "table_properties";

  @AcBindJsonProperty({ key: AcDDTable.KEY_TABLE_COLUMNS })
  tableColumns: AcDDTableColumn[] = [];

  @AcBindJsonProperty({ key: AcDDTable.KEY_TABLE_NAME })
  tableName: string = "";

  @AcBindJsonProperty({ key: AcDDTable.KEY_TABLE_PROPERTIES })
  tableProperties: AcDDTableProperty[] = [];

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTable {
    const instance = new AcDDTable();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getDropTableStatement({tableName,databaseType=AcEnumSqlDatabaseType.UNKNOWN}: { tableName: string; databaseType?: string }): string {
    return `DROP TABLE IF EXISTS ${tableName};`;
  }

  static getInstance({tableName,dataDictionaryName="default"}: { tableName: string; dataDictionaryName?: string }): AcDDTable {
    const result = new AcDDTable();
    const acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });

    if (acDataDictionary.tables.hasOwnProperty(tableName)) {
      result.fromJson({ jsonData: acDataDictionary.tables[tableName] });
    }

    return result;
  }

  getColumn({columnName}:{columnName: string}): AcDDTableColumn | undefined {
    return this.tableColumns.find((column) => column.columnName === columnName);
  }

  getColumnNames(): string[] {
    return this.tableColumns.map((column) => column.columnName);
  }

  getCreateTableStatement({databaseType=AcEnumSqlDatabaseType.UNKNOWN}: { databaseType?: string } = {}): string {
    const columnDefinitions = this.tableColumns
      .map((column) => column.getColumnDefinitionForStatement({ databaseType }))
      .filter((def) => def !== "");
    return `CREATE TABLE IF NOT EXISTS ${this.tableName} (${columnDefinitions.join(", ")});`;
  }

  getPrimaryKeyColumnName(): string {
    const primaryKeyColumn = this.getPrimaryKeyColumn();
    return primaryKeyColumn ? primaryKeyColumn.columnName : "";
  }

  getPrimaryKeyColumn(): AcDDTableColumn | undefined {
    const primaryKeyColumns = this.getPrimaryKeyColumns();
    return primaryKeyColumns.length > 0 ? primaryKeyColumns[0] : undefined;
  }

  getPrimaryKeyColumns(): AcDDTableColumn[] {
    return this.tableColumns.filter((column) => column.isPrimaryKey());
  }

  getSearchQueryColumnNames(): string[] {
    return this.getSearchQueryColumns().map((column) => column.columnName);
  }

  getSearchQueryColumns(): AcDDTableColumn[] {
    return this.tableColumns.filter((column) => column.isInSearchQuery());
  }

  getForeignKeyColumns(): AcDDTableColumn[] {
    return this.tableColumns.filter((column) => column.isForeignKey());
  }

  getPluralName(): string {
    let result = this.tableName;
    for (const property of this.tableProperties) {
      if (property.propertyName === AcEnumDDTableProperty.PLURAL_NAME) {
        result = property.propertyValue;
        break;
      }
    }
    return result;
  }

  getSingularName(): string {
    let result = this.tableName;
    for (const property of this.tableProperties) {
      if (property.propertyName === AcEnumDDTableProperty.SINGULAR_NAME) {
        result = property.propertyValue;
        break;
      }
    }
    return result;
  }

  getSelectDistinctColumns(): AcDDTableColumn[] {
    return this.tableColumns.filter((column) => column.isSelectDistinct());
  }

  fromJson({ jsonData }: { jsonData: any }): this {

    if (AcDDTable.KEY_TABLE_COLUMNS in jsonData && typeof jsonData[AcDDTable.KEY_TABLE_COLUMNS] === "object" && !Array.isArray(jsonData[AcDDTable.KEY_TABLE_COLUMNS])) {
      for (const [columnName, columnData] of Object.entries(jsonData[AcDDTable.KEY_TABLE_COLUMNS])) {
        const column = AcDDTableColumn.instanceFromJson({ jsonData: columnData });
        column.table = this;
        this.tableColumns.push(column);
      }
      delete jsonData[AcDDTable.KEY_TABLE_COLUMNS];
    }

    if (AcDDTable.KEY_TABLE_PROPERTIES in jsonData && typeof jsonData[AcDDTable.KEY_TABLE_PROPERTIES] === "object" && !Array.isArray(jsonData[AcDDTable.KEY_TABLE_PROPERTIES])) {
      for (const propertyData of Object.values(jsonData[AcDDTable.KEY_TABLE_PROPERTIES])) {
        this.tableProperties.push(AcDDTableProperty.instanceFromJson({ jsonData: propertyData }));
      }
      delete jsonData[AcDDTable.KEY_TABLE_PROPERTIES];
    }

    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
