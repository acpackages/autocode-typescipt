/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";

export class AcDDEView {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyViewId = "view_id";
  static readonly KeyViewName = "view_name";
  static readonly KeyViewQuery = "view_query";

  @AcBindJsonProperty({ key: AcDDEView.KeyViewName })
  viewName: string = "";

  @AcBindJsonProperty({ key: AcDDEView.KeyViewQuery })
  viewQuery: string = "";

  @AcBindJsonProperty({ key: AcDDEView.KeyDataDictionaryId })
  dataDictionaryId: string = "";

  @AcBindJsonProperty({ key: AcDDEView.KeyViewId })
  viewId: string = "";


  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDEView {
    const instance = new AcDDEView();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    viewId,
    viewName,
  }: {
    dataDictionaryId?: string;
    viewId?: string;
    viewName?: string;
  }): AcDDEView[] {
    const result: AcDDEView[] = [];
    for (const row of Object.values(acDDEDataStorage.views)) {
      let includeRow: boolean = true;
      if (dataDictionaryId != undefined && row.dataDictionaryId != dataDictionaryId) {
        includeRow = false;
      }
      if (viewId != undefined && row.viewId != viewId) {
        includeRow = false;
      }
      if (viewId != undefined && row.viewName != viewName) {
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
