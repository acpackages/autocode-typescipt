/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcDDEDataDictionary {
  static readonly KeyDataDictionaryId = "database_id";
  static readonly KeyDataDictionaryName = "database_name";

  @AcBindJsonProperty({ key: AcDDEDataDictionary.KeyDataDictionaryId })
  functionId: string = "";

  @AcBindJsonProperty({ key: AcDDEDataDictionary.KeyDataDictionaryName })
  functionName: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDEDataDictionary {
    const instance = new AcDDEDataDictionary();
    instance.fromJson({ jsonData });
    return instance;
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
