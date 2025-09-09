/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDataDictionary, AcDDRelationship, AcDDTable, AcDDTableColumnProperty, AcEnumDDColumnProperty, AcEnumDDColumnType } from "../..";
// import { AcDDTableColumnProperty } from "./ac-dd-table-column-property.model";
// import { AcDDTable } from "./ac-dd-table.model";
// import { AcDataDictionary } from "./ac-data-dictionary.model";
// import { AcEnumDDColumnProperty } from "../enums/ac-enum-dd-column-property.enum";
// import { AcEnumDDColumnType } from "../enums/ac-enum-dd-column-type.enum";
// import { AcDDRelationship } from "./ac-dd-relationship.model";

export class AcDDTableColumn {
  static readonly KeyColumnName = "columnName";
  static readonly KeyColumnProperties = "columnProperties";
  static readonly KeyColumnType = "columnType";
  static readonly KeyColumnValue = "columnValue";

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnName })
  columnName: string = "";

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnProperties })
  columnProperties: Record<string, AcDDTableColumnProperty> = {};

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnType })
  columnType: string = "text";

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnValue })
  columnValue: any;

  @AcBindJsonProperty({ skipInFromJson: true, skipInToJson: true })
  table?: AcDDTable;

  static getInstance({ tableName, columnName, dataDictionaryName = "default" }: { tableName: string; columnName: string; dataDictionaryName?: string }): AcDDTableColumn {
    return AcDataDictionary.getTableColumn({ tableName, columnName, dataDictionaryName })!;
  }

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTableColumn {
    const instance = new AcDDTableColumn();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getDropColumnStatement({ tableName, columnName, databaseType = AcEnumSqlDatabaseType.Unknown }: { tableName: string; columnName: string; databaseType?: string }): string {
    return `ALTER Table ${tableName} DROP COLUMN ${columnName};`;
  }

  checkInAutoNumber(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.CheckInAutoNumber]) {
      return this.columnProperties[AcEnumDDColumnProperty.CheckInAutoNumber].propertyValue === true;
    }
    return false;
  }

  checkInModify(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.CheckInModify]) {
      return this.columnProperties[AcEnumDDColumnProperty.CheckInModify].propertyValue === true;
    }
    return false;
  }

  checkInSave(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.CheckInSave]) {
      return this.columnProperties[AcEnumDDColumnProperty.CheckInSave].propertyValue === true;
    }
    return false;
  }

  getAutoNumberLength(): number {
    if (this.columnProperties[AcEnumDDColumnProperty.AutoNumberLength]) {
      return this.columnProperties[AcEnumDDColumnProperty.AutoNumberLength].propertyValue ?? 0;
    }
    return 0;
  }

  getAutoNumberPrefix(): string {
    if (this.columnProperties[AcEnumDDColumnProperty.AutoNumberPrefix]) {
      return this.columnProperties[AcEnumDDColumnProperty.AutoNumberPrefix].propertyValue ?? "";
    }
    return "";
  }

  getAutoNumberPrefixLength(): number {
    return this.getAutoNumberPrefix().length;
  }

  getDefaultValue(): any {
    if (this.columnProperties[AcEnumDDColumnProperty.DefaultValue]) {
      return this.columnProperties[AcEnumDDColumnProperty.DefaultValue].propertyValue;
    }
    return null;
  }

  getColumnFormats(): string[] {
    if (this.columnProperties[AcEnumDDColumnProperty.Format]) {
      return this.columnProperties[AcEnumDDColumnProperty.Format].propertyValue ?? [];
    }
    return [];
  }

  getColumnTitle(): string {
    if (this.columnProperties[AcEnumDDColumnProperty.ColumnTitle]) {
      return this.columnProperties[AcEnumDDColumnProperty.ColumnTitle].propertyValue ?? this.columnName;
    }
    return this.columnName;
  }

  getAddColumnStatement({ tableName, databaseType = AcEnumSqlDatabaseType.Unknown }: { tableName: string; databaseType?: string }): string {
    if (databaseType === AcEnumSqlDatabaseType.MySql) {
      return `ALTER Table ${tableName} ADD COLUMN ${this.getColumnDefinitionForStatement({ databaseType })}`;
    }
    return "";
  }

  getColumnDefinitionForStatement({ databaseType = AcEnumSqlDatabaseType.Unknown }: { databaseType?: string } = {}): string {
    let columnTypeLocal = this.columnType;
    let result = "";
    const defaultValue = this.getDefaultValue();
    let size = this.getSize();
    let isAutoIncrementSet = false;
    let isPrimaryKeySet = false;

    if (databaseType === AcEnumSqlDatabaseType.MySql) {
      switch (columnTypeLocal) {
        case AcEnumDDColumnType.AutoIncrement:
          columnTypeLocal = 'INT AUTO_INCREMENT PRIMARY KEY';
          isAutoIncrementSet = true;
          isPrimaryKeySet = true;
          break;
        case AcEnumDDColumnType.Blob:
          columnTypeLocal = this._blobType(size);
          break;
        case AcEnumDDColumnType.Date:
          columnTypeLocal = 'DATE';
          break;
        case AcEnumDDColumnType.Datetime:
          columnTypeLocal = 'DATETIME';
          break;
        case AcEnumDDColumnType.Double:
          columnTypeLocal = 'DOUBLE';
          break;
        case AcEnumDDColumnType.Uuid:
          columnTypeLocal = 'CHAR(36)';
          break;
        case AcEnumDDColumnType.Integer:
          columnTypeLocal = this._intType(size);
          break;
        case AcEnumDDColumnType.Json:
          columnTypeLocal = 'LONGTEXT';
          break;
        case AcEnumDDColumnType.String:
          if (size === 0) size = 255;
          columnTypeLocal = `VARCHAR(${size})`;
          break;
        case AcEnumDDColumnType.Text:
          columnTypeLocal = this._textType(size);
          break;
        case AcEnumDDColumnType.Time:
          columnTypeLocal = 'TIME';
          break;
        case AcEnumDDColumnType.Timestamp:
          columnTypeLocal = 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP';
          break;
        default:
          columnTypeLocal = 'TEXT';
      }

      result = `${this.columnName} ${columnTypeLocal}`;
      if (this.isAutoIncrement() && !isAutoIncrementSet) {
        result += " AUTO_INCREMENT";
      }
      if (this.isPrimaryKey() && !isPrimaryKeySet) {
        result += " PRIMARY KEY";
      }
      if (this.isUniqueKey()) {
        result += " UNIQUE";
      }
      if (this.isNotNull()) {
        result += " NOT NULL";
      }
    } else if (databaseType === AcEnumSqlDatabaseType.Sqlite) {
      switch (columnTypeLocal) {
        case AcEnumDDColumnType.AutoIncrement:
          columnTypeLocal = 'INTEGER PRIMARY KEY AUTOINCREMENT';
          isAutoIncrementSet = true;
          isPrimaryKeySet = true;
          break;
        case AcEnumDDColumnType.Double:
          columnTypeLocal = 'REAL';
          break;
        case AcEnumDDColumnType.Blob:
          columnTypeLocal = 'BLOB';
          break;
        case AcEnumDDColumnType.Integer:
          columnTypeLocal = 'INTEGER';
          break;
        default:
          columnTypeLocal = 'TEXT';
      }

      result = `${this.columnName} ${columnTypeLocal}`;
      if (this.isAutoIncrement() && !isAutoIncrementSet) {
        result += " AUTOINCREMENT";
      }
      if (this.isPrimaryKey() && !isPrimaryKeySet) {
        result += " PRIMARY KEY";
      }
      if (this.isUniqueKey()) {
        result += " UNIQUE";
      }
      if (this.isNotNull()) {
        result += " NOT NULL";
      }
      // Default value logic can be added as needed.
    }

    return result;
  }

  private _blobType(size: number): string {
    if (size <= 255) return "TINYBLOB";
    if (size <= 65535) return "BLOB";
    if (size <= 16777215) return "MEDIUMBLOB";
    return "LONGBLOB";
  }

  private _textType(size: number): string {
    if (size <= 255) return "TINYTEXT";
    if (size <= 65535) return "TEXT";
    if (size <= 16777215) return "MEDIUMTEXT";
    return "LONGTEXT";
  }

  private _intType(size: number): string {
    if (size <= 255) return "TINYINT";
    if (size <= 65535) return "SMALLINT";
    if (size <= 16777215) return "MEDIUMINT";
    return "BIGINT";
  }

  fromJson({ jsonData }: { jsonData: any }): AcDDTableColumn {
    const json = { ...jsonData };

    if (AcDDTableColumn.KeyColumnProperties in json && typeof json[AcDDTableColumn.KeyColumnProperties] === "object" && !Array.isArray(json[AcDDTableColumn.KeyColumnProperties])) {
      for (const propertyData of Object.values(json[AcDDTableColumn.KeyColumnProperties]) as any) {
        this.columnProperties[propertyData.property_name] = AcDDTableColumnProperty.instanceFromJson({ jsonData: propertyData });
      }
      delete json[AcDDTableColumn.KeyColumnProperties];
    }
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: json });
    return this;
  }

  getForeignKeyRelationships(): AcDDRelationship[] {
    return AcDDRelationship.getInstances({
      destinationTable: this.table?.tableName ?? "",
      destinationColumn: this.columnName,
    });
  }

  getSize(): number {
    if (this.columnProperties[AcEnumDDColumnProperty.Size]) {
      return this.columnProperties[AcEnumDDColumnProperty.Size].propertyValue ?? 0;
    }
    return 0;
  }

  getValueOptions():any[]{
    let result:any[] = [];
    if(this.columnProperties[AcEnumDDColumnProperty.ValueOptions]){
      const valueOptions = this.columnProperties[AcEnumDDColumnProperty.ValueOptions].propertyValue;
      if(valueOptions && valueOptions.length > 0){
        result = valueOptions;
      }
    }
    return result;
  }

  isAutoIncrement(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.AutoIncrement]) {
      return this.columnProperties[AcEnumDDColumnProperty.AutoIncrement].propertyValue === true;
    }
    if (this.columnType === AcEnumDDColumnType.AutoIncrement) {
      return true;
    }
    return false;
  }

  isAutoNumber(): boolean {
    return this.columnType === AcEnumDDColumnType.AutoNumber;
  }

  isForeignKey(): boolean {
    return this.getForeignKeyRelationships().length > 0;
  }

  isNullable(): boolean {
    return !this.isNotNull();
  }

  isNotNull(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.NotNull]) {
      return this.columnProperties[AcEnumDDColumnProperty.NotNull].propertyValue === true;
    }
    return false;
  }

  isPrimaryKey(): boolean {
    let result = false;
    if (this.columnProperties[AcEnumDDColumnProperty.PrimaryKey]) {
      result = this.columnProperties[AcEnumDDColumnProperty.PrimaryKey].propertyValue == true;
    }
    if (this.columnType === AcEnumDDColumnType.AutoIncrement) {
      result = true;
    }
    return result;
  }

  isRequired(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.Required]) {
      return this.columnProperties[AcEnumDDColumnProperty.Required].propertyValue === true;
    }
    return false;
  }

  isSelectDistinct(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.IsSelectDistinct]) {
      return this.columnProperties[AcEnumDDColumnProperty.IsSelectDistinct].propertyValue === true;
    }
    return false;
  }


  isSetValuesNullBeforeDelete(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.SetNullBeforeDelete]) {
      return this.columnProperties[AcEnumDDColumnProperty.SetNullBeforeDelete].propertyValue === true;
    }
    return false;
  }

  isUniqueKey(): boolean {
    if (this.columnProperties[AcEnumDDColumnProperty.UniqueKey]) {
      return this.columnProperties[AcEnumDDColumnProperty.UniqueKey].propertyValue === true;
    }
    return false;
  }

  // Serialization and Deserialization with AcJsonUtils - stub implementations here

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }


}
