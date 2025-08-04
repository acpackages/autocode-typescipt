/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";

export class AcDDEStoredProcedure {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyStoredProcedureId = "stored_procedure_id";
  static readonly KeyStoredProcedureName = "stored_procedure_name";
  static readonly KeyStoredProcedureCode = "stored_procedure_code";

  @AcBindJsonProperty({ key: AcDDEStoredProcedure.KeyDataDictionaryId })
  dataDictionaryId = "";

  @AcBindJsonProperty({ key: AcDDEStoredProcedure.KeyStoredProcedureId })
  storedProcedureId = "";

  @AcBindJsonProperty({ key: AcDDEStoredProcedure.KeyStoredProcedureName })
  storedProcedureName = "";

  @AcBindJsonProperty({ key: AcDDEStoredProcedure.KeyStoredProcedureCode })
  storedProcedureCode = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDEStoredProcedure {
    const instance = new AcDDEStoredProcedure();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    storedProcedureId,
    storedProcedureName,
  }: {
    dataDictionaryId?: string;
    storedProcedureId?: string;
    storedProcedureName?: string;
  }): AcDDEStoredProcedure[] {
    const result: AcDDEStoredProcedure[] = [];
    for (const row of Object.values(acDDEDataStorage.storedProcedures)) {
      let includeRow: boolean = true;
      if (dataDictionaryId != undefined && row.dataDictionaryId != dataDictionaryId) {
        includeRow = false;
      }
      if (storedProcedureId != undefined && row.storedProcedureId != storedProcedureId) {
        includeRow = false;
      }
      if (storedProcedureName != undefined && row.storedProcedureName != storedProcedureName) {
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
