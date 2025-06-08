/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcDDCondition {
  static readonly KEY_DATABASE_TYPE = "database_type";
  static readonly KEY_COLUMN_NAME = "column_name";
  static readonly KEY_OPERATOR = "operator";
  static readonly KEY_VALUE = "value";

  @AcBindJsonProperty({ key: AcDDCondition.KEY_DATABASE_TYPE })
  databaseType: string = "";

  @AcBindJsonProperty({ key: AcDDCondition.KEY_COLUMN_NAME })
  columnName: string = "";

  operator: string = "";
  value: any;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDCondition {
    const instance = new AcDDCondition();
    instance.fromJson({ jsonData });
    return instance;
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({
      instance: this,
      jsonData,
    });
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode(this.toJson());
  }
}
