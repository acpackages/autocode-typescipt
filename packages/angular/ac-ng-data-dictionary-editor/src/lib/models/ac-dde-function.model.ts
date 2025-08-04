/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";

export class AcDDEFunction {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyFunctionId = "function_id";
  static readonly KeyFunctionName = "function_name";
  static readonly KeyFunctionCode = "function_code";

  @AcBindJsonProperty({ key: AcDDEFunction.KeyDataDictionaryId })
  dataDictionaryId: string = "";

  @AcBindJsonProperty({ key: AcDDEFunction.KeyFunctionId })
  functionId: string = "";

  @AcBindJsonProperty({ key: AcDDEFunction.KeyFunctionName })
  functionName: string = "";

  @AcBindJsonProperty({ key: AcDDEFunction.KeyFunctionCode })
  functionCode: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDEFunction {
    const instance = new AcDDEFunction();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    functionId,
    functionName,
  }: {
    dataDictionaryId?: string;
    functionId?: string;
    functionName?: string;
  }): AcDDEFunction[] {
    const result: AcDDEFunction[] = [];

    for (const row of Object.values(acDDEDataStorage.functions)) {
      let includeRow = true;

      if (dataDictionaryId !== undefined && row.dataDictionaryId !== dataDictionaryId) {
        includeRow = false;
      }
      if (functionId !== undefined && row.functionId !== functionId) {
        includeRow = false;
      }
      if (functionName !== undefined && row.functionName !== functionName) {
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
