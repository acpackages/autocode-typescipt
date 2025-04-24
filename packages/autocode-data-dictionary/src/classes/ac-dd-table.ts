import { AcDataDictionary } from "./ac-data-dictionary";
import { AcDDTableField } from "./ac-dd-table-field";
import { AcDDTableProperty } from "./ac-dd-table-property";

export class AcDDTable {
  static readonly keyTableFields = "table_fields";
  static readonly keyTableName = "table_name";
  static readonly keyTableProperties = "table_properties";

  get primaryKeyField(): AcDDTableField|undefined {
    let result: AcDDTableField|undefined;
    let primaryKeyFields:AcDDTableField[] = this.primaryKeyFields;
    if (primaryKeyFields.length > 0) {
      result = primaryKeyFields[0];
    }
    return result;
  }

  get primaryKeyFields(): AcDDTableField[] {
    let result: AcDDTableField[] = [];
    if (this.tableFields) {
      for(let fieldName of Object.keys(this.tableFields)){
        let tableField = this.tableFields[fieldName];
        if(tableField.primaryKey){
          result.push(tableField);
        }
      }
    }
    return result;
  }

  get foreignKeyFields(): AcDDTableField[] {
    let result: AcDDTableField[] = [];
    if (this.tableFields) {
      for(let fieldName of Object.keys(this.tableFields)){
        let tableField = this.tableFields[fieldName];
        if(tableField.foreignKey){
          result.push(tableField);
        }
      }
    }
    return result;
  }

  tableName: string = "";
  tableFields: { [key: string]: AcDDTableField } = {};
  tableProperties: { [key: string]: AcDDTableProperty } = {};

  static fromJson(jsonData: { [key: string]: any }): AcDDTable {
    const instance = new AcDDTable();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  static getInstance({ tableName, dataDictionaryName = "default" }: { tableName: string; dataDictionaryName?: string; }): AcDDTable {
    let result: AcDDTable = new AcDDTable();
    let acDataDictionary: AcDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName: dataDictionaryName });
    if (acDataDictionary.tables[tableName]) {
      result.setValuesFromJson(acDataDictionary.tables[tableName]);
    }
    return result;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDTable.keyTableName)) {
      this.tableName = String(jsonData[AcDDTable.keyTableName]);
    }
    if (jsonData.hasOwnProperty(AcDDTable.keyTableFields)) {
      const fields = jsonData[AcDDTable.keyTableFields] as { [key: string]: any };
      for (const fieldName in fields) {
        if (fields.hasOwnProperty(fieldName)) {
          this.tableFields[fieldName] = AcDDTableField.fromJson(fields[fieldName]);
          this.tableFields[fieldName].table = this;
        }
      }
    }
    if (jsonData.hasOwnProperty(AcDDTable.keyTableProperties)) {
      const properties = jsonData[AcDDTable.keyTableProperties] as { [key: string]: any };
      for (const propertyName in properties) {
        if (properties.hasOwnProperty(propertyName)) {
          this.tableProperties[propertyName] = AcDDTableProperty.fromJson(properties[propertyName]);
        }
      }
    }
  }

  toJson(): { [key: string]: any } {
    const result: { [key: string]: any } = {
      [AcDDTable.keyTableName]: this.tableName,
      [AcDDTable.keyTableFields]: {},
      [AcDDTable.keyTableProperties]: {},
    };

    for (const fieldName in this.tableFields) {
      if (this.tableFields.hasOwnProperty(fieldName)) {
        result[AcDDTable.keyTableFields][fieldName] = this.tableFields[fieldName].toJson();
      }
    }

    for (const propertyName in this.tableProperties) {
      if (this.tableProperties.hasOwnProperty(propertyName)) {
        result[AcDDTable.keyTableProperties][propertyName] = this.tableProperties[propertyName].toJson();
      }
    }

    return result;
  }

  toString(): string {
    return JSON.stringify(this.toJson());;
  }
}
