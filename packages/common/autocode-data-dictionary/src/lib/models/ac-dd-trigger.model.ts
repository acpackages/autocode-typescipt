/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcEnumSqlDatabaseType, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDataDictionary } from "./ac-data-dictionary.model";

export class AcDDTrigger {
  static readonly KEY_ROW_OPERATION = "row_operation";
  static readonly KEY_TABLE_NAME = "table_name";
  static readonly KEY_TRIGGER_CODE = "trigger_code";
  static readonly KEY_TRIGGER_EXECUTION = "trigger_execution";
  static readonly KEY_TRIGGER_NAME = "trigger_name";

  @AcBindJsonProperty({ key: AcDDTrigger.KEY_ROW_OPERATION })
  rowOperation: string = "";

  @AcBindJsonProperty({ key: AcDDTrigger.KEY_TRIGGER_EXECUTION })
  triggerExecution: string = "";

  @AcBindJsonProperty({ key: AcDDTrigger.KEY_TABLE_NAME })
  tableName: string = "";

  @AcBindJsonProperty({ key: AcDDTrigger.KEY_TRIGGER_NAME })
  triggerName: string = "";

  @AcBindJsonProperty({ key: AcDDTrigger.KEY_TRIGGER_CODE })
  triggerCode: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDTrigger {
    const instance = new AcDDTrigger();
    instance.fromJson({ jsonData: jsonData });
    return instance;
  }

  static getInstance({triggerName,dataDictionaryName = "default"}:{triggerName: string,  dataDictionaryName?: string }): AcDDTrigger {
    const result = new AcDDTrigger();
    const acDataDictionary = AcDataDictionary.getInstance({ dataDictionaryName });

    if (acDataDictionary.triggers.hasOwnProperty(triggerName)) {
      result.fromJson({ jsonData: acDataDictionary.triggers[triggerName] });
    }

    return result;
  }

  static getDropTriggerStatement({triggerName,databaseType=AcEnumSqlDatabaseType.UNKNOWN}: { triggerName: string; databaseType?: string }): string {
    // default for databaseType param if not provided
    return `DROP TRIGGER IF EXISTS ${triggerName};`;
  }

  getCreateTriggerStatement({databaseType=AcEnumSqlDatabaseType.UNKNOWN}: { databaseType?: string } = {}): string {
    let result = '';
    if ([AcEnumSqlDatabaseType.MYSQL, AcEnumSqlDatabaseType.SQLITE].includes(databaseType as any)) {
      result = `CREATE TRIGGER ${this.triggerName} ${this.triggerExecution} ${this.rowOperation} ON ${this.tableName} FOR EACH ROW BEGIN ${this.triggerCode} END;`;
    }
    return result;
  }

  fromJson({ jsonData }: { jsonData: any }): AcDDTrigger {
    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: jsonData });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
