/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDDTableColumnProperty } from "./ac-dd-table-column-property.model";
import { AcDDTable } from "./ac-dd-table.model";
import { AcDataDictionary } from "./ac-data-dictionary.model";
import { AcEnumDDColumnProperty } from "../enums/ac-enum-dd-column-property.enum";
import { AcEnumDDColumnType } from "../enums/ac-enum-dd-column-type.enum";
import { AcDDRelationship } from "./ac-dd-relationship.model";

export class AcDDTableColumn {
  static readonly KEY_COLUMN_NAME = "column_name";
  static readonly KEY_COLUMN_PROPERTIES = "column_properties";
  static readonly KEY_COLUMN_TYPE = "column_type";
  static readonly KEY_COLUMN_VALUE = "column_value";

  @AcBindJsonProperty({ key: AcDDTableColumn.KEY_COLUMN_NAME })
  columnName: string = "";

  @AcBindJsonProperty({ key: AcDDTableColumn.KEY_COLUMN_PROPERTIES })
  columnProperties: Map<string, AcDDTableColumnProperty> = new Map();

  @AcBindJsonProperty({ key: AcDDTableColumn.KEY_COLUMN_TYPE })
  columnType: string = "text";

  @AcBindJsonProperty({ key: AcDDTableColumn.KEY_COLUMN_VALUE })
  columnValue: any;

  @AcBindJsonProperty({ skipInFromJson: true, skipInToJson: true })
  table?: AcDDTable;

