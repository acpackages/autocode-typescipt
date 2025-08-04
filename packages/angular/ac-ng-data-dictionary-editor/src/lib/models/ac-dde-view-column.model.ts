/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";
import { AcEnumDDColumnType } from "dist/packages/common/ac-data-dictionary";

export class AcDDEViewColumn {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyViewColumnId = "view_column_id";
  static readonly KeyViewColumnName = "column_name";
  static readonly KeyViewColumnProperties = "column_properties";
  static readonly KeyViewColumnType = "column_type";
  static readonly KeyViewColumnValue = "column_value";
  static readonly KeyViewColumnSource = "column_source";
  static readonly KeyViewColumnSourceName = "column_source_name";

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyViewColumnName })
  viewColumnName: string = "";

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyViewColumnProperties })
  viewColumnProperties: Record<string, any> = {};

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyViewColumnType })
  viewColumnType: AcEnumDDColumnType = AcEnumDDColumnType.Text;

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyViewColumnValue })
  viewColumnValue: any;

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyViewColumnSource })
  viewColumnSource: string = "";

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyViewColumnSourceName })
  viewColumnSourceName: string = "";

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyDataDictionaryId })
  dataDictionaryId: string = "";

  @AcBindJsonProperty({ key: AcDDEViewColumn.KeyViewColumnId })
  viewColumnId: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDEViewColumn {
    const instance = new AcDDEViewColumn();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    viewColumnId,
    viewColumnName,
  }: {
    dataDictionaryId?: string;
    viewColumnId?: string;
    viewColumnName?: string;
  }): AcDDEViewColumn[] {
    const result: AcDDEViewColumn[] = [];
    for (const row of Object.values(acDDEDataStorage.viewColumns)) {
      let includeRow: boolean = true;
      if (dataDictionaryId != undefined && row.dataDictionaryId != dataDictionaryId) {
        includeRow = false;
      }
      if (viewColumnId != undefined && row.viewColumnId != viewColumnId) {
        includeRow = false;
      }
      if (viewColumnName != undefined && row.viewColumnName != viewColumnName) {
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
