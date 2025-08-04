/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcEnumDDColumnType } from "@autocode-ts/ac-data-dictionary";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";

export class AcDDETableColumn {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyTableColumnId = "table_column_id";
  static readonly KeyTableId = "table_id";
  static readonly KeyTableColumnName = "table_column_name";
  static readonly KeyTableColumnProperties = "table_column_properties";
  static readonly KeyTableColumnType = "table_column_type";
  static readonly KeyTableColumnValue = "table_column_value";

  @AcBindJsonProperty({ key: AcDDETableColumn.KeyTableColumnName })
  tableColumnName: string = "";

  @AcBindJsonProperty({ key: AcDDETableColumn.KeyTableColumnProperties })
  tableColumnProperties: Record<string, any> = new Map();

  @AcBindJsonProperty({ key: AcDDETableColumn.KeyTableColumnType })
  tableColumnType: AcEnumDDColumnType = AcEnumDDColumnType.Text;

  @AcBindJsonProperty({ key: AcDDETableColumn.KeyTableColumnValue })
  tableColumnValue: any;

  @AcBindJsonProperty({ key: AcDDETableColumn.KeyDataDictionaryId })
  dataDictionaryId: string = "";

  @AcBindJsonProperty({ key: AcDDETableColumn.KeyTableColumnId })
  tableColumnId: string = "";

  @AcBindJsonProperty({ key: AcDDETableColumn.KeyTableId })
  tableId: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDETableColumn {
    const instance = new AcDDETableColumn();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    tableColumnId,
    tableId,
    tableColumnName,
  }: {
    dataDictionaryId?: string;
    tableColumnId?: string;
    tableId?: string;
    tableColumnName?: string;
  }): AcDDETableColumn[] {
    const result: AcDDETableColumn[] = [];
    for (const row of Object.values(acDDEDataStorage.tableColumns)) {
      let includeRow: boolean = true;
      if (dataDictionaryId != undefined && row.dataDictionaryId != dataDictionaryId) {
        includeRow = false;
      }
      if (tableColumnId != undefined && row.tableColumnId != tableColumnId) {
        includeRow = false;
      }
      if (tableId != undefined && row.tableId != tableId) {
        includeRow = false;
      }
      if (tableColumnName != undefined && row.tableColumnName != tableColumnName) {
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
