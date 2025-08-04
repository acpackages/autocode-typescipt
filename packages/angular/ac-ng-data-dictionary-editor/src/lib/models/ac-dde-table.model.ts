/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";

export class AcDDETable {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyTableId = "table_id";
  static readonly KeyTableName = "table_name";
  static readonly KeyTableProperties = "table_properties";

  @AcBindJsonProperty({ key: AcDDETable.KeyTableName })
  tableName: string = "";

  @AcBindJsonProperty({ key: AcDDETable.KeyTableProperties })
  tableProperties: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcDDETable.KeyDataDictionaryId })
  dataDictionaryId: string = "";

  @AcBindJsonProperty({ key: AcDDETable.KeyTableId })
  tableId: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDETable {
    const instance = new AcDDETable();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    tableId,
    tableName,
  }: {
    dataDictionaryId?: string;
    tableId?: string;
    tableName?: string;
  }): AcDDETable[] {
    const result: AcDDETable[] = [];
    for (const row of Object.values(acDDEDataStorage.tables)) {
      let includeRow: boolean = true;
      if (dataDictionaryId != undefined && row.dataDictionaryId != dataDictionaryId) {
        includeRow = false;
      }
      if (tableId != undefined && row.tableId != tableId) {
        includeRow = false;
      }
      if (tableName != undefined && row.tableName != tableName) {
        includeRow = false;
      }
      if (includeRow) {
        result.push(row);
      }
    }
    return result;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
