import { AcEnumConditionOperator } from "../enums/ac-enum-condition-operator.enum";
import { AcJsonUtils } from "../utils/ac-json-utils";

export class AcFilter {
  static readonly KeyKey = "key";
  static readonly KeyOperator = "operator";
  static readonly KeyValue = "value";

  key?: string;
  operator: AcEnumConditionOperator = AcEnumConditionOperator.Unknown;
  value:any;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcFilter {
    const instance = new AcFilter();
    instance.fromJson({ jsonData });
    return instance;
  }

  static instanceWithValues({
    key,
    operator,
    value,
  }: {
    key: string;
    operator: AcEnumConditionOperator;
    value: any;
  }):AcFilter {
    const result= new AcFilter();
    result.key = key;
    result.operator = operator;
    result.value = value;
    return result;
  }

  cloneInstance():AcFilter{
    return new AcFilter().fromJson({jsonData:this.toJson()});
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
