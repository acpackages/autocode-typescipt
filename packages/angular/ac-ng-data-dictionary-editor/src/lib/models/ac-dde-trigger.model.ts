/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { acDDEDataStorage } from "./ac-dde-data-storage.model";

export class AcDDETrigger {
  static readonly KeyDataDictionaryId = "data_dictionary_id";
  static readonly KeyTriggerId = "trigger_id";
  static readonly KeyRowOperation = "row_operation";
  static readonly KeyTableId = "table_id";
  static readonly KeyTriggerCode = "trigger_code";
  static readonly KeyTriggerExecution = "trigger_execution";
  static readonly KeyTriggerName = "trigger_name";

  @AcBindJsonProperty({ key: AcDDETrigger.KeyRowOperation })
  rowOperation: string = "";

  @AcBindJsonProperty({ key: AcDDETrigger.KeyTriggerExecution })
  triggerExecution: string = "";

  @AcBindJsonProperty({ key: AcDDETrigger.KeyTableId })
  tableId: string = "";

  @AcBindJsonProperty({ key: AcDDETrigger.KeyTriggerName })
  triggerName: string = "";

  @AcBindJsonProperty({ key: AcDDETrigger.KeyTriggerCode })
  triggerCode: string = "";

  @AcBindJsonProperty({ key: AcDDETrigger.KeyDataDictionaryId })
  dataDictionaryId: string = "";

  @AcBindJsonProperty({ key: AcDDETrigger.KeyTriggerId })
  triggerId: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDETrigger {
    const instance = new AcDDETrigger();
    instance.fromJson({ jsonData });
    return instance;
  }

  static getInstances({
    dataDictionaryId,
    triggerId,
    tableId,
    rowOperation,
    triggerExecution,
    triggerName,
  }: {
    dataDictionaryId?: string;
    triggerId?: string;
    tableId?: string;
    rowOperation?: string;
    triggerExecution?: string;
    triggerName?: string;
  }): AcDDETrigger[] {
    const result: AcDDETrigger[] = [];
    for (const row of Object.values(acDDEDataStorage.triggers)) {
      let includeRow: boolean = true;
      if (dataDictionaryId != undefined && row.dataDictionaryId != dataDictionaryId) {
        includeRow = false;
      }
      if (triggerId != undefined && row.triggerId != triggerId) {
        includeRow = false;
      }
      if (tableId != undefined && row.tableId != tableId) {
        includeRow = false;
      }
      if (rowOperation != undefined && row.rowOperation != rowOperation) {
        includeRow = false;
      }
      if (triggerExecution != undefined && row.triggerExecution != triggerExecution) {
        includeRow = false;
      }
      if (triggerName != undefined && row.triggerName != triggerName) {
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
