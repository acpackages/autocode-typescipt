/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDataDictionary, AcDDTableColumn, AcDDTableProperty, AcEnumDDTableProperty } from "../..";


export class AcDDTable {
  static readonly KeyTableColumns = "table_columns";
  static readonly KeyTableName = "table_name";
  static readonly KeyTableProperties = "table_properties";

  @AcBindJsonProperty({ key: AcDDTable.KeyTableColumns })
  tableColumns: AcDDTableColumn[] = [];

  @AcBindJsonProperty({ key: AcDDTable.KeyTableName })
  tableName: string = "";

  @AcBindJsonProperty({ key: AcDDTable.KeyTableProperties })
  tableProperties: AcDDTableProperty[] = [];

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTable {
    const instance = new AcDDTable();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getDropTableStatement({tableName,databaseType=AcEnumSqlDatabaseType.Unknown}: { tableName: string; databaseType?: string }): string {
    return `DROP Table IF EXISTS ${tableName};`;
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

  getCreateTableStatement({databaseType=AcEnumSqlDatabaseType.Unknown}: { databaseType?: string } = {}): string {
    const columnDefinitions = this.tableColumns
      .map((column) => column.getColumnDefinitionForStatement({ databaseType }))
      .filter((def) => def !== "");
    return `CREATE Table IF NOT EXISTS ${this.tableName} (${columnDefinitions.join(", ")});`;
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
      if (property.propertyName === AcEnumDDTableProperty.PluralName) {
        result = property.propertyValue;
        break;
      }
    }
    return result;
  }

  getSingularName(): string {
    let result = this.tableName;
    for (const property of this.tableProperties) {
      if (property.propertyName === AcEnumDDTableProperty.SingularName) {
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

    if (AcDDTable.KeyTableColumns in jsonData && typeof jsonData[AcDDTable.KeyTableColumns] === "object" && !Array.isArray(jsonData[AcDDTable.KeyTableColumns])) {
      for (const [columnName, columnData] of Object.entries(jsonData[AcDDTable.KeyTableColumns])) {
        const column = AcDDTableColumn.instanceFromJson({ jsonData: columnData });
        column.table = this;
        this.tableColumns.push(column);
      }
      delete jsonData[AcDDTable.KeyTableColumns];
    }

    if (AcDDTable.KeyTableProperties in jsonData && typeof jsonData[AcDDTable.KeyTableProperties] === "object" && !Array.isArray(jsonData[AcDDTable.KeyTableProperties])) {
      for (const propertyData of Object.values(jsonData[AcDDTable.KeyTableProperties])) {
        this.tableProperties.push(AcDDTableProperty.instanceFromJson({ jsonData: propertyData }));
      }
      delete jsonData[AcDDTable.KeyTableProperties];
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
