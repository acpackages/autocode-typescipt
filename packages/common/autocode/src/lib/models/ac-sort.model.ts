import { AcEnumSortOrder } from "../enums/ac-enum-sort-order.enum";
import { AcJsonUtils } from "../utils/ac-json-utils";

export class AcSort {
  static readonly Keykey = "key";
  static readonly KeyOrder = "order";

  key!: string;
  order: AcEnumSortOrder = AcEnumSortOrder.None;

  static instanceFromJson({ jsonData }: { jsonData: any }): AcSort {
    const instance = new AcSort();
    instance.fromJson({ jsonData });
    return instance;
  }

  static instanceWithValues({
    key,
    order
  }: {
    key: string;
    order: AcEnumSortOrder;
  }):AcSort {
    const result= new AcSort();
    result.key = key;
    result.order = order;
    return result;
  }

  cloneInstance():AcSort{
    return new AcSort().fromJson({jsonData:this.toJson()});
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
