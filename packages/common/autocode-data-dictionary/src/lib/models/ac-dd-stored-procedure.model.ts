/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDataDictionary } from "../..";

export class AcDDStoredProcedure {
  static readonly KEY_STORED_PROCEDURE_NAME = "stored_procedure_name";
  static readonly KEY_STORED_PROCEDURE_CODE = "stored_procedure_code";

  @AcBindJsonProperty({ key: AcDDStoredProcedure.KEY_STORED_PROCEDURE_NAME })
  storedProcedureName: string = "";

  @AcBindJsonProperty({ key: AcDDStoredProcedure.KEY_STORED_PROCEDURE_CODE })
  storedProcedureCode: string = "";

  static instanceFromJson({jsonData}: { jsonData: { [key: string]: any } }): AcDDStoredProcedure {
    const instance = new AcDDStoredProcedure();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getInstance({storedProcedureName,dataDictionaryName="default"}: { storedProcedureName: string; dataDictionaryName?: string }): AcDDStoredProcedure {
    const result = new AcDDStoredProcedure();
    const acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });

    if (acDataDictionary.storedProcedures.hasOwnProperty(storedProcedureName)) {
      result.fromJson({ jsonData: acDataDictionary.storedProcedures[storedProcedureName] });
    }
    return result;
  }

  static getDropStoredProcedureStatement({storedProcedureName,databaseType = AcEnumSqlDatabaseType.UNKNOWN}: { storedProcedureName: string; databaseType?: string }): string {
    return `DROP PROCEDURE IF EXISTS ${storedProcedureName};`;
  }

  fromJson({jsonData}: { jsonData: { [key: string]: any } }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: jsonData });
    return this;
  }

  getCreateStoredProcedureStatement({databaseType=AcEnumSqlDatabaseType.UNKNOWN}: { databaseType?: string } = {}): string {
    return this.storedProcedureCode;
  }

  toJson(): { [key: string]: any } {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
