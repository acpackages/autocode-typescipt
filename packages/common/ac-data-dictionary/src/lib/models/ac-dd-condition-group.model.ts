/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";
import { AcDDCondition } from "../..";

export class AcDDConditionGroup {
  static readonly KeyDatabaseType = "database_type";
  static readonly KeyConditions = "conditions";
  static readonly KeyOperator = "operator";

  @AcBindJsonProperty({ key: AcDDConditionGroup.KeyDatabaseType })
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
          [AcDDCondition.KeyColumnName]: columnName,
          [AcDDCondition.KeyOperator]: operator,
          [AcDDCondition.KeyValue]: value,
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
          [AcDDConditionGroup.KeyConditions]: conditions,
          [AcDDConditionGroup.KeyOperator]: operator,
        },
      })
    );
    return this;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    const json = { ...jsonData };

    if (json.hasOwnProperty(AcDDConditionGroup.KeyConditions)) {
      for (const condition of json[AcDDConditionGroup.KeyConditions]) {
        if (condition && typeof condition === "object" && !Array.isArray(condition)) {
          if (condition.hasOwnProperty(AcDDConditionGroup.KeyConditions)) {
            this.conditions.push(AcDDConditionGroup.instanceFromJson({ jsonData: condition }));
          } else if (condition.hasOwnProperty(AcDDCondition.KeyColumnName)) {
            this.conditions.push(AcDDCondition.instanceFromJson({ jsonData: condition }));
          }
        } else {
          this.conditions.push(condition);
        }
      }
      delete json[AcDDConditionGroup.KeyConditions];
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
