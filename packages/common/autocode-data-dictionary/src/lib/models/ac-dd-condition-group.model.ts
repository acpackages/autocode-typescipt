/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-typescript/autocode";
import { AcDDCondition } from "./ac-dd-condition.model";

export class AcDDConditionGroup {
  static readonly KEY_DATABASE_TYPE = "database_type";
  static readonly KEY_CONDITIONS = "conditions";
  static readonly KEY_OPERATOR = "operator";

  @AcBindJsonProperty({ key: AcDDConditionGroup.KEY_DATABASE_TYPE })
  databaseType: string = "";

  conditions: any[] = [];
  operator: string = "";

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDConditionGroup {
    const instance = new AcDDConditionGroup();
    instance.fromJson({ jsonData });
    return instance;
  }

  addCondition({
    columnName,
    operator,
    value,
  }: {
    columnName: string;
    operator: string;
    value: any;
  }): this {
    this.conditions.push(
      AcDDCondition.instanceFromJson({
        jsonData: {
          [AcDDCondition.KEY_COLUMN_NAME]: columnName,
          [AcDDCondition.KEY_OPERATOR]: operator,
          [AcDDCondition.KEY_VALUE]: value,
        },
      })
    );
    return this;
  }

  addConditionGroup({
    conditions,
    operator = "AND",
  }: {
    conditions: any[];
    operator?: string;
  }): this {
    this.conditions.push(
      AcDDConditionGroup.instanceFromJson({
        jsonData: {
          [AcDDConditionGroup.KEY_CONDITIONS]: conditions,
          [AcDDConditionGroup.KEY_OPERATOR]: operator,
        },
      })
    );
    return this;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    const json = { ...jsonData };

    if (json.hasOwnProperty(AcDDConditionGroup.KEY_CONDITIONS)) {
      for (const condition of json[AcDDConditionGroup.KEY_CONDITIONS]) {
        if (condition && typeof condition === "object" && !Array.isArray(condition)) {
          if (condition.hasOwnProperty(AcDDConditionGroup.KEY_CONDITIONS)) {
            this.conditions.push(AcDDConditionGroup.instanceFromJson({ jsonData: condition }));
          } else if (condition.hasOwnProperty(AcDDCondition.KEY_COLUMN_NAME)) {
            this.conditions.push(AcDDCondition.instanceFromJson({ jsonData: condition }));
          }
        } else {
          this.conditions.push(condition);
        }
      }
      delete json[AcDDConditionGroup.KEY_CONDITIONS];
    }

    AcJsonUtils.setInstancePropertiesFromJsonData({ instance: this, jsonData: json });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
