import { AcDataDictionary } from "./ac-data-dictionary";

export class AcDDFunction {
  static readonly keyFunctionName = "function_name";
  static readonly keyFunctionCode = "function_code";
  static readonly keyFunctionScript = "function_script";
  static readonly keyFunctionParameters = "function_parameters";
  static readonly keyFunctionValueTableField = "function_value_table_field";

  functionName: string = "";
  functionCode: string = "";

  static fromJson(jsonData: { [key: string]: any }): AcDDFunction {
    const instance = new AcDDFunction();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  static getInstance({ functionName, dataDictionaryName = "default" }: { functionName: string; dataDictionaryName?: string; }): AcDDFunction {
    let result: AcDDFunction = new AcDDFunction();
    let acDataDictionary: AcDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName: dataDictionaryName });
    if (acDataDictionary.functions[functionName]) {
      result.setValuesFromJson(acDataDictionary.functions[functionName]);
    }
    return result;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDFunction.keyFunctionName)) {
      this.functionName = String(jsonData[AcDDFunction.keyFunctionName]);
    }
    if (jsonData.hasOwnProperty(AcDDFunction.keyFunctionCode)) {
      this.functionCode = String(jsonData[AcDDFunction.keyFunctionCode]);
    }
  }

  toJson(): { [key: string]: any } {
    return {
      [AcDDFunction.keyFunctionName]: this.functionName,
      [AcDDFunction.keyFunctionCode]: this.functionCode,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}
