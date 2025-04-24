import { AcDataDictionary } from "./ac-data-dictionary";

export class AcDDTrigger {
  static readonly keyTriggerName = "trigger_name";
  static readonly keyTriggerCode = "trigger_code";
  static readonly keyTriggerTableName = "table_name";
  static readonly keyTriggerExecution = "trigger_execution";
  static readonly keyTriggerTableRowOperation = "row_operation";

  rowOperation: string = "";  
  triggerExecution: string = "";
  tableName: string = "";
  triggerName: string = "";
  triggerCode: string = "";
  

  static fromJson(jsonData: { [key: string]: any }): AcDDTrigger {
    const instance = new AcDDTrigger();
    instance.setValuesFromJson(jsonData);
    return instance;
  }

  static getInstance({ triggerName, dataDictionaryName = "default" }: { triggerName: string; dataDictionaryName?: string; }): AcDDTrigger {
    let result: AcDDTrigger = new AcDDTrigger();
    let acDataDictionary: AcDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName: dataDictionaryName });
    if (acDataDictionary.triggers[triggerName]) {
      result.setValuesFromJson(acDataDictionary.triggers[triggerName]);
    }
    return result;
  }

  setValuesFromJson(jsonData: { [key: string]: any } = {}): void {    
    if (jsonData.hasOwnProperty(AcDDTrigger.keyTriggerTableRowOperation)) {
      this.rowOperation = String(jsonData[AcDDTrigger.keyTriggerTableRowOperation]);
    }    
    if (jsonData.hasOwnProperty(AcDDTrigger.keyTriggerTableName)) {
      this.tableName = String(jsonData[AcDDTrigger.keyTriggerTableName]);
    }
    if (jsonData.hasOwnProperty(AcDDTrigger.keyTriggerExecution)) {
      this.triggerExecution = String(jsonData[AcDDTrigger.keyTriggerExecution]);
    }
    if (jsonData.hasOwnProperty(AcDDTrigger.keyTriggerCode)) {
      this.triggerCode = String(jsonData[AcDDTrigger.keyTriggerCode]);
    }
    if (jsonData.hasOwnProperty(AcDDTrigger.keyTriggerName)) {
      this.triggerName = String(jsonData[AcDDTrigger.keyTriggerName]);
    }
  }

  toJson(): { [key: string]: any } {
    return {
      [AcDDTrigger.keyTriggerName]: this.triggerName,
      [AcDDTrigger.keyTriggerCode]: this.triggerCode,
      [AcDDTrigger.keyTriggerTableRowOperation]: this.rowOperation,
      [AcDDTrigger.keyTriggerExecution]: this.triggerExecution,
      [AcDDTrigger.keyTriggerTableName]: this.tableName
    };
  }

  toString(): string {
    return JSON.stringify(this.toJson());
  }
}