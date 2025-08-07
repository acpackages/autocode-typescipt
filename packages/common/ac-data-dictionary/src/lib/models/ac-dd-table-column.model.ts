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
  static readonly KeyColumnName = "column_name";
  static readonly KeyColumnProperties = "column_properties";
  static readonly KeyColumnType = "column_type";
  static readonly KeyColumnValue = "column_value";

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnName })
  columnName: string = "";

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnProperties })
  columnProperties: Map<string, AcDDTableColumnProperty> = new Map();

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnType })
  columnType: string = "text";

  @AcBindJsonProperty({ key: AcDDTableColumn.KeyColumnValue })
  columnValue: any;

  @AcBindJsonProperty({ skipInFromJson: true, skipInToJson: true })
  table?: AcDDTable;

  static getInstance({tableName,columnName,dataDictionaryName="default"}: { tableName: string; columnName: string; dataDictionaryName?: string }): AcDDTableColumn {
    return AcDataDictionary.getTableColumn({ tableName, columnName, dataDictionaryName })!;
  }

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTableColumn {
    const instance = new AcDDTableColumn();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getDropColumnStatement({tableName,columnName,databaseType =AcEnumSqlDatabaseType.Unknown}: { tableName: string; columnName: string; databaseType?: string }): string {
    // databaseType is ignored in your original, keep same behavior
    return `ALTER Table ${tableName} DROP COLUMN ${columnName};`;
  }

  checkInAutoNumber(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.CheckInAutoNumber)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.CheckInAutoNumber)?.propertyValue === true;
    }
    return false;
  }

  checkInModify(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.CheckInModify)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.CheckInModify)?.propertyValue === true;
    }
    return false;
  }

  checkInSave(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.CheckInSave)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.CheckInSave)?.propertyValue === true;
    }
    return false;
  }

  getAutoNumberLength(): number {
    if (this.columnProperties.has(AcEnumDDColumnProperty.AutoNumberLength)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.AutoNumberLength)?.propertyValue ?? 0;
    }
    return 0;
  }

  getAutoNumberPrefix(): string {
    if (this.columnProperties.has(AcEnumDDColumnProperty.AutoNumberPrefix)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.AutoNumberPrefix)?.propertyValue ?? "";
    }
    return "";
  }

  getAutoNumberPrefixLength(): number {
    return this.getAutoNumberPrefix().length;
  }

  getDefaultValue(): any {
    if (this.columnProperties.has(AcEnumDDColumnProperty.DefaultValue)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.DefaultValue)?.propertyValue;
    }
    return undefined;
  }

  getColumnFormats(): string[] {
    if (this.columnProperties.has(AcEnumDDColumnProperty.Format)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.Format)?.propertyValue ?? [];
    }
    return [];
  }

  getColumnTitle(): string {
    if (this.columnProperties.has(AcEnumDDColumnProperty.ColumnTitle)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.ColumnTitle)?.propertyValue ?? this.columnName;
    }
    return this.columnName;
  }

  getAddColumnStatement({tableName,databaseType = AcEnumSqlDatabaseType.Unknown}: { tableName: string; databaseType?: string }): string {
    if (databaseType === AcEnumSqlDatabaseType.MySql) {
      return `ALTER Table ${tableName} ADD COLUMN ${this.getColumnDefinitionForStatement({ databaseType })}`;
    }
    return "";
  }

  getColumnDefinitionForStatement({databaseType = AcEnumSqlDatabaseType.Unknown}: { databaseType?: string } = {}): string {
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
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: jsonData });
    return this;
  }

  getForeignKeyRelationships(): AcDDRelationship[] {
    return AcDDRelationship.getInstances({
      destinationTable: this.table?.tableName ?? "",
      destinationColumn: this.columnName,
    });
  }

  getSize(): number {
    if (this.columnProperties.has(AcEnumDDColumnProperty.Size)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.Size)?.propertyValue ?? 0;
    }
    return 0;
  }

  isAutoIncrement(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.AutoIncrement)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.AutoIncrement)?.propertyValue === true;
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

  isInSearchQuery(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.InSearchQuery)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.InSearchQuery)?.propertyValue === true;
    }
    return false;
  }

  isNullable(): boolean {
    return !this.isNotNull();
  }

  isNotNull(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.NotNull)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.NotNull)?.propertyValue === true;
    }
    return false;
  }

  isPrimaryKey(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.PrimaryKey)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.PrimaryKey)?.propertyValue === true;
    }
    if (this.columnType === AcEnumDDColumnType.AutoIncrement) {
      return true;
    }
    return false;
  }

  isRequired(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.Required)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.Required)?.propertyValue === true;
    }
    return false;
  }

  isSelectDistinct(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.IsSelectDistinct)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.IsSelectDistinct)?.propertyValue === true;
    }
    return false;
  }


  isSetValuesNullBeforeDelete(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.SetNullBeforeDelete)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.SetNullBeforeDelete)?.propertyValue === true;
    }
    return false;
  }

  isUniqueKey(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.UniqueKey)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.UniqueKey)?.propertyValue === true;
    }
    return false;
  }

  // Serialization and Deserialization with AcJsonUtils - stub implementations here

   toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }


}
