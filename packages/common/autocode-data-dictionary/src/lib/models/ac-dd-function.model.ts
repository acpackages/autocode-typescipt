/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDFunction {
  static readonly KEY_FUNCTION_NAME = "function_name";
  static readonly KEY_FUNCTION_CODE = "function_code";

  @AcBindJsonProperty({ key: AcDDFunction.KEY_FUNCTION_NAME })
  functionName: string = "";

  @AcBindJsonProperty({ key: AcDDFunction.KEY_FUNCTION_CODE })
  functionCode: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDFunction {
    const instance = new AcDDFunction();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstance({
    functionName,
    dataDictionaryName = "default",
  }: {
    functionName: string;
    dataDictionaryName?: string;
  }): AcDDFunction {
    const result = new AcDDFunction();
    const acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });
    if (acDataDictionary.functions.hasOwnProperty(functionName)) {
      result.fromJson({ jsonData: acDataDictionary.functions[functionName] });
    }
    return result;
  }

  static getDropFunctionStatement({
    functionName,
    databaseType = AcEnumSqlDatabaseType.UNKNOWN,
  }: {
    functionName: string;
    databaseType?: string;
  }): string {
    return `DROP FUNCTION IF EXISTS ${functionName};`;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  getCreateFunctionStatement({ databaseType = AcEnumSqlDatabaseType.UNKNOWN }: { databaseType?: string }): string {
    return this.functionCode;
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
