import { AcDataDictionary } from "./ac-data-dictionary";

export class AcDDStoredProcedure {
  static readonly keyStoredProcedureName = "stored_procedure_name";
  static readonly keyStoredProcedureCode = "stored_procedure_code";

  storedProcedureName: string = "";
  storedProcedureCode: string = "";

  static fromJson(jsonData: { [key: string]: any }): AcDDStoredProcedure {
    const instance = new AcDDStoredProcedure();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  static getInstance({ storedProcedureName, dataDictionaryName = "default" }: { storedProcedureName: string; dataDictionaryName?: string; }): AcDDStoredProcedure {
    let result: AcDDStoredProcedure = new AcDDStoredProcedure();
    let acDataDictionary: AcDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName: dataDictionaryName });
    if (acDataDictionary.storedProcedures[storedProcedureName]) {
      result.setValuesFromJson(acDataDictionary.storedProcedures[storedProcedureName]);
    }
    return result;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {
    if (jsonData.hasOwnProperty(AcDDStoredProcedure.keyStoredProcedureName)) {
      this.storedProcedureName = String(jsonData[AcDDStoredProcedure.keyStoredProcedureName]);
    }
    if (jsonData.hasOwnProperty(AcDDStoredProcedure.keyStoredProcedureCode)) {
      this.storedProcedureCode = String(jsonData[AcDDStoredProcedure.keyStoredProcedureCode]);
    }
  }

  toJson(): { [key: string]: any } {
    return {
      [AcDDStoredProcedure.keyStoredProcedureName]: this.storedProcedureName,
      [AcDDStoredProcedure.keyStoredProcedureCode]: this.storedProcedureCode,
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson())
  }
}
