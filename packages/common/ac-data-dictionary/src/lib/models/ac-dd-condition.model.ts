/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { AcBindJsonProperty, AcJsonUtils, AcFilter } from "@autocode-ts/autocode";

export class AcDDCondition {
  static readonly KeyDatabaseType = "databaseType";
  static readonly KeyKey = "key";
  static readonly KeyOperator = "operator";
  static readonly KeyValue = "value";

  @AcBindJsonProperty({ key: AcDDCondition.KeyDatabaseType })
  databaseType: string = "";

  @AcBindJsonProperty({ key: AcDDCondition.KeyKey })
  key: string = "";

  operator: string = "";
  value: any;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcDDCondition {
    const instance = new AcDDCondition();
    instance.fromJson({ jsonData });
    return instance;
  }

  static instanceFromFilter({ filter }: { filter: AcFilter }): AcDDCondition {
    return new AcDDCondition().fromFilter(filter);
  }

  fromJson({ jsonData }: { jsonData: any }): this {
    AcJsonUtils.setInstancePropertiesFromJsonData({
      instance: this,
      jsonData,
    });
    return this;
  }

  fromFilter(filter: AcFilter): this {
    this.key = filter.key ?? '';
    this.operator = filter.operator;
    this.value = filter.value;
    return this;
  }

  toJson(): Record<string, any> {
    return AcJsonUtils.getJsonDataFromInstance({ instance: this });
  }

  toString(): string {
    return AcJsonUtils.prettyEncode({object:this.toJson()});
  }
}
