/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils } from "@autocode-ts/autocode";

export class AcDDCondition {
  static readonly KeyDatabaseType = "databaseType";
  static readonly KeyColumnName = "columnName";
  static readonly KeyOperator = "operator";
  static readonly KeyValue = "value";

  @AcBindJsonProperty({ key: AcDDCondition.KeyDatabaseType })
  databaseType: string = "";

  @AcBindJsonProperty({ key: AcDDCondition.KeyColumnName })
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
