/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDStoredProcedure {
  static readonly KEY_STORED_PROCEDURE_NAME = "stored_procedure_name";
  static readonly KEY_STORED_PROCEDURE_CODE = "stored_procedure_code";

  @AcBindJsonProperty({ key: AcDDStoredProcedure.KEY_STORED_PROCEDURE_NAME })
  storedProcedureName: string = "";

  @AcBindJsonProperty({ key: AcDDStoredProcedure.KEY_STORED_PROCEDURE_CODE })
  storedProcedureCode: string = "";

  static instanceFromJson(params: { jsonData: { [key: string]: any } }): AcDDStoredProcedure {
    const instance = new AcDDStoredProcedure();
    instance.fromJson({ jsonData: params.jsonData });
    return instance;
  }

  static getInstance(params: { storedProcedureName: string; dataDictionaryName?: string }): AcDDStoredProcedure {
    const dataDictionaryName = params.dataDictionaryName ?? "default";
    const result = new AcDDStoredProcedure();
    const acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });

    if (acDataDictionary.storedProcedures.hasOwnProperty(params.storedProcedureName)) {
      result.fromJson({ jsonData: acDataDictionary.storedProcedures[params.storedProcedureName] });
    }
    return result;
  }

  static getDropStoredProcedureStatement(params: { storedProcedureName: string; databaseType?: string }): string {
    const storedProcedureName = params.storedProcedureName;
    return `DROP PROCEDURE IF EXISTS ${storedProcedureName};`;
  }

  fromJson(params: { jsonData: { [key: string]: any } }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: params.jsonData });
    return this;
  }

  getCreateStoredProcedureStatement(params?: { databaseType?: string }): string {
    return this.storedProcedureCode;
  }

  toJson(): { [key: string]: any } {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