  static getInstance(params: { tableName: string; columnName: string; dataDictionaryName?: string }): AcDDTableColumn {
    const { tableName, columnName, dataDictionaryName = "default" } = params;
    return AcDataDictionary.getTableColumn({ tableName, columnName, dataDictionaryName })!;
  }

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTableColumn {
    const instance = new AcDDTableColumn();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getDropColumnStatement(params: { tableName: string; columnName: string; databaseType?: string }): string {
    const { tableName, columnName } = params;
    // databaseType is ignored in your original, keep same behavior
    return `ALTER TABLE ${tableName} DROP COLUMN ${columnName};`;
  }

  checkInAutoNumber(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.CHECK_IN_AUTO_NUMBER)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.CHECK_IN_AUTO_NUMBER)?.propertyValue === true;
    }
    return false;
  }

  checkInModify(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.CHECK_IN_MODIFY)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.CHECK_IN_MODIFY)?.propertyValue === true;
    }
    return false;
  }

  checkInSave(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.CHECK_IN_SAVE)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.CHECK_IN_SAVE)?.propertyValue === true;
    }
    return false;
  }

  getAutoNumberLength(): number {
    if (this.columnProperties.has(AcEnumDDColumnProperty.AUTO_NUMBER_LENGTH)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.AUTO_NUMBER_LENGTH)?.propertyValue ?? 0;
    }
    return 0;
  }

  getAutoNumberPrefix(): string {
    if (this.columnProperties.has(AcEnumDDColumnProperty.AUTO_NUMBER_PREFIX)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.AUTO_NUMBER_PREFIX)?.propertyValue ?? "";
    }
    return "";
  }

  getAutoNumberPrefixLength(): number {
    return this.getAutoNumberPrefix().length;
  }

  getDefaultValue(): any {
    if (this.columnProperties.has(AcEnumDDColumnProperty.DEFAULT_VALUE)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.DEFAULT_VALUE)?.propertyValue;
    }
    return undefined;
  }

  getColumnFormats(): string[] {
    if (this.columnProperties.has(AcEnumDDColumnProperty.FORMAT)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.FORMAT)?.propertyValue ?? [];
    }
    return [];
  }

  getColumnTitle(): string {
    if (this.columnProperties.has(AcEnumDDColumnProperty.COLUMN_TITLE)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.COLUMN_TITLE)?.propertyValue ?? this.columnName;
    }
    return this.columnName;
  }

  getAddColumnStatement(params: { tableName: string; databaseType?: string }): string {
    const { tableName, databaseType = AcEnumSqlDatabaseType.UNKNOWN } = params;
    if (databaseType === AcEnumSqlDatabaseType.MYSQL) {
      return `ALTER TABLE ${tableName} ADD COLUMN ${this.getColumnDefinitionForStatement({ databaseType })}`;
    }
    return "";
  }

  getColumnDefinitionForStatement(params: { databaseType?: string } = {}): string {
    const databaseType = params.databaseType ?? AcEnumSqlDatabaseType.UNKNOWN;
    let columnTypeLocal = this.columnType;
    let result = "";
    const defaultValue = this.getDefaultValue();
    let size = this.getSize();
    let isAutoIncrementSet = false;
    let isPrimaryKeySet = false;

    if (databaseType === AcEnumSqlDatabaseType.MYSQL) {
      switch (columnTypeLocal) {
        case AcEnumDDColumnType.AUTO_INCREMENT:
          columnTypeLocal = 'INT AUTO_INCREMENT PRIMARY KEY';
          isAutoIncrementSet = true;
          isPrimaryKeySet = true;
          break;
        case AcEnumDDColumnType.BLOB:
          columnTypeLocal = this._blobType(size);
          break;
        case AcEnumDDColumnType.DATE:
          columnTypeLocal = 'DATE';
          break;
        case AcEnumDDColumnType.DATETIME:
          columnTypeLocal = 'DATETIME';
          break;
        case AcEnumDDColumnType.DOUBLE:
          columnTypeLocal = 'DOUBLE';
          break;
        case AcEnumDDColumnType.UUID:
          columnTypeLocal = 'CHAR(36)';
          break;
        case AcEnumDDColumnType.INTEGER:
          columnTypeLocal = this._intType(size);
          break;
        case AcEnumDDColumnType.JSON:
          columnTypeLocal = 'LONGTEXT';
          break;
        case AcEnumDDColumnType.STRING:
          if (size === 0) size = 255;
          columnTypeLocal = `VARCHAR(${size})`;
          break;
        case AcEnumDDColumnType.TEXT:
          columnTypeLocal = this._textType(size);
          break;
        case AcEnumDDColumnType.TIME:
          columnTypeLocal = 'TIME';
          break;
        case AcEnumDDColumnType.TIMESTAMP:
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
    } else if (databaseType === AcEnumSqlDatabaseType.SQLITE) {
      switch (columnTypeLocal) {
        case AcEnumDDColumnType.AUTO_INCREMENT:
          columnTypeLocal = 'INTEGER PRIMARY KEY AUTOINCREMENT';
          isAutoIncrementSet = true;
          isPrimaryKeySet = true;
          break;
        case AcEnumDDColumnType.DOUBLE:
          columnTypeLocal = 'REAL';
          break;
        case AcEnumDDColumnType.BLOB:
          columnTypeLocal = 'BLOB';
          break;
        case AcEnumDDColumnType.INTEGER:
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
    if (this.columnProperties.has(AcEnumDDColumnProperty.SIZE)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.SIZE)?.propertyValue ?? 0;
    }
    return 0;
  }

  isAutoIncrement(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.AUTO_INCREMENT)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.AUTO_INCREMENT)?.propertyValue === true;
    }
    if (this.columnType === AcEnumDDColumnType.AUTO_INCREMENT) {
      return true;
    }
    return false;
  }

  isAutoNumber(): boolean {
    return this.columnType === AcEnumDDColumnType.AUTO_NUMBER;
  }

  isForeignKey(): boolean {
    return this.getForeignKeyRelationships().length > 0;
  }

  isInSearchQuery(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.IN_SEARCH_QUERY)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.IN_SEARCH_QUERY)?.propertyValue === true;
    }
    return false;
  }

  isNullable(): boolean {
    return !this.isNotNull();
  }

  isNotNull(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.NOT_NULL)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.NOT_NULL)?.propertyValue === true;
    }
    return false;
  }

  isPrimaryKey(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.PRIMARY_KEY)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.PRIMARY_KEY)?.propertyValue === true;
    }
    if (this.columnType === AcEnumDDColumnType.AUTO_INCREMENT) {
      return true;
    }
    return false;
  }

  isRequired(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.REQUIRED)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.REQUIRED)?.propertyValue === true;
    }
    return false;
  }

  isSelectDistinct(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.IS_SELECT_DISTINCT)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.IS_SELECT_DISTINCT)?.propertyValue === true;
    }
    return false;
  }


  isSetValuesNullBeforeDelete(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.SET_NULL_BEFORE_DELETE)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.SET_NULL_BEFORE_DELETE)?.propertyValue === true;
    }
    return false;
  }

  isUniqueKey(): boolean {
    if (this.columnProperties.has(AcEnumDDColumnProperty.UNIQUE_KEY)) {
      return this.columnProperties.get(AcEnumDDColumnProperty.UNIQUE_KEY)?.propertyValue === true;
    }
    return false;
  }

  // Serialization and Deserialization with AcJsonUtils - stub implementations here

   toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }


}
